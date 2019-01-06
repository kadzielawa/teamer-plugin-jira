package teamerExt.jira.webwork.upgrade.v13;


import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;

public class ProjectUpgradeTask013 implements ActiveObjectsUpgradeTask {

    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("13"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(Team.class); // (4)
    }
}
