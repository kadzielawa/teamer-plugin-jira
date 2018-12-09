package teamerExt.rest;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.*;

@XmlRootElement
public class ProjectMemberModelXML {

    @XmlElement (name = "id")
    private String id;
    @XmlElement (name = "userId")
    private String userId;
    @XmlElement (name = "projectId")
    private String projectId;
    @XmlElement (name = "billed")
    private String billed;
    @XmlElement (name = "role")
    private String role;
    @XmlElement (name = "availability")
    private String availability;
    @XmlElement (name = "okp")
    private String okp;
    @XmlElement (name = "cost")
    private String cost;
    @XmlElement (name = "project")
    private ProjectModel project;

    public ProjectMemberModelXML() {}

    public void setId(String id)
    {
        this.id = id;
    }

    public String getId()
    {
        return id;
    }

    public String getOkp()
    {
        return okp;
    }

    public String getCost()
    {
        return cost;
    }

    public void setCost(String cost)
    {
        this.cost = cost;
    }

    public void setOkp(String okp)
    {
        this.okp = okp;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getProjectId() {
        return projectId;
    }
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getBilled() {
        return billed;
    }

    public void setBilled(String billed) {
        this.billed = billed;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public ProjectModel getProject() {
        return project;
    }

    public void setProject(ProjectModel project) {
        this.project = project;
    }
}
