package teamerExt.rest;


import teamerExt.jira.webwork.User.User;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement
public class ProjectModel {



    @XmlElement (name = "value")
    private int value;
    @XmlElement (name = "label")
    private String label;
    @XmlElement (name = "income")
    private double income;
    @XmlElement (name = "users")
    public User[] users;

    public ProjectModel() {}


    void setIncome(double income){
        this.income = income;
    };

    double getIncome() {
        return income;
    };

    public void setValue(int value)
    {
        this.value = value;
    }

    public int getValue()
    {
        return value;
    }

    public String getLabel()
    {
        return label;
    }

    public void setLabel(String label)
    {
        this.label = label;
    }


}