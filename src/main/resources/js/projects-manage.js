
require(['jquery', 'backbone', 'mustache'], function($, Backbone, mustache) {

    AJS.toInit(function() {

        var ProjectPageView = Backbone.View.extend({


        });

            AJS.$("#button-add-project").on('click',function(e){
            e.preventDefault();
            AJS.dialog2('#add-project-dialog').show();
        });
     AJS.$("#button-add-project").on('click',function(e){
            e.preventDefault();
            AJS.dialog2('#add-project-dialog').show();
        });



        if(AJS.$("#addUser-toProject").length > 0) {

            var $eventSelect = AJS.$("#addUser-toProject");

           $xx =   $eventSelect.auiSelect2({
               placeholder: 'Wybierz pracownika'
            });


            var restfulTable = null;
            $eventSelect.on("change", function (e) {
                $eventSelect.val("");
                $(this).val("");
                if(AJS.$("#project-create-income").val() === "" || AJS.$("#project-create-name").val() === ""){
                    var myFlag = AJS.flag({
                        type: 'error',
                        body: 'Uzupełnij przychód i nazwę projektu.',
                    });
                    return false;
                }
                if(restfulTable == null) {
                    AJS.$.ajax({
                        url: "/jira/plugins/servlet/addproject",
                        type: "POST",
                        data: {name:  AJS.$("#project-create-name").val()
                            ,income: AJS.$("#project-create-income").val()},
                        dataType: "json",
                        success: function (id) {

                            restfulTable = new AJS.RestfulTable({
                                el: jQuery("#project-members-assigned"),
                                autoFocus: true,
                                resources: {
                                    all: function(x){
                                        var y = [];
                                        x(y);
                                    },
                                    self: AJS.contextPath() + "/rest/projectmembers/1.0/projectmembers"
                                },
                                columns: [

                                    {
                                        id: e.added,
                                        allowEdit: false,
                                        header: "Imię i nazwisko",
                                        editView: EditGroupView
                                    },
                                    {
                                        id: "billed",
                                        header: "Bilowalność",
                                        editView: CheckboxEditView
                                    }, {
                                        id: id,
                                        header: "Rola",
                                        editView: EditIdProjectView
                                    },
                                    {
                                        id: "availability",
                                        header: "Zaangażowanie"
                                    },
                                    {
                                        id: "cost",
                                        header: "Koszt"
                                    },
                                    {
                                        id: "okp",
                                        header: "OKP"
                                    }
                                ]
                            });

                        }

                    });
                } else {
                   restfulTable.addRow({id: 22,availability:20});
                }
            });


        }
        var CheckboxEditView = AJS.RestfulTable.CustomEditView.extend({
            render: function (self) {
                var $select = $('<aui-toggle id="gzip-compression" label="use gzip compression"></aui-toggle>' +
                    "<input type='hidden' name='" + self.name + "'/>");
                return $select;
            }
        });

        var EditIdProjectView = AJS.RestfulTable.CustomEditView.extend({
            render: function (self) {
                var $select = $("<select name='role' style='    width: 54px;' class='select'>" +
                "<option value='BE'>BE</option>" +
                "<option value='FE'>FE</option>" +
                "<option value='QA'>QA</option>" +
                "<option value='LEAD'>LEAD</option>" +
                "<option value='PM'>PM</option>" +
                "</select>" + "<input type='hidden' name='projectId' value='"+self.name+"'>");
                return $select;
            }
        });

        var EditGroupView = AJS.RestfulTable.CustomEditView.extend({
            render: function (self) {

                var $select = $("<select name='userId' style='width: 144px;' class='select'>" +
                    "<option value='"+self.name.id+"'> " + self.name.text +"</option>" +
                    "</select>");

                return $select;
            }
        });


    });
});