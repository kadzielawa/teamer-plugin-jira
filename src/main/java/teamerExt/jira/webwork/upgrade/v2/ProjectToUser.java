package teamerExt.jira.webwork.upgrade.v2;

import net.java.ao.Entity;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.User.User;

public interface ProjectToUser extends Entity {
    public void setProject(Project post);
    public Project getProject();

    public void setUser(User user);
    public User getUser();

}
