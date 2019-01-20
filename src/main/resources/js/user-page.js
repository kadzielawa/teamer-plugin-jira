AJS.$(document).ready(function() {

    var RoleAuiSelectView = AJS.RestfulTable.CustomEditView.extend({
        render: function (self) {
            console.log(self)
            var select = '<aui-select src="/jira/rest/users/1.0/users/roles" can-create-values="true" ' +
                ' placeholder="Wybierz rolę" name="role" >' +
                '<aui-option selected="selected" value="'+ self.value + '"> ' + self.value + ' </aui-option>' +
                '</aui-select>';

            return $(select);
        }
    });

    var userTable = new AJS.RestfulTable({
        autoFocus: true,
        el: $('#usersList'),
        allowReorder: false,
        model: Backbone.Model.extend({}),
        allowCreate: false,
        noEntriesMsg: 'There is no information about any user. Try import users or please wait for cron job.',
        resources: {
            all: AJS.contextPath() + '/rest/users/1.0/users/',
            self: AJS.contextPath() + '/rest/users/1.0/users/'
        },
        columns: [
            {
                id: "id",
                header: "User ID",
                fieldName:"id",
                allowEdit: false
            },
            {
                id: "name",
                header: "Name",
                allowEdit: false
            },
            {
                id: "role",
                header: "Role",
                editView: RoleAuiSelectView
            },
            {
                id: "salary",
                header: "Salary"
            }
        ]
    });
});