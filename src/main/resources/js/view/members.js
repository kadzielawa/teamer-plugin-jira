define('view/members', ['jquery',  'backbone','underscore','mustache','view/project-result'], function($, Backbone,_,mustache,ProjectResultView) {

    var xxxmodel = Backbone.Model.extend({
        initialize: function (options) {
            var define_okp = parseInt($("#okpCost").html());
            var availability = this.get('availability');
            this.set('define_okp',define_okp);
            var real_okp = (availability / 100) * define_okp;
            this.set('okp',real_okp );
        },

    });

    var MembersView = Backbone.View.extend({

        events: {
            'click .billedToggleButton' : 'billedClick',
            'change .billedToggleButton' : 'billedClick'
        },
        projectData: null,
        membersCollection: null,
        initialize: function(options) {
            this.projectData = options.projectData;
            this.okp = parseInt($("#okpCost").html())
            this.setElement(options.el)
            this.restfulTableId = options.restfulTableId
            this.addRESTfulTable();
            this.checkIfColumnsAreDisplayed(this.restfulTableId,this.projectData.teamId);
        },
        billedClick: function (event) {
            var $userRow = $(event.target.closest('tr'))
            var userId = $userRow.data('user_id');
        },

        addRESTfulTable: function () {
            var that = this;
            var projectId = this.restfulTableId;
            var EditGroupView = AJS.RestfulTable.CustomCreateView.extend({

                render: function (self) {
                    var $text = $("<input type='text' value='"+ self.value +"' class='userSearcher text' name='user_id' placeholder='wyszukaj Usera'> ");

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
                    var $disabledField = $('<input type="text" class="text okp-input" value="' + value +'" name="okp" disabled>')
                    return $disabledField;
                }
            });

            var OKPReadView = AJS.RestfulTable.CustomEditView.extend({
                render: function (self) {

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
                id: "restfultable_"+projectId,
                allowReorder: false,
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
                        fieldName:"developer_name",
                        header: "Imię i nazwisko",
                        createView: EditGroupView
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
                    var projectresultView = new ProjectResultView({collection:data,projectData:that.projectData});
                    $ecl.after(projectresultView.render().el)
                }
            })

            $ecl.bind(AJS.RestfulTable.Events.INITIALIZED, function () {
                console.log('ooo')
                var elements = $ecl.find('.userSearcher');
                _.each(elements,function (element,i) {
                    $(element).auiSelect2( {
                        ajax: {
                            url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                            dataType: 'json',
                            results: function results(data) {
                                usersDeveloperData = data;
                                return {
                                    results: data
                                };
                            },
                        }})
                })

            });


            jQuery(document).bind(AJS.RestfulTable.Events.ROW_ADDED, function (event,addedRow,table) {
                console.log('dupa')
                timeout = null;
                check = function () {
                    var rootElement= table.focusedRow.$el[0]
                    var childs = rootElement.children;
                    var element = rootElement.getElementsByClassName('userSearcher')[0];
                    if ($(element).is('[type=text]')) { // assuming a jQuery object here

                        that.updateDeveloperName(addedRow);
                        that.afterAddedRowCallback(addedRow,table,element);
                        clearTimeout(timeout)
                    } else {
                        timeout = setTimeout(check, 100);
                    }
                };
                check();
            });

            jQuery(document).bind(AJS.RestfulTable.Events.EDIT_ROW, function (event,addedRow,table) {
                 setTimeout(function () {
                    var addedRowx = addedRow.el.children;
                    addedRowx[0].parentNode.removeChild(addedRowx[0]);
                     $(addedRow.el).find("input.aui-button").on('click', function (e) {
                    var updatedRow = $(e.target).closest('tr');
                         setTimeout(function () {
                             var updatedRowColumns = $(updatedRow)[0].children;
                             updatedRowColumns[0].parentNode.removeChild(updatedRowColumns[0]);
                         },100)
                     });
                }, 100);
            });
            },

        checkIfColumnsAreDisplayed: function (projectId,teamId) {
            var that =this;
            var membersTable = $("#person-list-"+teamId + "_"+projectId);
            var timeoutColumns = null;

            if(membersTable.length > 0){

                var $auiSortable = $(membersTable.children()[2]);
                if($auiSortable.children().length > 0) {

                    this.hideColumns($(membersTable));
                    clearTimeout(timeoutColumns)
                }
            } else {
                timeoutColumns = setTimeout(function(){
                    that.checkIfColumnsAreDisplayed(projectId,teamId)
                }, 100);
            }
        },
        hideColumns:function (membersTable) {
            var $auiThead = membersTable.children()[0];
            var $auiCreateRow = membersTable.children()[1];
            var $auiBody = membersTable.children()[2];

            var thColumns = $auiThead.children[0].children;
            var tbody =$auiBody.children;
            var tcreaterow =$auiCreateRow.children[0].children;

            for (var j = tbody.length - 1; j >= 0; j--) {
                var tcells = tbody[j].children;
                for (var k = tcells.length - 1;k>= 0; k--) {
                    if(k === 0|| k === 1) {
                        tcells[k].parentNode.removeChild(tcells[k]);
                    }
                }
            }

            for (var i = thColumns.length - 1; i >= 0; i--) {
                if(i === 0|| i === 1) {
                    thColumns[i].parentNode.removeChild(thColumns[i]);
                }
            }

            for (var i = tcreaterow.length - 1; i >= 0; i--) {
                if(i === 1|| i === 0) {
                    tcreaterow[i].parentNode.removeChild(tcreaterow[i]);
                }
            }

        },

        updateDeveloperName:function (addedRow) {
            var searchedDeveloper = _.findWhere(usersDeveloperData,{id:Number(addedRow.model.get('user_id'))});
            addedRow.model.set('developer_name',searchedDeveloper.text);
            addedRow.refresh()

        },
        afterAddedRowCallback: function (addedRow,table,element) {
            $(element).auiSelect2( {
                ajax: {
                    url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                    dataType: 'json',
                    results: function results(data) {
                        usersDeveloperData = data;
                        return {
                            results: data
                        };
                    },
                }});
        }
    });
    return MembersView;
});





usersDeveloperData = null;