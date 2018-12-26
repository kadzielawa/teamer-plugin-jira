package teamerExt.jira.webwork.Project;

import com.atlassian.activeobjects.tx.Transactional;
import teamerExt.jira.webwork.User.User;

import java.util.ArrayList;
import java.util.List;

@Transactional
public interface ProjectService {

        Project add(String name, double income);

        Iterable<Project> all();

        Iterable<ProjectTeam>  allProjectsByTeam(int teamId);

        public ProjectTeam getProjectByTeamId(int teamId,int projectId) throws Exception;

        Project getProjectById(Integer projectId) throws NullPointerException;

        public void delete(ProjectMember projectMember);

        public void delete(ProjectTeam projectTeam);

        ProjectMember getProjectMemberByProjectMemberId(String projectMemberId);

        void delete(Project project);

        ArrayList<ProjectMember> getProjectMembersByProjectId(int projectId);

}
