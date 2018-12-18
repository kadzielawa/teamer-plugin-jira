package teamerExt;

import net.java.ao.EntityManager;
import net.java.ao.test.converters.NameConverters;
import net.java.ao.test.jdbc.Data;
import net.java.ao.test.jdbc.Jdbc;
import org.junit.Before;
import org.junit.runner.RunWith;
import net.java.ao.test.junit.ActiveObjectsJUnitRunner;

import static org.junit.Assert.*;

@RunWith(ActiveObjectsJUnitRunner.class) // (1)
//@Data(AoBlogServiceTest.AoBlogServiceTestDatabaseUpdater.class) // (2)
//@Jdbc(DerbyEmbedded.class) // (3)
@NameConverters // (4)
public class ProjectTest {
    private EntityManager entityManager; // (5)

    @Before
    public void setUp() throws Exception {
       // blogService = new AoBlogService(entityManager);
    }
    @org.junit.Test
    public void getAll() {
        System.out.println("3");
    }

    @org.junit.Test
    public void getProjectMembers() {
    }
}