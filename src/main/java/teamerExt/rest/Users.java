package teamerExt.rest;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.jira.webwork.User.Role;
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
    @Path("roles")
    public Response getRoles(@QueryParam("q") final String queryRole) throws Exception {

        JSONArray roles = new JSONArray();
        Iterable<Role> rolesModels;

        if(queryRole.length() > 0){
            rolesModels = userService.getRoleByString(queryRole);
        } else {
            rolesModels = userService.getAllRoles();
        }
        for(Role role: rolesModels){
            JSONObject roleObject=new JSONObject();
            roleObject.put("value",role.getName().toUpperCase());
            roleObject.put("label",role.getName().toUpperCase());
            roles.add(roleObject);
        };

        return Response
                .status(Response.Status.OK)
                .entity(roles.toString())
                .build();
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

    @DELETE
    @Path("{id}")
    public void deleteUser(@PathParam("id") final String userId) {
        User user = this.userService.getUserById(userId);
        this.userService.delete(user);
    }

    @PUT
    @Path("{id}")
    public void updateUser(@PathParam("id") final String userId,UserModelXML userModel) {
        User user = this.userService.getUserById(userId);
        user.setSalary(userModel.getSalary());
        user.setRole(userModel.getRole());

        ArrayList<Role> role = this.userService.getRoleByString(userModel.getRole());
        if(role.isEmpty()) {
            this.userService.addRole(userModel.getRole());
        }

        user.save();
    }

}
