package teamerExt.jira.webwork.View;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.Lists;
import net.java.ao.Query;
import teamerExt.jira.webwork.Project.Project;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.Project.ProjectService;
import teamerExt.jira.webwork.Project.ProjectTeam;
import teamerExt.jira.webwork.Team.Team;
import teamerExt.jira.webwork.Team.TeamService;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collections;

import static com.google.common.base.Preconditions.checkNotNull;
@Named

public class ViewServiceImpl implements ViewService {

    @ComponentImport
    private final ActiveObjects ao;
    private final ProjectService projectService;
    private final TeamService teamService;


    @Inject
    public ViewServiceImpl(ActiveObjects ao, ProjectService projectService, TeamService teamService)
    {
        this.ao = checkNotNull(ao);
        this.teamService = teamService;
        this.projectService = projectService;
    }

    @Override
    public ArrayList<Team> getAllViews() {
        final Query query = Query.select("VIEW_ID").distinct();
        return Lists.newArrayList(ao.find(Team.class, query));

    }

    @Override
    public void cloneView(int viewId) throws Exception {
        //pobieramy zespoly dla widoku
        Iterable<Team> teams = this.teamService.getTeamsByViewId(viewId);
        View clonedView = this.getViewById(String.valueOf(viewId));

        int lastViewId = this.lastViewId();
        View newView = ao.create(View.class);
        newView.setViewId(lastViewId);
        newView.setOkp(Double.parseDouble(clonedView.getOkp()));
        newView.setName(clonedView.getName());
        newView.save();

        //iterujemy po kazdym zespole i dodajemy go z nowym widokiem
        for(Team team : teams) {
            Team newTeam = ao.create(Team.class);
            newTeam.setViewId(lastViewId);
            newTeam.setName(team.getName());
            newTeam.save();
            int newAddedTeamId = newTeam.getID();

            //pobieramy projekty dla zespolu i dodajemy
            Iterable<ProjectTeam> projectsTeam = projectService.allProjectsByTeam(team.getID());

            for(ProjectTeam projectTeam : projectsTeam) {
                //pobieramy projekt jego dane i zapisujemy
                Project project = projectService.getProjectById(projectTeam.getProjectId());
                Project newProject = ao.create(Project.class);
                newProject.setIncome(project.getIncome());
                newProject.setName(project.getName());
                newProject.save();
                int newProjectId = newProject.getID();

                //wiazemy projekt z zespolem w innej tabeli
                ProjectTeam newProjectTeam = ao.create(ProjectTeam.class);
                newProjectTeam.setProjectId(newProjectId);
                newProjectTeam.setTeamId(newAddedTeamId);
                newProjectTeam.save();

                Iterable<ProjectMember> projectMembers = projectService.getProjectMembersByProjectId(projectTeam.getProjectId());
                for(ProjectMember projectMember : projectMembers) {
                    ProjectMember newProjectMember = ao.create(ProjectMember.class);
                    newProjectMember.setUserId(projectMember.getUserId());
                    newProjectMember.setOkp(projectMember.getOkp());
                    newProjectMember.setCost(projectMember.getCost());
                    newProjectMember.setBilled(projectMember.getBilled());
                    newProjectMember.setAvailability(projectMember.getAvailability());
                    newProjectMember.setProjectId(newProjectId);
                    newProjectMember.setRole(projectMember.getRole());
                    newProjectMember.save();
                    int newProjectMemberId = newProjectMember.getID();

                }
            }
        }

    }

    @Override
    public View getViewById(String viewId) {
        View[] views;
        views = ao.find(View.class, Query.select().where("VIEW_ID = ? AND NAME <> ''", viewId)
        );
        return views.length > 0 ? views[0] : ao.create(View.class);
    }



    private Integer lastViewId() {
        ArrayList<Team> teams = this.getAllViews();
        ArrayList<Integer> viewsIds = new ArrayList<>();
        for(Team team : teams) {
            viewsIds.add(Integer.valueOf(team.getViewId()));
        }
        int lastViewId = Collections.max(viewsIds);
        return ++lastViewId;
    }
}
