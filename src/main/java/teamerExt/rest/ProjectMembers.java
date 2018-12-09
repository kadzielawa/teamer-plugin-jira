package teamerExt.rest;
import javax.ws.rs.PathParam;
import javax.ws.rs.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.Project.ProjectService;
import teamerExt.jira.webwork.User.User;
import teamerExt.jira.webwork.User.UserService;

@Produces ({ MediaType.APPLICATION_JSON })
@Consumes ({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path ("projectmembers")
public class ProjectMembers{

    //przypisywanie userów do projektow a potem siup do bazy

        private final ProjectService projectService;
        private final UserService userService;
        @ComponentImport
        private final ActiveObjects ao;

        public ProjectMembers(ProjectService projectService, UserService userService, ActiveObjects ao) {
                this.projectService = projectService;
                this.userService = userService;
                this.ao = ao;
        }
        @GET
        @Path ("{id}")
        public Response getVersion(@PathParam ("id") final String id)
        {
                return Response.ok().build();
        }
        @PUT
        @Path ("{id}")
        public Response updateVersion(@PathParam("id") final Integer id, final ProjectMemberModelXML projectMember)    {

                return Response.ok().build();
        }
        @PUT
        public Response updateVersion( final ProjectMemberModelXML projectMemberModel)    {

                String projectId = projectMemberModel.getProjectId();
                String userId = projectMemberModel.getUserId();

                ProjectMember projectMember = ao.create(ProjectMember.class);
                projectMember.setAvailability(projectMemberModel.getAvailability());
                projectMember.setProjectId(projectMemberModel.getProjectId());
                projectMember.setUserId(projectMemberModel.getUserId());
                projectMember.setRole(projectMemberModel.getRole());


                userService.associateProjectToUser(projectMember);
                return Response.ok(projectMember.getAvailability()).build();
        }
        @POST
        public Response createVersion(ProjectMemberModelXML projectMemberModel){


                ProjectMember projectMember = ao.create(ProjectMember.class);
                projectMember.setAvailability(projectMemberModel.getAvailability());
                projectMember.setProjectId(projectMemberModel.getProjectId());
                projectMember.setUserId(projectMemberModel.getUserId());
                projectMember.setRole(projectMemberModel.getRole());

                userService.associateProjectToUser(projectMember);
                return Response.ok(projectMember.getAvailability()).build();
        }

        @DELETE
        @Path("/{id}")
        public Response delete(@PathParam("id") final String id){
                System.out.println("xxczx");
                return Response.ok().build();
        }


}
