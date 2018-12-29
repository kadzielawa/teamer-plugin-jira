package teamerExt.jira.webwork.User;


import teamerExt.jira.webwork.Project.ProjectMember;


public interface UserService {

    User add(String firstname,String lastname,String salary,String role);

    Iterable<User> all();
    void importUsers() throws Exception;
    User getUserById(String userId);
    void delete(User user);
    ProjectMember associateProjectToUser(ProjectMember projectMember);
}
