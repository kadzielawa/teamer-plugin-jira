package teamerExt.rest.Validator;

import teamerExt.rest.ProjectMemberModelXML;

import java.util.ArrayList;
import java.util.List;

public class UserValidator {

        private List<String> errorList = new ArrayList<String>();
        private boolean validate;
        ProjectMemberModelXML projectMemberModel;

        public UserValidator(ProjectMemberModelXML projectMemberModel){
            this.projectMemberModel = projectMemberModel;

        }

    public List<String> getErrorList() {
        return errorList;
    }


    public boolean isValid(){


            if(this.projectMemberModel.getUser_id().length() <= 0)
            {
                errorList.add("Wybierz użytkownika!");
            }

            return this.errorList.isEmpty();
        }

}
