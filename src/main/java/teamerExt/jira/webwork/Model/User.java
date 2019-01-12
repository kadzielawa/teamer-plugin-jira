package teamerExt.jira.webwork.Model;

import java.util.HashMap;
import java.util.Map;

public class User {

    private String displayName;
    private String avatarUrl;
    private Integer fullAvailabilites =0;
    private String roleName;

    public  Map<String, Team> teamList = new HashMap<String, Team>();

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public  Map<String, Team> getTeamList() {
        return teamList;
    }

    public Integer getFullAvailabilites() {
        for (Map.Entry team :
             getTeamList().entrySet()) {
            Team tempTeam = (Team) team.getValue();
             fullAvailabilites +=   Integer.parseInt(tempTeam.getAvailability());
        }
        return fullAvailabilites;
    }

    public void addTeam(Team team){
        this.teamList.put(team.getId(),team);
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
