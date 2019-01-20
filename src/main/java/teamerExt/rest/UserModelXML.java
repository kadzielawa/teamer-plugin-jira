package teamerExt.rest;

import teamerExt.jira.webwork.User.User;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement
public class UserModelXML {


    @XmlElement (name = "id")
    private int id;
    @XmlElement (name = "role")
    private String role;
    @XmlElement (name = "salary")
    private String salary;
    @XmlElement (name = "name")
    private String name;

    public UserModelXML() {}

    public int getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public void setId(int id) {
        this.id = id;
    }
}