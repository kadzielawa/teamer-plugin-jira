define('view/members', ['jquery',  'backbone','mustache','view/project-result'], function($, Backbone,mustache,ProjectResultView) {

    var xxxmodel = Backbone.Model.extend({
        initialize: function (options) {
           console.log(options)
        },

    });

    var MembersView = Backbone.View.extend({

        events: {
            'click .billedToggleButton' : 'billedClick',
            'change .billedToggleButton' : 'billedClick'
        },
        membersCollection: null,
        initialize: function(options) {
            this.okp = parseInt($("#okpCost").html())
            this.setElement(options.el)
            this.restfulTableId = options.restfulTableId
            this.addRESTfulTable();

        },
        billedClick: function (event) {
            var $userRow = $(event.target.closest('tr'))
            var userId = $userRow.data('user_id');

        },
        addUser: function (model) {

        },

        changeModel: function (model) {
            console.log(model);
        },
        addRESTfulTable: function () {
            var that = this;
            var projectId = this.restfulTableId;
            var EditGroupView = AJS.RestfulTable.CustomCreateView.extend({

                render: function (self) {
                    var $text = $("<input type='text' value='"+ self.value +"' class='userSearcher' name='user_id' placeholder='wyszukaj Usera'> ");

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
                    var isChecked = '';
                    if(self.value == "on"){
                        isChecked = "checked='checked'";
                    }
                    var $text = $(
                        '<aui-toggle class="billedToggleButton" label="toggle button"' + isChecked + '></aui-toggle>');

                    return $text;
                }
            });

            var OKPView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {
                    var value = typeof self.value === 'undefined' ? "-" : self.value;
                    console.log('val1: '+value);
                    var $disabledField = $('<input type="text" class="text okp-input" value="' + value +'" name="okp" disabled>')
                    return $disabledField;
                }
            });

            var OKPReadView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {
                    console.log('val2: '+self.value);

                    var $disabledField = $('<span class="okp-input">'+ self.value+' zł</span>')
                    return $disabledField;
                }
            });

            var RoleAuiSelectView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {
                  var roles = ['BE','FE','QA','LEAD'];
                  var select = '<aui-select ' +
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
                model:xxxmodel,

                //nie dostal user_id i dlatego nie ma null w projekie
                noEntriesMsg: "Brak osób powiązanych z projektem",
                resources: {
                    all: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/'+projectId,
                    self: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/'+projectId
                },
                columns: [
                    {
                        id: "project_member_id",
                        header: "id project member",
                        fieldName:"id",
                        allowEdit: false
                    },
                    {
                        id: "user_id",
                        header: "user id",
                        allowEdit: false
                    },
                    {
                        id: "developer_name",
                        fieldName:"user_id",
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
                        header: "Zaangażowanie",
                        fieldName: "availability"
                    },
                    {
                        id: "cost",
                        header: "Koszt stawka",
                        fieldName: "cost"
                    },
                    {
                        id: "okp",
                        header: "OKP",
                        readView: OKPReadView,
                        createView: OKPView,
                        editView: OKPView,
                    }
                ]
            });

            this.membersCollection = membersTable.getModels();
            this.listenTo(this.membersCollection, 'add', this.addUser);

            var $ecl =  this.$el

            this.membersCollection.fetch({
                async: false,
                success: function (data) {
                    var projectresultView = new ProjectResultView({collection:data});
                    $ecl.after(projectresultView.render().el)
                }
            })


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

            jQuery(document).bind(AJS.RestfulTable.Events.EDIT_ROW, function (event,editedRow,table) {
                //compute okp
                var okp = that.okp * parseInt(editedRow.model.get('availability'));

                editedRow.model.set('okp',okp)
                console.log(editedRow.model);
                console.log(editedRow);


            });

            jQuery(document).bind(AJS.RestfulTable.Events.ROW_ADDED, function (event,addedRow,table) {

                timeout = null;
                check = function () {
                    var rootElement= table.focusedRow.$el[0]
                    var element = rootElement.getElementsByClassName('userSearcher')[0];
                    if ($(element).is('[type=text]')) { // assuming a jQuery object here
                        that.afterAddedRowCallback(addedRow,table,element);
                        clearTimeout(timeout)
                    } else {
                        timeout = setTimeout(check, 100);
                    }
                };
                check();
            });

        },

        afterAddedRowCallback: function (addedRow,table,element) {
            $(element).auiSelect2( {
                ajax: {
                    url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                    dataType: 'json',
                    results: function results(data) {
                        return {
                            results: data
                        };
                    },
                }});
        }
    });

    return MembersView;
});


