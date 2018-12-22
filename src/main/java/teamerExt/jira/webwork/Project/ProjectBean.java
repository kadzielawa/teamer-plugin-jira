package teamerExt.jira.webwork.Project;

public class ProjectBean {
    public String name;
    public Integer id;
    public double income;

    public String getName(){
        return name;
    };
    void setName(String name){
        this.name = name;
    };

    void setIncome(double income){
        this.income = income;
    };

    public Integer getId() {
        return id;
    }

    public void setId(Integer ID) {
        this.id = ID;
    }

    public double getIncome() {
        return this.income;

    };
}
