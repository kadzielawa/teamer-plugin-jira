package teamerExt.rest;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.jira.webwork.User.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
    import javax.ws.rs.core.Response;
import java.util.*;
import teamerExt.jira.webwork.User.User;

@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
@AnonymousAllowed
@Path("users")
public class Users {

    private final UserService userService;

    public Users(UserService userServicee) {
        userService = userServicee;
    }

    @GET
    public ArrayList getAllUsers() throws Exception {

        Iterable<User> users = this.userService.all();
        JSONArray usersList = new JSONArray();
        for (User user : users) {
            JSONObject obj = new JSONObject();
            obj.put("name",user.getFirstname() + " " + user.getLastname());
            obj.put("salary",user.getSalary());
            obj.put("id",user.getID());
            obj.put("role",user.getRole());
            usersList.add(obj);
        }
        return usersList;
    }

}
