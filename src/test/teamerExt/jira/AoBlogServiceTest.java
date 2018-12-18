package teamerExt.jira;

import net.java.ao.EntityManager;
import net.java.ao.test.converters.NameConverters;
import net.java.ao.test.jdbc.Data;
import net.java.ao.test.jdbc.DatabaseUpdater;
import net.java.ao.test.jdbc.DerbyEmbedded;
import net.java.ao.test.jdbc.Jdbc;
import net.java.ao.test.junit.ActiveObjectsJUnitRunner;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.*;

@RunWith(ActiveObjectsJUnitRunner.class) // (1)
@Data(AoBlogServiceTest.AoBlogServiceTestDatabaseUpdater.class) // (2)
@Jdbc(DerbyEmbedded.class) // (3)
@NameConverters // (4)
public final class AoBlogServiceTest {
    private EntityManager entityManager; // (5)

    private AoBlogService blogService;

    @Before
    public void setUp() throws Exception {
        blogService = new AoBlogService(entityManager);
    }

    @Test
    public void getBlogCreatesOneIfNecessary() throws Exception // (6)
    {
        assertEquals(0, entityManager.find(Blog.class).length); // no blogs
        assertNotNull(blogService.getBlog());
    }

    public static final class AoBlogServiceTestDatabaseUpdater implements DatabaseUpdater // (2)
    {
        @Override
        public void update(EntityManager entityManager) throws Exception {
            entityManager.migrate(Blog.class);
        }
    }
}