package teamerExt.jira.webwork.Team;

public interface TeamService {

    Team getTeamById(int teamId) throws Exception;

    Iterable<Team> getTeamsByViewId(int viewId) throws Exception;

    public void delete(Team team) throws Exception;

    Iterable<Team> all();
}
