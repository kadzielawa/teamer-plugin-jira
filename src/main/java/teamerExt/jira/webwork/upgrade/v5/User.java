package teamerExt.jira.webwork.upgrade.v5;

import net.java.ao.Entity;
import net.java.ao.ManyToMany;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import net.java.ao.schema.Table;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectMember;

@Table("User")
@Preload
public interface User extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    String getFirstname();
    void setFirstname(String Firstname);

    String getLastname();
    void setLastname(String Lastname);

    void setSalary(String Salary);
    String getSalary();

    void setRole(String Role);
    String getRole();
}
