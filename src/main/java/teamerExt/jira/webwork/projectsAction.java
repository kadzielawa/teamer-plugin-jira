package teamerExt.jira.webwork;


import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.Project.ProjectService;
import teamerExt.jira.webwork.User.User;
import teamerExt.jira.webwork.User.UserService;

import java.util.ArrayList;
import java.util.List;

public class projectsAction extends JiraWebActionSupport
{
    private static final Logger log = LoggerFactory.getLogger(usersAction.class);

    public Iterable<Project> projects = new ArrayList<>();
    public Iterable<User> users = new ArrayList<>();
    private final ProjectService projectService;
    private final UserService userService;

    public projectsAction(ProjectService projectServicec,UserService userServicec) {
        projectService = projectServicec;
        userService = userServicec;
    }


    public String execute() throws Exception {

        try {

            projects = projectService.all();

            users = userService.all();

        } catch(Exception e) {
            return "error";
        }
        return super.execute(); //returns SUCCESS
    }


    public Iterable<Project> getProjects() {
        return projects;
    }

    public Iterable<User> getUsers() {
        return users;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
