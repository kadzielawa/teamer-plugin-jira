package teamerExt.jira.webwork.upgrade.v3;

import net.java.ao.Entity;
import net.java.ao.OneToMany;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import teamerExt.jira.webwork.Project.Project;

public interface Team extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public String getName();
    void setName(String name);

    @OneToMany
    public Project[] getProjects();

}
