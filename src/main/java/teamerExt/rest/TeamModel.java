package teamerExt.rest;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement

public class TeamModel{

    @XmlElement(name = "name")
    public String name;
    @XmlElement(name = "projectIds")
    public ArrayList<Integer> projectIds;
    @XmlElement(name = "id")
    public int id;
    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
       this.id = id;
    }

    public ArrayList<Integer> getProjectIds() {
        return projectIds;
    }

    public void setProjectIds(ArrayList<Integer> projectIds) {
        this.projectIds = projectIds;
    }

    public String getName(){
        return this.name;
    }
    void setName(String name){
        this.name =name;
    }
}
