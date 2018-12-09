package teamerExt.jira.webwork.Project;

import net.java.ao.Entity;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

public interface ProjectTeam  extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();


    public String getProjectId();
    void setProjectId(String projectId);

    public String getTeamId();
    void setTeamId(String teamId);

}
