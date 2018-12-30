package teamerExt.rest;
import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.jira.util.json.JSONException;
//import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import org.json.simple.*;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.Project.ProjectService;
import teamerExt.jira.webwork.User.User;
import teamerExt.jira.webwork.User.UserService;
import teamerExt.rest.Validator.UserValidator;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;

@Produces ({ MediaType.APPLICATION_JSON })
@Consumes ({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path ("projectmembers")
public class ProjectMembers{

    //przypisywanie userów do projektow a potem siup do bazy

        private final ProjectService projectService;
        private final UserService userService;
        private final ActiveObjects ao;
        public ProjectMembers(ProjectService projectService, UserService userService, ActiveObjects ao) {
                this.projectService = projectService;
                this.userService = userService;
                this.ao = ao;
        }

    @GET
    @Path ("{projectId}")
    public Response getVersion(@PathParam ("projectId") final int projectId)
    {
        ProjectMemberModelXML projectMemberModel = new ProjectMemberModelXML();
        JSONArray allProjectMembers = new JSONArray();
        ArrayList<ProjectMember> projectMembers = projectService.getProjectMembersByProjectId(projectId);
        for(ProjectMember projectMember : projectMembers) {
            JSONObject projectMemberObject=new JSONObject();
            User user = userService.getUserById(projectMember.getUserId());
            projectMemberObject.put("developer_name",user.getFirstname() + " " + user.getLastname());
            System.out.println(user.getFirstname());
            projectMemberObject.put("user_id",projectMember.getUserId());
            projectMemberObject.put("id",projectMember.getID());
            projectMemberObject.put("project_member_id",projectMember.getID());
            projectMemberObject.put("role",projectMember.getRole());
            projectMemberObject.put("availability",projectMember.getAvailability());
            projectMemberObject.put("cost",projectMember.getCost());
            projectMemberObject.put("billed",projectMember.getBilled());
            projectMemberObject.put("okp",projectMember.getOkp());
            allProjectMembers.add(projectMemberObject);
        }
        return   Response
                .status(Response.Status.OK)
                .entity(allProjectMembers.toString())
                .build();
    }
        @GET
        @Path ("/users")
        public Response getAllUsers() throws JSONException {
                JSONArray allUsers = new JSONArray();
                for(User user: userService.all()){
                   JSONObject userObject=new JSONObject();
                   userObject.put("id",user.getID());
                   userObject.put("text",user.getFirstname() + " " + user.getLastname());
                   userObject.put("role",user.getRole());
                    allUsers.add(userObject);
                };

                return Response
                        .status(Response.Status.OK)
                        .entity(allUsers.toString())
                        .build();
        }
        @PUT
        @Path ("{id}")
        public Response updateVersion(@PathParam("id") final Integer id, final ProjectMemberModelXML projectMember)    {

                return Response.ok().build();
        }

    @GET
    @Produces("application/json")
    @Path ("{projectId}/{projectMemberId}")
    public Response getProjectMemberId(@PathParam("projectId") final int projectId,@PathParam("projectMemberId") final String projectMemberId)    {

        ProjectMember projectMember = this.projectService.getProjectMemberByProjectMemberId(projectMemberId);
        JSONObject obj = new JSONObject();
        obj.put("user_id",projectMember.getUserId());
        return Response
                .status(Response.Status.OK)
                .entity(JSONValue.toJSONString(obj))
                .type(MediaType.APPLICATION_JSON).build();
    }

        @PUT
        @Path ("{projectId}/{projectMemberId}")
        public Response updateVersion(@PathParam("projectId") final int projectId,@PathParam("projectMemberId") final String projectMemberId, final ProjectMemberModelXML projectMemberModel)    {

                ProjectMember projectMember = this.projectService.getProjectMemberByProjectMemberId(projectMemberId);
                projectMember.setAvailability(projectMemberModel.getAvailability());
                projectMember.setRole(projectMemberModel.getRole());
                projectMember.setProjectId(projectId);
                projectMember.setCost(projectMemberModel.getCost());
                projectMember.setOkp(projectMemberModel.getOkp());
                projectMember.setBilled(projectMemberModel.getBilled());

                userService.associateProjectToUser(projectMember);
            return Response
                    .status(Response.Status.OK)
                    .type(MediaType.APPLICATION_JSON).build();
        }
        //przy wiazaniu na tabelce
        @POST
        @Path ("{id}")
        public Response createVersion(@PathParam("id") final int projectId,ProjectMemberModelXML projectMemberModel) throws JSONException {

            UserValidator userValidator = new UserValidator(projectMemberModel);
            if(!userValidator.isValid()) {
                JSONObject response = new JSONObject();
                JSONArray errors = new JSONArray();
                for (String error : userValidator.getErrorList()) {
                    errors.add(error);
                }
                response.put("errors",errors);
                return Response
                        .status(Response.Status.SERVICE_UNAVAILABLE)
                        .entity(response)
                        .type(MediaType.APPLICATION_JSON).build();
            }

            ProjectMember projectMember = this.projectService.getProjectMemberByProjectMemberId(projectMemberModel.getProject_member_id());
                projectMember.setAvailability(projectMemberModel.getAvailability());
                projectMember.setProjectId(projectId);
                projectMember.setUserId(projectMemberModel.getUser_id());
                projectMember.setBilled(projectMemberModel.getBilled());
                projectMember.setCost(projectMemberModel.getCost());
                projectMember.setOkp(projectMemberModel.getOkp());
                projectMember.setRole(projectMemberModel.getRole());

                userService.associateProjectToUser(projectMember);

                JSONObject obj=new JSONObject();
                obj.put("id",projectMember.getID());


                return Response
                        .status(Response.Status.OK)
                        .entity(JSONValue.toJSONString(obj))
                        .type(MediaType.APPLICATION_JSON).build();
        }

        @DELETE
        @Path("{projectId}/{memberId}")
        public Response delete(@PathParam("projectId") final String projectId,@PathParam("memberId") final String memberId){
                ProjectMember projectMember = this.projectService.getProjectMemberByProjectMemberId(memberId);
            this.projectService.delete(projectMember);

                return Response.ok().build();
        }


}
