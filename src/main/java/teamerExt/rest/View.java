package teamerExt.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectBean;
import teamerExt.jira.webwork.Project.ProjectService;
import teamerExt.jira.webwork.Project.ProjectTeam;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.jira.webwork.Team.TeamService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path("view")
public class View {

    private TeamService teamService;
    private ProjectService projectService;
    @ComponentImport
    private ActiveObjects ao;

    public View(TeamService teamService, ProjectService projectService, ActiveObjects ao) {
        this.teamService = teamService;
        this.projectService = projectService;
        this.ao = ao;
    }

    @GET
    public  HashSet<Integer> getAllViews() throws Exception {

        ArrayList<Team> teams = this.teamService.getAllViews();

        ArrayList<Integer> integerList = new ArrayList<>();

        for(Team team : teams) {
            integerList.add(team.getViewId());
        }
        HashSet<Integer> uniqueValues = new HashSet<>(integerList);

        return uniqueValues;
    }
}
