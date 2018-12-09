package teamerExt.jira.webwork.Model;

import com.atlassian.jira.util.json.JSONArray;
import com.atlassian.jira.util.json.JSONObject;
import teamerExt.plannerApi.URLConnection;

import java.util.HashMap;
import java.util.Map;

public class TeamerModel {

    HashMap<String, String> getTeams() throws Exception {

        HashMap<String, String> teams = new HashMap<String, String>();

        URLConnection url = new URLConnection();
        StringBuffer response = url.sendGet("urltojira");

        JSONArray jsonArray = new JSONArray(response.toString());

        for (int i=0; i<jsonArray.length(); i++) {
            teams.put( jsonArray.getJSONObject(i).getString("id"), jsonArray.getJSONObject(i).getString("name"));
        }


        return teams;
    }

    public  HashMap<String,User> getUsers() throws Exception {

        HashMap<String,User> users = new HashMap<String, User>();


        for(Map.Entry team : getTeams().entrySet()) {

            URLConnection url = new URLConnection();
            StringBuffer response = url.sendGet("urltojra/" + team.getKey() + "/member");
            JSONArray teamArray = new JSONArray(response.toString());

            for (int i=0; i<teamArray.length(); i++) {
                JSONObject currentObj =  teamArray.getJSONObject(i);
                User user = new User();
                JSONObject memberBean = currentObj.getJSONObject("memberBean");
                JSONObject membership = currentObj.getJSONObject("membership");

                user.setDisplayName(memberBean.getString("displayname"));
                user.setAvatarUrl(memberBean.getJSONObject("avatar").getString("48x48"));
                user.setRoleName(membership.getJSONObject("role").getString("name"));


                Team userteam = new Team();

                userteam.setName(team.getValue().toString());
                userteam.setId(team.getKey().toString());

                userteam.setAvailability(membership.getString("availability"));

                if (users.get(memberBean.getString("name")) == null) {
                    user.addTeam(userteam);

                    users.put(memberBean.getString("name"),user);
                } else {
                    User existingUser = users.get(memberBean.getString("name"));
                    existingUser.addTeam(userteam);
                    users.put(memberBean.getString("name"),existingUser);

                }

            }

        }

        return users;


    }
}
