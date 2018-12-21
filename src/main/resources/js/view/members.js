define('view/members', ['jquery',  'backbone','mustache','aui/select'], function($, Backbone,mustache,auiselect) {
    var MembersView = Backbone.View.extend({

        events: {
            'click .billedToggleButton' : 'billedClick'
        },
        membersCollection: null,
        initialize: function(options) {
            this.setElement(options.el)
            this.restfulTableId = options.restfulTableId
            this.addRESTfulTable();

        },
        billedClick: function (event) {
            var $userRow = $(event.target.closest('tr'))
            var userId = $userRow.data('user_id');

        },
        addUser: function (model) {
          console.log('add mode');
          console.log(model)
/*
            this.$el.find('.userSearcher').auiSelect2( {
                ajax: {
                    url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                    dataType: 'json',
                    results: function results(data) {

                        return {
                            results: data
                        };
                    },
                }})*/
        },
        addRESTfulTable: function (projectId) {

            projectId = this.restfulTableId;
            var EditGroupView = AJS.RestfulTable.CustomCreateView.extend({

                render: function (self) {
                    var $text = $("<input type='text' class='userSearcher' name='user_id' placeholder='wyszukaj Usera'> ");

                    $text.val(self.value); //
                    return $text;
                }
            });

            var BilledAuiToogleReadView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {
                    var status = 'disabled';
                    if(self.value == "on"){
                        status = "checked disabled";
                    }
                    var $text = $(
                        '<aui-toggle label="toggle button"' + status + '></aui-toggle>');

                    return $text;
                }
            });

            var BilledAuiToogleView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {
                    console.log(self);
                    var isChecked = '';
                    if(self.value == "on"){
                        isChecked = "checked='checked'";
                    }
                    var $text = $(
                        '<aui-toggle class="billedToggleButton" label="toggle button"' + isChecked + '></aui-toggle>');

                    return $text;
                }
            });

            var RoleAuiSelectView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {
                  var roles = ['BE','FE','QA','LEAD'];


                    var select =
                        '<aui-select ' +
                        'name="role"' +
                        ' placeholder="Wybierz rolę" >';
                    roles.forEach(function(el,i){
                        if(self.value == el){
                            select += ' <aui-option>' + el +'</aui-option>'
                        } else {
                            select += ' <aui-option selected>' + el +'</aui-option>'
                        }
                    });

                       select +='</aui-select>';

                    return $(select);
                }
            });


            var membersTable = new AJS.RestfulTable({
                autoFocus: true,
                el: this.$el,
                allowReorder: true,
                resources: {
                    all: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/'+projectId,
                    self: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/'+projectId
                },
                columns: [
                    {
                        id: "project_member_id",
                        header: "id project member",
                        allowEdit: false
                    },
                    {
                        id: "user_id",
                        allowEdit: false
                    },
                    {
                        id: "developer_name",
                        name:"user_id",
                        header: "Imię i nazwisko",
                        createView: EditGroupView,
                        allowEdit: false,
                    },
                    {
                        id: "role",
                        header: "Rola",
                        createView: RoleAuiSelectView,
                        editView: RoleAuiSelectView,
                    },
                    {
                        id: "billed",
                        fieldName: "biled",
                        header: "Bilowanie",
                        createView: BilledAuiToogleView,
                        editView: BilledAuiToogleView,
                        readView: BilledAuiToogleReadView
                    },
                    {
                        id: "availability",
                        header: "Zaangażowanie"
                    },
                    {
                        id: "cost",
                        header: "Koszt stawka"
                    },
                    {
                        id: "okp",
                        header: "OKP"
                    }
                ]
            });

            this.membersCollection = membersTable.getModels();

            this.listenTo(this.membersCollection, 'add', this.addUser);

            var $ecl =  this.$el


            jQuery(document).bind(AJS.RestfulTable.Events.INITIALIZED, function (event) {
                $ecl.find('.userSearcher').auiSelect2( {
                    ajax: {
                        url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                        dataType: 'json',
                        results: function results(data) {

                            return {
                                results: data
                            };
                        },
                    }})
            });


        },

    });

    return MembersView;
});

var addChooser = function (element) {

    $(element).auiSelect2( {
        ajax: {
            url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
            dataType: 'json',
            results: function results(data) {

                return {
                    results: data
                };
            },
        }})
}

jQuery(document).bind(AJS.RestfulTable.Events.ROW_ADDED, function () {

    var args = arguments;

    check = function () {
        var rootElement= args[2].focusedRow.$el[0]
        var element = rootElement.getElementsByClassName('userSearcher')[0];
        if ($(element).is('[type=text]')) { // assuming a jQuery object here
            addChooser(element);
        } else {
            setTimeout(check, 100);
        }
    };
    check();


});