package teamerExt;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.Lists;
import net.java.ao.EntityManager;
import net.java.ao.Query;
import net.java.ao.test.converters.NameConverters;
import org.junit.Before;
import org.junit.runner.RunWith;
import net.java.ao.test.junit.ActiveObjectsJUnitRunner;
import teamerExt.jira.webwork.Project.ProjectServiceImpl;
import teamerExt.jira.webwork.Project.ProjectTeam;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.rest.TeamModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RunWith(ActiveObjectsJUnitRunner.class) // (1)
//@Data(AoBlogServiceTest.AoBlogServiceTestDatabaseUpdater.class) // (2)
//@Jdbc(DerbyEmbedded.class) // (3)
@NameConverters // (4)
public class ProjectTeamAddTest {
    private EntityManager entityManager; // (5)


    @Before
    public void setUp() throws Exception {
        entityManager.migrate(teamerExt.jira.webwork.upgrade.v12.ProjectTeam.class);

    }
    @org.junit.Test
    public void getAll() throws SQLException {

        TeamModel teamModel = new TeamModel();


        ArrayList<Integer> newList = new ArrayList<>();
        newList.add(2);
        newList.add(6);

        final Query query = Query.select();
        Iterable<ProjectTeam> teamList = Lists.newArrayList(entityManager.find(ProjectTeam.class, query));

    }

}