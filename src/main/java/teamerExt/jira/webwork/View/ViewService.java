package teamerExt.jira.webwork.View;

import teamerExt.jira.webwork.Team.Team;

import java.util.ArrayList;

public interface ViewService {

    public ArrayList<Team> getAllViews();

    public View getViewById(String viewId);

    public void cloneView(int viewId) throws Exception;

}
