package teamerExt.jira.webwork.upgrade.v12;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;

public class ProjectUpgradeTask012 implements ActiveObjectsUpgradeTask {

    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("12"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(ProjectTeam.class); // (4)
    }
}
