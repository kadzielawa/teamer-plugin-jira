package teamerExt.jira.webwork.User;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.Lists;
import net.java.ao.Query;
import com.atlassian.jira.util.json.JSONArray;
import com.atlassian.jira.util.json.JSONObject;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpHeaders;
import teamerExt.jira.webwork.Project.ProjectMember;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import static com.google.common.base.Preconditions.checkNotNull;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
@Named
public class UserServiceImpl implements UserService
{
    private final String USER_AGENT = "Mozilla/5.0";

    @ComponentImport
    private final ActiveObjects ao;


    @Inject
    public UserServiceImpl(ActiveObjects ao)
    {
        this.ao = checkNotNull(ao);
    }

    @Override
    public Role addRole(String name) {
        final Role role = ao.create(Role.class);
        role.setName(name);
        role.save();
        return role;
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
    public ArrayList<User> getUserByString(String user,boolean isFullName)
    {Query query;
        if(isFullName) {
            String[] exploded = user.split(" ");
            query = Query.select().
                    from(User.class).where("LOWER(FIRSTNAME) LIKE LOWER(?) OR LOWER(LASTNAME) LIKE LOWER(?)", "%" + exploded[0] + "%","%" + exploded[1] + "%");
        } else {
            query = Query.select().
                    from(User.class).where("LOWER(FIRSTNAME) LIKE LOWER(?) OR LOWER(LASTNAME) LIKE LOWER(?)", "%" + user + "%", "%" + user + "%");
        }
        return Lists.newArrayList(ao.find(User.class, query));
    }
    @Override
    public Iterable<User> all()
    {
        final Query query = Query.select().
                from(User.class);
        return Lists.newArrayList(ao.find(User.class, query));
    }

    @Override
    public ArrayList<Role> getRoleByString(String queryUser) {
        final Query query = Query.select().
                from(Role.class).where("LOWER(NAME) LIKE LOWER(?)", "%" + queryUser + "%");
        return Lists.newArrayList(ao.find(Role.class, query));
    }

    @Override
    public Iterable<Role> getAllRoles() {
        final Query query = Query.select().
                from(Role.class);
        return Lists.newArrayList(ao.find(Role.class, query));
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

        String url = "";
        HttpClient client = new DefaultHttpClient();
        HttpGet request = new HttpGet(url);

        String auth = "" + ":" + "";
        byte[] encodedAuth = Base64.encodeBase64(
                auth.getBytes(StandardCharsets.ISO_8859_1));
        String authHeader = "Basic " + new String(encodedAuth);
        request.setHeader(HttpHeaders.AUTHORIZATION, authHeader);
        HttpResponse response = client.execute(request);
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));

        StringBuffer result = new StringBuffer();
        String line = "";
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        JSONArray rootOfPage =  new JSONArray(result.toString());

        for (int i = 0; i < rootOfPage.length(); i++) {
                JSONObject currentObj =  rootOfPage.getJSONObject(i);
                String displayName = currentObj.getString("displayName");
                if(this.getUserByString(displayName,true).isEmpty()) {
                    String[] exploded = displayName.split(" ");
                    this.add(exploded[0], exploded[1], "0", "");
                }
        }


    }

}
