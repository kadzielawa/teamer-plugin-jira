package teamerExt.jira.webwork.User;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.Lists;
import net.java.ao.Query;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectMember;


import javax.inject.Inject;
import javax.inject.Named;


import static com.google.common.base.Preconditions.checkNotNull;

@Scanned
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
        final Query query = Query.select();
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
