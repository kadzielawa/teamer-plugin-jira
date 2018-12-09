package teamerExt.jira.webwork.upgrade.v5;


import net.java.ao.Entity;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.User.User;

public interface ProjectMember extends Entity {


    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public void setProject(Project post);
    public Project getProject();

    public void setUser(User user);
    public User getUser();

    public String getProjectId();

    public void setProjectId(String projectId);

    public String getBilled();

    public void setBilled(String billed);

    public String getRole();

    public void setRole(String role);

    public String getAvailability();

    public void setAvailability(String availability);

    public String getOkp();

    public void setOkp(String okp);

    public String getCost();

    public void setCost(String cost);

}
