package teamerExt.jira.webwork.upgrade.v14;


import net.java.ao.Entity;
import net.java.ao.Preload;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

public interface View extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    public Integer getViewId();
    void setViewId(Integer viewId);

    public String getName();
    void setName(String name);

    void setOkp(double okp);
    double getOkp();

}
