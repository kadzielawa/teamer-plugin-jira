package teamerExt.jira.webwork.upgrade.v4;

import net.java.ao.Entity;
import net.java.ao.ManyToMany;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;
import teamerExt.rest.ProjectMemberModelXML;

import java.util.ArrayList;
import java.util.List;

@Preload
public interface Project extends Entity {

    void setIncome(double income);
    double getIncome();
    @ManyToMany(value = ProjectToUser.class)
    public ArrayList<ProjectMemberModelXML> getProjectMembers();

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public String getName();

    void setName(String name);

}
