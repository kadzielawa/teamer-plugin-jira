package teamerExt.jira.webwork.upgrade.v1;


import net.java.ao.Entity;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import net.java.ao.schema.Table;

@Table("User")
@Preload
public interface User extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    String getFirstname();
    String setFirstname(String Firstname);

    String getLastname();
    String setLastname(String Lastname);

    String setSalary(String Salary);
    String getSalary();

    String setRole(String Role);
    String getRole();
}
