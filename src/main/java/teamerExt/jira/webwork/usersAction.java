

package teamerExt.jira.webwork;

import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import teamerExt.jira.webwork.User.User;
import teamerExt.jira.webwork.User.UserService;

import java.util.ArrayList;
import java.util.List;

public class usersAction extends JiraWebActionSupport
{
    private static final Logger log = LoggerFactory.getLogger(usersAction.class);

    public Iterable<User> users = new ArrayList<>();
    private final UserService userService;

    public usersAction(UserService userService) {
        this.userService = userService;
    }


    public String execute() throws Exception {

        try {

            users = userService.all();

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return "error";
        }
         return super.execute(); //returns SUCCESS
    }


    public Iterable<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
