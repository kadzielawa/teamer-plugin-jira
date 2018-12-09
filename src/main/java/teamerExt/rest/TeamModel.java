package teamerExt.rest;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement

public class TeamModel{

    @XmlElement(name = "name")
    public String name;
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

    public String getName(){
        return this.name;
    }
    void setName(String name){
        this.name =name;
    }
}
