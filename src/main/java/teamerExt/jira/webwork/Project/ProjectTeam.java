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


    public Integer getProjectId();
    void setProjectId(Integer projectId);

    public Integer getTeamId();
    void setTeamId(Integer teamId);

}
