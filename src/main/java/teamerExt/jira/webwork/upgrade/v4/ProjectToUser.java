package teamerExt.jira.webwork.upgrade.v4;

import net.java.ao.Entity;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectMember;


public interface ProjectToUser extends Entity {
    public void setProject(Project post);
    public Project getProject();
    public void setProjectMember(ProjectMember projectMemberModel);
    public ProjectMember getProjectMember();


}
