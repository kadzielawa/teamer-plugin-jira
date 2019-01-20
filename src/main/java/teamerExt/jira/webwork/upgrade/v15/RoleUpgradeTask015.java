package teamerExt.jira.webwork.upgrade.v15;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;
import teamerExt.jira.webwork.upgrade.v14.View;

public class RoleUpgradeTask015  implements ActiveObjectsUpgradeTask {

    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("15"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(Role.class); // (4)
    }
}
