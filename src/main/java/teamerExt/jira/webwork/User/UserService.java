package teamerExt.jira.webwork.User;


import teamerExt.jira.webwork.Project.ProjectMember;

import java.util.ArrayList;


public interface UserService {

    User add(String firstname,String lastname,String salary,String role);
    Role addRole(String name);
    ArrayList<User> getUserByString(String queryUser,boolean isFullName);
    Iterable<User> all();
    ArrayList<Role> getRoleByString(String queryUser);
    Iterable<Role> getAllRoles();
    void importUsers() throws Exception;
    User getUserById(String userId);
    void delete(User user);
    ProjectMember associateProjectToUser(ProjectMember projectMember);
}
