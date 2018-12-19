package teamerExt.jira.webwork.Project;

import com.atlassian.activeobjects.tx.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
public interface ProjectService {

        Project add(String name, double income);

        Iterable<Project> all();

        Iterable<ProjectTeam>  allProjectsByTeam(String teamId);

        Project getProjectById(Integer projectId);

        void delete(Project project);

        ArrayList<ProjectMember> getProjectMembersByProjectId(String projectId);

}
