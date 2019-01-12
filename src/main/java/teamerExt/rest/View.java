package teamerExt.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.jira.webwork.Team.TeamService;
import teamerExt.jira.webwork.View.ViewService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;

@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path("view")
public class View {

    private TeamService teamService;
    private ViewService viewService;

    public View(TeamService teamService, ViewService viewService) {
        this.teamService = teamService;
        this.viewService = viewService;
    }

    @GET
    public ArrayList getAllViews() throws Exception {

        ArrayList<Team> teams = this.viewService.getAllViews();

        ArrayList<String> integerList = new ArrayList<>();

        for(Team team : teams) {
            integerList.add(team.getViewId());
        }
        HashSet<String> uniqueValues = new HashSet<>(integerList);

        ArrayList<HashMap<String, String>> uniqueList = new ArrayList<>();

        for (String i : uniqueValues) {
            HashMap<String,String> stringMap = new HashMap<>();
            teamerExt.jira.webwork.View.View updatedView = this.viewService.getViewById(i);
            stringMap.put("name",updatedView.getName());
            stringMap.put("okp",updatedView.getOkp());
            stringMap.put("id", String.valueOf(i));
            uniqueList.add(stringMap);
        }
        return uniqueList;
    }

    @DELETE
    @Path("{id}")
    public void deleteViewByViewId(@PathParam("id") final int viewId) throws Exception {
        teamerExt.jira.webwork.View.View deletedView = this.viewService.getViewById(String.valueOf(viewId));
        Iterable<Team> teams = this.teamService.getTeamsByViewId(viewId);

        for (Team t : teams) {
            this.teamService.delete(t);
        }
    }


    @PUT
    @Path("{id}")
    public void cloneView(@PathParam("id") final int viewId) throws Exception {
        this.viewService.cloneView(viewId);
    }

    @POST
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateView(@PathParam("id") final int viewId, final ViewModel viewModel) {
        teamerExt.jira.webwork.View.View updatedView = this.viewService.getViewById(String.valueOf(viewId));
        updatedView.setOkp(viewModel.getOkp());
        updatedView.setViewId(viewId);
        updatedView.setName(viewModel.getViewName());
        updatedView.save();

        return Response.ok("usunieto").build();

    }
}
