package teamerExt.jira.webwork;


import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import teamerExt.jira.webwork.Model.TeamerModel;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.jira.webwork.Team.TeamService;

import java.util.ArrayList;
import java.util.List;

public class teamAction extends JiraWebActionSupport
{
    private static final Logger log = LoggerFactory.getLogger(usersAction.class);

    public Iterable<Team> teams = new ArrayList<>();
    private final TeamService teamService;
    public ArrayList<Integer> entries = new ArrayList<Integer>();
    public teamAction(TeamService teamService) {
        this.teamService = teamService;
    }

    public ArrayList<Integer> getEntries() {
        return entries;
    }

    public void setEntries(ArrayList<Integer> entries) {
        this.entries = entries;
    }

    public String execute() throws Exception {

        try {
            entries.add(1);
            entries.add(2);
            entries.add(3);
            teams = teamService.all();

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return "error";
        }
        return super.execute(); //returns SUCCESS
    }


    public Iterable<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }
}
