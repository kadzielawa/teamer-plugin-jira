require(['jquery', 'backbone', 'mustache'], function($, Backbone, mustache) {

    AJS.toInit(function() {

        var ProjectModel = Backbone.Model.extend({
            defaults: function() {
                return {
                    name: "default project name",
                    income: 22
                };
            }
        });

        var projectCollection = Backbone.Collection.extend({

          //  url: AJS.contextPath() + '/rest/team/1.0/team',
            model: ProjectModel,
            teamId : null,
            initialize: function (teamId) {
                console.log('new collection project created');
                console.log(teamId);

                this.teamId = teamId;
            }

        });


           var teamsView = Backbone.View.extend({
            el: '.buttons-teams-manage',
            events: {
                'click #button-add-team' : 'addTeamToView'
            },

            allowToAdd: 1,

            initialize: function() {
                this.listenTo(Teams, 'add', this.addTeam);
                this.listenTo(Teams, 'destroy', this.removeItem);
                Teams.fetch();
            },


            addTeam: function (model) {

                if(model.isUpdated === 0) {
                    var view = new teamView({model: model});
                    $(".teams-list").append(view.render().el);
                }
            },
               //if removed item is new item
            removeItem: function(model) {
                if(model.isUpdated === 1) {
                    this.allowToAdd = 1;
                }
            },
            addTeamToView: function () {

                if(this.allowToAdd === 0 ){
                    return false;
                }

                this.allowToAdd =0;
                var model = new TeamModel;
                //set item is added to view only.
                model.isUpdated = 1;

                Teams.add(model);
                var view = new teamView({model:model});
                $(".teams-list").append(view.render().el);
            }

        });


        var TeamModel = Backbone.Model.extend({
            urlRoot: AJS.contextPath() + '/rest/team/1.0/team',
            isUpdated:  0,
            initialize: function () {
                console.log('Create new model');

            },

            defaults: function() {
                return {
                    id: Teams.nextId(),
                    name: "empty todo..."
                };
            },


        });

        var teamCollection = Backbone.Collection.extend({

            url: AJS.contextPath() + '/rest/team/1.0/team',
            model: TeamModel,

            nextId: function() {
                if (!this.length) return 1;
                return this.last().get('id') + 1;
            },

        });


        var Teams = new teamCollection;

        var projectView = Backbone.View.extend({
           tagName : 'div',
           templates: {
               'projectContainer' : $('project-row').html()
           },
            initialize: function() {
               console.log('new view project created');
            },
            projectData: {
              //  projectName : this.model.get("name"),
            //    projectId:  this.model.get("id")
            },
            render: function () {
                this.$el.html(mustache.render(this.templates.projectContainer,this.projectData));
                return this;
            }
        });

        var teamView = Backbone.View.extend({
            tagName: 'div',

            events: {
                'click .save': 'saveTeam',
                'click .delete': 'destroy',
                'change .team-name': 'updateName',
                'click .button-add-project': 'addProject'
            },
            projectCollection : null,
            templates: {
              'teamContainer': $('#team-row').html()
            },
            initialize: function() {
                this.el.append(this.render());
                this.listenTo(this.model, 'change', this.render);
                this.projectCollection = new projectCollection;
            },
            addProject: function() {
                var newProject = new ProjectModel;
                this.projectCollection.add(newProject);
                var teamId = this.model.get('id');
            },
            removeFailed: function (model,response) {
                var myFlag = AJS.flag({
                    type: 'success',
                    body:'',
                });
            },
            removeSuccess: function (model,response) {
                var myFlag = AJS.flag({
                    type: 'error',
                    body: '',
                });
            },
            destroy: function () {
                this.undelegateEvents();
                this.$el.removeData().unbind();
                this.remove();

                this.model.destroy({success: this.removeSuccess, error: this.removeFailed});
                this.remove();
                //OR
                this.$el.empty();
            },
            render: function() {
                var teamData = {
                    getProjectUrl: AJS.contextPath() + '/rest/project/1.0/project',
                    restfulTableId: this.model.get('id'),
                    teamId:  this.model.get('id'),
                    teamName: this.model.get('name')
                };
                this.$el.html(mustache.render(this.templates.teamContainer,teamData));
                return this;
            },

            updateName: function (evt) {
                var projectName = $(evt.target).val();
                this.model.set('name',projectName) ;
            },

            saveTeam: function () {
                this.model.isUpdated = 1;
                this.model.save();
                Teams.add(this.model);
                teamsViewRun.allowToAdd = 1;
            }


        });


teamsViewRun = new teamsView();


        var restfulTableId = 8572;
/*
    AJS.$('#button-add-team').on('click',function() {

        var currentRestfulTableId = restfulTableId;

        //ADD TABLE WHEN PROJECT IS ADDED
        AJS.$('#select-get-team-'+ currentRestfulTableId).on('change',function(e){
            var teamId = AJS.$('#select-get-team-'+currentRestfulTableId).val();


            restfulTable = new AJS.RestfulTable({
                el: jQuery("#table-team-"+currentRestfulTableId),
                autoFocus: true,
                resources: {
                    all: function(x){
                        AJS.$.ajax({
                            url:  AJS.contextPath() + "/rest/project/1.0/project/"+teamId,
                            type: "GET",
                            dataType: "json",
                            success: function (data) {
                                x(data);
                            }
                        });

                    },
                    self: AJS.contextPath() + "/rest/projectmembers/1.0/projectmembers"
                },
                columns: [

                    {
                        id: "xx",
                        allowEdit: false,
                        header: "Imię i nazwisko",
                    },
                    {
                        id: "billed",
                        header: "Bilowalność",
                    }, {
                        id: "role",
                        header: "Rola",
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

        });


        //ADD TABLE WHEN NEW PROJECT
        AJS.$('#button-add-team-'+ currentRestfulTableId).on('click',function(){
        restfulTable = new AJS.RestfulTable({
            el: jQuery("#table-team-"+currentRestfulTableId),
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
                    id: "xx",
                    allowEdit: false,
                    header: "Imię i nazwisko",
                },
                {
                    id: "billed",
                    header: "Bilowalność",
                }, {
                    id: "role",
                    header: "Rola",
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
        });

        restfulTableId++;

    });
});*/
});
});