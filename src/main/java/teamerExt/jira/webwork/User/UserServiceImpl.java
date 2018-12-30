package teamerExt.jira.webwork.User;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.Lists;
import net.java.ao.Query;
import com.atlassian.jira.util.json.JSONArray;
import com.atlassian.jira.util.json.JSONObject;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.plannerApi.URLConnection;


import javax.inject.Inject;
import javax.inject.Named;


import java.util.HashMap;
import java.util.Map;

import static com.google.common.base.Preconditions.checkNotNull;

@Named
public class UserServiceImpl implements UserService
{
    @ComponentImport
    private final ActiveObjects ao;


    @Inject
    public UserServiceImpl(ActiveObjects ao)
    {
        this.ao = checkNotNull(ao);
    }

    @Override
    public User add(String firstname,String lastname,String salary,String role)
    {
        final User user = ao.create(User.class);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setRole(role);
        user.setSalary(salary);
        user.save();

        return user;
    }

    @Override
    public void delete(User user)
    {
        ao.delete(user);
    }

    @Override
    public Iterable<User> all()
    {
        final Query query = Query.select().
                from(User.class);
        return Lists.newArrayList(ao.find(User.class, query));
    }

    @Override
    public ProjectMember associateProjectToUser(ProjectMember projectMember) {
        projectMember.save();
        return projectMember;
    }

    @Override
    public User getUserById(String userId) {
        User[] user = ao.find(User.class, Query.select().where("ID = ?", userId));
        return user[0];
    }

    @Override
    public void importUsers() throws Exception {

        HashMap<String, String> teams = this.getTeams();
        this.addUsers(teams);
    }


    HashMap<String, String> getTeams() throws Exception {

        HashMap<String, String> teams = new HashMap<String, String>();

        URLConnection url = new URLConnection();
        StringBuffer response = url.sendGet("https://jira.abbc.pl/rest/tempo-teams/1/team");

        JSONArray jsonArray = new JSONArray(response.toString());

        for (int i=0; i<jsonArray.length(); i++) {
            teams.put( jsonArray.getJSONObject(i).getString("id"), jsonArray.getJSONObject(i).getString("name"));
        }


        return teams;
    }

     void addUsers(HashMap<String, String> teams) throws Exception {

        for(Map.Entry team : getTeams().entrySet()) {

            URLConnection url = new URLConnection();
            StringBuffer response = url.sendGet("https://jira.abbc.pl/rest/tempo-teams/2/team/" + team.getKey() + "/member");
            JSONArray teamArray = new JSONArray(response.toString());

            for (int i=0; i<teamArray.length(); i++) {
                JSONObject currentObj =  teamArray.getJSONObject(i);
                JSONObject memberBean = currentObj.getJSONObject("memberBean");
                JSONObject membership = currentObj.getJSONObject("membership");
                String memberRoleFromJson = membership.getJSONObject("role").getString("name");
                String finalMemberRole = "";
                if(memberRoleFromJson.toLowerCase().contains("back-end")){
                    finalMemberRole = "BE";
                } else if(memberRoleFromJson.toLowerCase().contains("project")){
                    finalMemberRole = "PM";
                } else if(memberRoleFromJson.toLowerCase().contains("front-end")){
                    finalMemberRole = "FE";
                } else if(memberRoleFromJson.toLowerCase().contains("ux")){
                    finalMemberRole = "UX";
                } else if(memberRoleFromJson.toLowerCase().contains("software")){
                    finalMemberRole = "QA";
                } else {
                    finalMemberRole = "??";
                }

                String[] exploded=memberBean.getString("displayname").split(" ");
                this.add(exploded[0],exploded[1],"0",finalMemberRole);
            }

        }


    }
}
