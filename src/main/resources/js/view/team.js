
define('view/team', [
    'jquery', 'underscore',
    'backbone',
    'mustache',
    'view/project',
    'view/editable-input'], function($, _,Backbone,mustache,projectView,EditableInput) {

    var ProjectModel = Backbone.Model.extend({
        initialize: function (options) {
            this.collection = options.collection;
        },
        isUpdated:  0,

        remove: function () {
            var that = this;
            Backbone.ajax({
                dataType: "json",
                type: "DELETE",
                url: AJS.contextPath() + '/rest/project/1.0/project/' + that.get('projectId') + '/' + that.get('teamId'),
                data: "", //add your data
                success: function(response){
                    //code after success
                },
                error: function () {
                    // Code After Erroe
                }

            }).complete(function () {
                //Code after complete the request
            });
        },

        defaults: function() {
            return {
                name: "Przykładowa nazwa projektu",
                income: 10000
            };
        }
    });

    var ProjectCollection = Backbone.Collection.extend({
        model: ProjectModel,
        teamId : null,
        teamName: null,
        initialize: function (model,options) {
            this.url = AJS.contextPath() + '/rest/project/1.0/project/'+options.teamId;
        },
        nextId: function() {
            if (!this.length) return 1;
            return this.last().get('id') + 1;
        },


    });

    var TeamView = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click .save': 'saveTeam',
            'click .delete': 'destroy',
            'click .input-editable-save': 'updateName',
            'click .button-add-project': 'addProjectToView'
        },
        templates: {
            'teamContainer': $('#team-row').html()
        },
        profitSum: 0,
        initialize: function () {
            this.el.append(this.render());
            // manage projects
            var teamId = this.model.get('id');
            var teamName = this.model.get('name');
            this.projectCollection = new ProjectCollection(null,{teamId: teamId,teamName: teamName});
            this.listenTo(this.projectCollection, 'add', this.addProject);
            this.projectCollection.fetch();
            Backbone.on('updateProfitTeam', this.updateProfit, this);
        },

        updateProfit: function (profitTeam) {
            var that = this;
            var profitArea = $(".profit-area")
            _.each(profitArea,function(profitElement,b) {
                    if($(profitElement).data('team_id') === that.model.get('id')){
                        $profitValueArea = $(profitElement).find('.value');
                        that.profitSum += profitTeam;
                        $profitValueArea.html(that.profitSum)
                    }
                }
            )

        },

        addProject: function (model) {

            if(model.isUpdated === 0) {
                var view = new projectView({model: model, collection: this.projectCollection});
                this.$el.find(".project-list").append(view.render().el);
            }
        },

        addProjectToView: function () {

            console.log("no")
            console.log( this.model.get('name'))
            var newProject = new ProjectModel({teamName: this.model.get('name'),teamId:this.model.get('id')});
            var that = this;
            newProject.isUpdated = 1;
            this.projectCollection.create(newProject,
                {'wait':true,'success': this.callbackAddProjectToView.bind(that)}
                );
        },
        //set id from added to database projectId
        callbackAddProjectToView:function (newProject,resp) {
            var projectId = resp.projectId;
            newProject.set('id',projectId);
            var view = new projectView(
                {
                    model: newProject,
                    collection: this.projectCollection
                });

            this.$el.find(".project-list").append(view.render().el);

        },

        removeFailed: function (model, response) {
            var myFlag = AJS.flag({
                type: 'error',
                body: 'Błąd przy usuwaniu zespołu',
            });
        },
        removeSuccess: function (model, response) {
            var myFlag = AJS.flag({
                type: 'success',
                body: 'Usunięto pomyślnie zespół.',
            });
        },
        destroy: function () {
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.model.destroy({
                success: this.removeSuccess,
                error: this.removeFailed
            });
            this.remove();
        },
        render: function (additionalData) {
            var basicData = {
                getProjectUrl: AJS.contextPath() + '/rest/project/1.0/project',
                restfulTableId: this.model.get('id'),
                teamId: this.model.get('id'),
                profit: 0,
                teamName: this.model.get('name')
            };

            var teamData = $.extend(basicData,additionalData);

            this.$el.html(mustache.render(this.templates.teamContainer, teamData));

            var teamNameField = new EditableInput({
                value:basicData.teamName,
                classField:"team-name",
                id: "row-" + basicData.restfulTableId + "-id",
                name: "row-" + basicData.restfulTableId + "-name"
            });
            this.$el.find(".team-name-field").append( teamNameField.render().el );


            return this;
        },

        updateName: function (evt) {

            var teamName = $(evt.currentTarget).parent().prev().find(".editable-field-input").html();
            $(evt.currentTarget).parent().hide();

            this.model.set('name', teamName);
        },

        saveTeam: function () {
            this.model.isUpdated = 1;

            var projects = [];
            this.projectCollection.each(function(model){
               var project = {
                    "id": model.get('projectId'),
                   "name" : model.get('name'),
                   "income": model.get('income')
               }
               projects.push(project);
            });

            this.model.set('projects',projects);
            this.model.save();
            this.collection.add(this.model);
            this.collection.allowToAdd = 1;
        }
    });

    return TeamView;

});