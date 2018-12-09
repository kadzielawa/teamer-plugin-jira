package teamerExt.jira.webwork.User;


import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import teamerExt.jira.webwork.Project.ProjectService;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.google.common.base.Preconditions.checkNotNull;

@Scanned
public final class UserServlet extends HttpServlet
{
    private final UserService userService;


    @Inject
    public UserServlet(UserService userService)
    {
        this.userService = checkNotNull(userService);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {

        final String user_id = req.getParameter("user_id");
        userService.delete(userService.getUserById(user_id));
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {

        final String firstname = req.getParameter("firstname");
        final String lastname =req.getParameter("lastname");
        final String salary =req.getParameter("salary");
        final String role =req.getParameter("role");

        userService.add(firstname,lastname,salary,role);
        res.sendRedirect(req.getContextPath() + "/secure/usersAction.jspa");
    }


}