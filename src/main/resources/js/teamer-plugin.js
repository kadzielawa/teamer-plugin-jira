AJS.toInit(function(){

    AJS.$("#button-add-user").on('click',function(e){
        e.preventDefault();
        AJS.dialog2('#add-user-dialog').show();
    });

    AJS.$("#user-create-cancel").on('click',function(e){
        e.preventDefault();
        AJS.dialog2('#add-user-dialog').hide();
    });

AJS.$('.delete-project').on('click', function() {
    var project_id = $(this).data('project_id');
    if(project_id !== 'undefined') {
        AJS.$.ajax({
            url: "/jira/plugins/servlet/addproject" + '?project_id=' + project_id,
            type: "DELETE",
            data: {xxx: "xx1"},
            dataType: "json",
            success: function (msg) {
                var myFlag = AJS.flag({
                    type: 'success',
                    body: 'Project has been completely deleted!',
                });
                $(this).parent().parent().remove();

            }

        });
    } else {
        alert('project_id can\'t be null')
    }
});

    AJS.$('.delete-user').on('click', function() {
        var user_id = $(this).data('user_id');
        if(user_id !== 'undefined') {
            AJS.$.ajax({
                url: "/jira/plugins/servlet/adduser" + '?user_id=' + user_id,
                type: "DELETE",
                dataType: "json",
                success: function (msg) {
                    var myFlag = AJS.flag({
                        type: 'success',
                        body: 'User has been completely deleted!',
                    });
                    $(this).parent().parent().remove();
                }
            });
        } else {
            alert('project_id can\'t be null')
        }
    });

});