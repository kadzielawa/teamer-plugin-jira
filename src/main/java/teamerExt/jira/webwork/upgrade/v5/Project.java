package teamerExt.jira.webwork.upgrade.v5;


import net.java.ao.Entity;
import net.java.ao.ManyToMany;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import teamerExt.jira.webwork.Project.ProjectMember;

@Preload
public interface Project extends Entity {

    void setIncome(double income);

    double getIncome();

    @ManyToMany(value = ProjectMember.class)
    public ProjectMember[] getProjectMembers();

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public String getName();

    void setName(String name);

}
