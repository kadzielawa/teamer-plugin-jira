package teamerExt.jira.webwork;

import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import teamerExt.jira.webwork.Model.TeamerModel;
import teamerExt.jira.webwork.Model.User;
import java.util.HashMap;
import java.util.List;

public class teamerAction extends JiraWebActionSupport
{
    private static final Logger log = LoggerFactory.getLogger(teamerAction.class);

    public HashMap<String,User> users = new HashMap<String,User>();

    public String execute() throws Exception {

        try {

            TeamerModel teamerModel = new TeamerModel();
            users = teamerModel.getUsers();


        } catch(Exception e) {
            System.out.println(e.getMessage());
            return "er ror";
        }
         return super.execute(); //returns SUCCESS
    }


    public HashMap<String,User> getUsers() {
        return users;
    }

    public void setUsers(HashMap<String,User> usersx) {
        users = usersx;
    }
}
