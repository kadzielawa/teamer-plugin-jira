package teamerExt.jira.webwork.Team;

import teamerExt.jira.webwork.Project.Project;

import java.sql.SQLException;
import java.util.List;

public interface TeamService {

    Team add(String description);

    Team getTeamById(int teamId) throws Exception;

    public void delete(Team team);

    Iterable<Team> all();
}
