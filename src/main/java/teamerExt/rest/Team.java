package teamerExt.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import teamerExt.jira.webwork.Project.*;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Team.TeamService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path("team")
public class Team {

    private TeamService teamService;
    private ProjectService projectService;
    @ComponentImport
    private ActiveObjects ao;

    public Team(TeamService teamService, ProjectService projectService, ActiveObjects ao) {
        this.teamService = teamService;
        this.projectService = projectService;
        this.ao = ao;
    }

    @GET
    @Path("{id}")
    public TeamModel getTeam(@PathParam("id") final int teamId) throws Exception {

        teamerExt.jira.webwork.Team.Team team = this.teamService.getTeamById(teamId);
        TeamModel teamModel = new TeamModel();

        teamModel.setName(team.getName());

        return teamModel;
    }

    @GET
    public List<TeamModel> getTeams(){
        final Iterable<teamerExt.jira.webwork.Team.Team> teams = teamService.all();
        List<TeamModel> teamModels = new ArrayList<>();
        for(teamerExt.jira.webwork.Team.Team team : teams) {
            TeamModel teamModel = new TeamModel();
            teamModel.setId(team.getID());
            teamModel.setName(team.getName());
            teamModels.add(teamModel);
        }
        return teamModels;
    }

    @PUT
    @Path("{id}")
    public Response updateTeamIda(@PathParam("id") final int teamid,TeamModel teamModel) throws Exception {

        teamerExt.jira.webwork.Team.Team checkedTeam = teamService.getTeamById(teamModel.getId());
        int teamId;

        if(checkedTeam == null){
            teamerExt.jira.webwork.Team.Team team = ao.create(teamerExt.jira.webwork.Team.Team.class);
            team.setName(teamModel.getName());
            team.save();
            teamId = team.getID();
        }else {
            checkedTeam.setName(teamModel.getName());
            checkedTeam.save();
            teamId = checkedTeam.getID();
        }

        for (ProjectBean project : teamModel.getProjects()) {

            Project editedProject = projectService.getProjectById(project.getId());
            editedProject.setName(project.getName());
            editedProject.setIncome(project.getIncome());
            editedProject.save();

            ProjectTeam projectTeam = projectService.getProjectByTeamId(teamId,project.getId());
            projectTeam.setProjectId(project.getId());
            projectTeam.setTeamId(teamId);
            projectTeam.save();
        }


        return Response.ok("utworzono team - ID:"+ teamId).build();
    }

/*


    @POST
    @Path("{id}")
    public Response createTeamId(@PathParam("id") final int teamid, TeamModel teamModel) throws Exception {
        System.out.println("tworze team");

        teamerExt.jira.webwork.Team.Team checkedTeam = teamService.getTeamById(teamModel.getId());
        int teamId;
        if(checkedTeam == null){
            teamerExt.jira.webwork.Team.Team team = ao.create(teamerExt.jira.webwork.Team.Team.class);
            team.setName(teamModel.getName());
            team.save();
            teamId = team.getID();
        }else {
            checkedTeam.setName(teamModel.getName());
            checkedTeam.save();
            teamId = checkedTeam.getID();
        }


        for (ProjectBean project : teamModel.getProjects()) {

            Project editedProject = projectService.getProjectById(project.getId());
            editedProject.setName(project.getName());
            editedProject.setIncome(project.getIncome());
            editedProject.save();
            ProjectTeam projectTeam = ao.create(ProjectTeam.class);
            projectTeam.setProjectId(project.getId());
            projectTeam.setTeamId(teamId);
            projectTeam.save();
        }





        return Response.ok("utworzono team - ID:"+ teamId).build();
    }
*/
    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") final int teamId) throws Exception {
        System.out.println(teamId);

        teamerExt.jira.webwork.Team.Team team = this.teamService.getTeamById(teamId);

        System.out.println(team);
        this.teamService.delete(team);

        return Response.ok("usunieto").build();
    }

}
