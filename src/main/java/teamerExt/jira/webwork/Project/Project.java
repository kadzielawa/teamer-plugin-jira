package teamerExt.jira.webwork.Project;


import net.java.ao.Entity;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

public interface Project extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public String getName();
    void setName(String name);

    void setIncome(double income);
    double getIncome();

}
