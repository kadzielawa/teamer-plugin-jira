package teamerExt.rest;

import javax.ws.rs.PathParam;
import javax.ws.rs.*;

import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.MediaType;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.Project.ProjectService;


import java.util.ArrayList;
import java.util.List;

@Produces ({ MediaType.APPLICATION_JSON })
@Consumes ({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path ("project")
public class Project {

    //odpowiada za np. dodawanie projektu do bazy

    private final ProjectService projectService;
    CacheControl cacheControl;

    public Project(ProjectService projectService) {
        this.projectService = projectService;
        CacheControl cacheControl = new CacheControl();
        cacheControl.setNoCache(true);
    }
    @GET
    public List<ProjectModel> getAll() {

        final Iterable<teamerExt.jira.webwork.Project.Project> projects = projectService.all();
        List<ProjectModel> projectModels = new ArrayList<>();

        for(teamerExt.jira.webwork.Project.Project project : projects) {
            ProjectModel projectModel = new ProjectModel();
            projectModel.setLabel(project.getName());
            projectModel.setValue(project.getID());
            projectModels.add(projectModel);
        }

        return projectModels;
    }
    @GET
    @Path("{id}")
    public ArrayList<ProjectMemberModelXML> getProjectMembers(@PathParam ("id") final String projectId) {

        ArrayList<ProjectMember> projectMembers = projectService.getProjectMembersByProjectId(projectId);
        teamerExt.jira.webwork.Project.Project project = projectService.getProjectById(projectId);

        ArrayList<ProjectMemberModelXML> projectMembersJSON = new ArrayList<>();

        for(ProjectMember projectMember : projectMembers) {
           ProjectMemberModelXML newProjectMember = new ProjectMemberModelXML();
            newProjectMember.setAvailability(projectMember.getAvailability());
            newProjectMember.setRole(projectMember.getRole());
            newProjectMember.setProject(this.convertProjectObjectToModel(project));
           projectMembersJSON.add(newProjectMember);
       }

       return projectMembersJSON;

    }

    private ProjectModel convertProjectObjectToModel(teamerExt.jira.webwork.Project.Project project){
        ProjectModel projectModel = new ProjectModel();
        projectModel.setIncome(project.getIncome());
        projectModel.setLabel(project.getName());
        return projectModel;
    }
}
