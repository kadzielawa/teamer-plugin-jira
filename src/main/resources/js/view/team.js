
define('view/team', [
    'jquery', 'underscore',
    'backbone',
    'js/mustache',
    'view/project',
    'view/editable-input',
    'mainapp'], function($, _,Backbone,mustache,projectView,EditableInput,App) {


   return Backbone.View.extend({
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
        initialize: function () {
            this.el.append(this.render());
            // manage projects
            var teamId = this.model.get('id');
            var teamName = this.model.get('name');
            this.viewId = this.model.get('viewId');
            this.projectCollection = new App.Collections.ProjectCollection(null,{teamId: teamId,teamName: teamName,viewId: this.model.get('viewId')});
            this.listenTo(this.projectCollection, 'add', this.addProject);
            this.projectCollection.fetch();
            App.Collections.ProjectCollection.items.push({teamId:teamId,data:this.projectCollection})
            Backbone.on('updateProfitTeam', this.updateProfit, this);
        },

        updateProfit: function (options) {
            var profitArea = this.$el.find(".profit-area").find('.value')

            if(options.toSubstract === true){
                var oldProfit = parseInt(profitArea.text())
                var newProfit = oldProfit - options.totalProfit;
                profitArea.html(newProfit);
            } else {
                profitArea.html(options.totalProfit);
            }
        },

        addProject: function (model) {
            if(model.isUpdated === 0) {

                var view = new projectView({model: model, collection: this.projectCollection});
                this.$el.find(".project-list").append(view.render().el);
            }
        },

        addProjectToView: function () {

            var newProject = new App.Models.ProjectModel(
                {
                    teamName: this.model.get('name'),
                    teamId: this.model.get('id')
                });

            var that = this;
            newProject.isUpdated = 1;
            this.projectCollection.create(newProject,
                {
                    'wait': true,
                    'success': this.callbackAddProjectToView.bind(that)
                });


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
            this.saveTeam()
        },

        removeFailed: function (model, response) {
            var myFlag = AJS.flag({
                type: 'success',
                body: 'Team has been deleted successfully.',
            });
            setTimeout(function(){ myFlag.close() }, 4000);

        },
        removeSuccess: function (model, response) {
            var myFlag = AJS.flag({
                type: 'success',
                body: 'Usunięto pomyślnie zespół.',
            });

            setTimeout(function(){ myFlag.close() }, 4000);

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
                profit: this.model.get('profit'),
                teamName: this.model.get('name')
            };

            var teamData = $.extend(basicData,additionalData);

            this.$el.html(mustache.render(this.templates.teamContainer, teamData));

            var teamNameField = new EditableInput({
                value:basicData.teamName,
                classField: "team-name",
                id: "row-" + basicData.restfulTableId + "-id",
                name: "row-" + basicData.restfulTableId + "-name"
            });
            this.$el.find(".team-name-field").append( teamNameField.render().el );


            return this;
        },

        updateName: function (evt) {

            var $teamElement = $(evt.currentTarget).parent().prev().find(".editable-field-input");
            if($teamElement.hasClass('team-name')) {
                var teamName = $teamElement.html();
                $(evt.currentTarget).parent().hide();
                this.model.set('name', teamName);
            }
        },

        saveTeam: function () {
            this.model.isUpdated = 1;

            var projects = [];
            this.projectCollection.each(function(model){
               var project = {
                   "id": model.get('projectId'),
                   "name": model.get('name'),
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

});
