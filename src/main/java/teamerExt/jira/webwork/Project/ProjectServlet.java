package teamerExt.jira.webwork.Project;


import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.ResponseCache;

import static com.google.common.base.Preconditions.*;

@Scanned
public final class ProjectServlet extends HttpServlet
{
    private final ProjectService projectService;


    @Inject
    public ProjectServlet(ProjectService projectService)
    {
        this.projectService = checkNotNull(projectService);
    }

    /*@Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {

        final String projectId = req.getParameter("project_id");
        projectService.delete(projectService.getProjectById(projectId));
    }*/

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {

        final String projectId = req.getParameter("project_id");
        projectService.delete(projectService.getProjectById(projectId));
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {

        final String name = req.getParameter("name");
        final String income =req.getParameter("income");
        final String is_ajax =req.getParameter("is_ajax");
        Project newProject = projectService.add(name,Double.parseDouble(income));

        if(is_ajax == "1") {
            res.sendRedirect(req.getContextPath() + "/secure/projectsAction.jspa");
        } else {
            PrintWriter out = res.getWriter();
            res.setContentType("application/json");
            res.setCharacterEncoding("UTF-8");
            out.print(newProject.getID());
            out.flush();
        }

    }


}