package teamerExt.jira.webwork.upgrade.v2;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;
import net.java.ao.Entity;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.User.User;

public class ProjectUpgradeTask002 implements ActiveObjectsUpgradeTask {

    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("2"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(ProjectToUser.class); // (4)

    }
}
