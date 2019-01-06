package teamerExt.rest;

import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectBean;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement

public class TeamModel{

    @XmlElement(name = "id")
    public int id;
    @XmlElement(name = "viewId")
    public int viewId;
    @XmlElement(name = "name")
    public String name;
    @XmlElement(name = "projects")
    public ArrayList<ProjectBean> projects;

    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
       this.id = id;
    }

    public ArrayList<ProjectBean> getProjects() {
        return projects;
    }
    public void setProjects(ArrayList<ProjectBean> projects) {
        this.projects = projects;
    }

    public String getName(){
        return this.name;
    }
    void setName(String name){
        this.name =name;
    }

    public int getViewId() { return viewId; }
    public void setViewId(int viewId) { this.viewId = viewId; }

}
