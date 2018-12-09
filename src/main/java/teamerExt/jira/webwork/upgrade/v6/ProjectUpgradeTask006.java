package teamerExt.jira.webwork.upgrade.v6;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.activeobjects.external.ActiveObjectsUpgradeTask;
import com.atlassian.activeobjects.external.ModelVersion;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.upgrade.v4.Project;
import teamerExt.jira.webwork.upgrade.v5.User;

public class ProjectUpgradeTask006 implements ActiveObjectsUpgradeTask {

    @Override
    public ModelVersion getModelVersion()
    {
        return ModelVersion.valueOf("6"); // (2)
    }

    @Override
    public void upgrade(ModelVersion currentVersion, ActiveObjects ao) // (3)
    {
        ao.migrate(ProjectMember.class); // (4)
        ao.migrate(Project.class); // (4)
        ao.migrate(User.class); // (4)

    }
}
