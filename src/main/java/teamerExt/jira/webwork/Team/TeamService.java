package teamerExt.jira.webwork.Team;

import java.util.ArrayList;

public interface TeamService {

    Team add(String description);

    Team getTeamById(int teamId) throws Exception;

    Iterable<Team> getTeamByViewId(int viewId) throws Exception;

    public void delete(Team team) throws Exception;

    public ArrayList<Team> getAllViews();

    Iterable<Team> all();
}
