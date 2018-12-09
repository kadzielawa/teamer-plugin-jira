package teamerExt.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import teamerExt.jira.webwork.Project.ProjectMember;
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

    private final TeamService teamService;
    @ComponentImport
    private final ActiveObjects ao;

    public Team(TeamService teamService, ActiveObjects ao) {
        this.teamService = teamService;
        this.ao = ao;
    }

    @GET
    @Path("{id}")
    public TeamModel getTeam(@PathParam("id") final int teamId){

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
    public Response updateTeamIda(TeamModel teamModel){
         teamerExt.jira.webwork.Team.Team team = ao.create(teamerExt.jira.webwork.Team.Team.class);
        team.setName(teamModel.getName());
        team.save();
        return Response.ok("utworzono team - ID:"+ team.getID()).build();
    }



    @POST
    public Response updateTeamId(TeamModel teamModel){
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

        return Response.ok("utworzono team - ID:"+ teamId).build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") final int teamId){
        teamerExt.jira.webwork.Team.Team team = this.teamService.getTeamById(teamId);
        this.teamService.delete(team);

        return Response.ok("usunieto").build();
    }

}
