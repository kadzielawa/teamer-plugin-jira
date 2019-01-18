AJS.$(document).ready(function() {
    var userTable = new AJS.RestfulTable({
        autoFocus: true,
        el: $('#usersList'),
        allowReorder: false,
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
                allowEdit: false
            },
            {
                id: "salary",
                header: "Salary",
                allowEdit: false
            }
        ]
    });
});