package teamerExt.jira.webwork.Project;

import com.atlassian.activeobjects.tx.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
public interface ProjectService {

        Project add(String name, double income);

        Iterable<Project> all();

        Project getProjectById(String projectId);

        void delete(Project project);

        ArrayList<ProjectMember> getProjectMembersByProjectId(String projectId);
}
