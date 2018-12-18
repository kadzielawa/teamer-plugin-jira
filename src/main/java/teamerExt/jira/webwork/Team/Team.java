package teamerExt.jira.webwork.Team;


import net.java.ao.Entity;
import net.java.ao.OneToMany;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import net.java.ao.schema.Table;
import teamerExt.jira.webwork.Project.Project;

@Preload
@Table("Team")

public interface Team extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public String getName();
    void setName(String name);

    //@OneToMany(reverse="ss")


}
