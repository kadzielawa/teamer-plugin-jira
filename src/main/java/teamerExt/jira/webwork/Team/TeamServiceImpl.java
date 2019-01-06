package teamerExt.jira.webwork.Team;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.collect.Lists;
import net.java.ao.Query;
import teamerExt.jira.webwork.Project.ProjectMember;
import teamerExt.jira.webwork.Project.ProjectService;
import teamerExt.jira.webwork.Project.ProjectTeam;

import javax.inject.Inject;
import javax.inject.Named;

import java.util.ArrayList;

import static com.google.common.base.Preconditions.checkNotNull;

@Named
public class TeamServiceImpl implements TeamService
{
    @ComponentImport
    private final ActiveObjects ao;
    private final ProjectService projectService;


    @Inject
    public TeamServiceImpl(ActiveObjects ao, ProjectService projectService)
    {
        this.ao = checkNotNull(ao);
        this.projectService = projectService;
    }


    @Override
    public Team add(String description) {
        return null;
    }

    @Override
    public Iterable<Team> all()
    {
        final Query query = Query.select();
        return Lists.newArrayList(ao.find(Team.class, query));
    }
    @Override
    public void delete(Team team) throws Exception {
        ao.delete(team);
        Iterable<ProjectTeam> projectTeams = this.projectService.allProjectsByTeam(team.getID());

        for(ProjectTeam projectTeam : projectTeams ){
            this.projectService.delete(projectTeam);
            Iterable<ProjectMember> projectMembers = this.projectService.getProjectMembersByProjectId(projectTeam.getProjectId());

            for(ProjectMember projectMember : projectMembers){
                this.projectService.delete(projectMember);
            }
        }
    }

    @Override
    public Team getTeamById(int teamId) throws Exception {
        Team[] team;
        team = ao.find(Team.class, Query.select().where("ID = ?", teamId));
        return team.length > 0 ? team[0] : null;
    }
    @Override
    public Iterable<Team> getTeamByViewId(int viewId){
        final Query query = Query.select().where("VIEW_ID = ?", viewId);
        return Lists.newArrayList(ao.find(Team.class, query));
    }

    @Override
    public ArrayList<Team> getAllViews() {
        final Query query = Query.select("VIEW_ID").distinct();
        return Lists.newArrayList(ao.find(Team.class, query));

    }
}
