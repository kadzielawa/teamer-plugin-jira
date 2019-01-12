package teamerExt.jira.webwork.upgrade.v14;
import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;

public class ViewUpgradeTask014 implements ActiveObjectsUpgradeTask {

    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("14"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(View.class); // (4)
    }
}

