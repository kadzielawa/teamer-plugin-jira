package teamerExt.jira.webwork.Project;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.user.UserManager;
import com.google.common.collect.Lists;
import net.java.ao.Query;
import teamerExt.jira.webwork.User.User;

import javax.inject.Inject;
import javax.inject.Named;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.collect.Lists.newArrayList;

@Scanned
@Named
public class ProjectServiceImpl implements ProjectService
{
    @ComponentImport
    private final ActiveObjects ao;


    @Inject
    public ProjectServiceImpl(ActiveObjects ao)
    {
        this.ao = checkNotNull(ao);
    }

    @Override
    public Project add(String name,double income)
    {
        final Project project = ao.create(Project.class);
        project.setName(name);
        project.setIncome(income);
        project.save();
        return project;
    }

    @Override
    public void delete(Project project)
    {
        ao.delete(project);
    }

    @Override
    public ArrayList<ProjectMember> getProjectMembersByProjectId(String projectId) {
        Query query =  Query.select().from(ProjectMember.class).alias(ProjectMember.class,"pm")
                .join(User.class,"USER_ID = pm.USER_ID")
                .where("pm.PROJECT_ID = ?",projectId);
        System.out.println("ILOŚĆ");
        System.out.println(ao.count(ProjectMember.class,query));
        return Lists.newArrayList(ao.find(ProjectMember.class,query));
    }

    @Override
    public Iterable<Project> all()
    {
        final Query query = Query.select();
        return Lists.newArrayList(ao.find(Project.class, query));
    }

    @Override
    public Iterable<ProjectTeam> allProjectsByTeam(String teamId)
    {
        return Lists.newArrayList(ao.find(ProjectTeam.class, Query.select().where("TEAM_ID = ?", teamId)));
    }


    @Override
    public Project getProjectById(Integer projectId) throws NullPointerException {
        if(projectId == null){
            throw new NullPointerException("Projekt nie może być nullem");
        }
        System.out.println("CCCCC");
        System.out.println(projectId);
        Project[] project = ao.find(Project.class, Query.select().where("ID = ?", projectId));

        return project[0];
    }

/*
    private User getOrCreateUser(ActiveObjects ao, String userName)
    {
        User[] users = ao.find(User.class, Query.select().where("USERNAME = ?", userName));
        if (users.length == 0) {
            return createUser(ao, userName);
        } else if (users.length == 1) {
            return users[0];
        } else {
            throw new IllegalStateException("There shouldn't be 2 users with the same username! " + userName);
        }
    }
*/

/*    private User createUser(ActiveObjects ao, String userName)
    {
        return ao.create(User.class, ImmutableMap.<String, Object>of("USERNAME", userName));
    }*/

}
