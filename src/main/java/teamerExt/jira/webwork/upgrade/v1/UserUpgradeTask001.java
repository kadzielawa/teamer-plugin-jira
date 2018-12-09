package teamerExt.jira.webwork.upgrade.v1;


import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;
import teamerExt.jira.webwork.upgrade.v1.User;


public class UserUpgradeTask001 implements ActiveObjectsUpgradeTask
{
    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("1"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(User.class); // (4)

    }
}