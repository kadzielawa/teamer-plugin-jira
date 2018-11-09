package teamerExt.jira.webwork.Model;

public class Team {

    private String availability;
    public String name;
    private String id;

    public String getAvailability() {
        return availability;
    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
