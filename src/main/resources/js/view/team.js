
define('view/team', [
    'jquery',
    'backbone',
    'mustache',
    'view/project'], function($, Backbone,mustache,projectView) {



    var ProjectModel = Backbone.Model.extend({
        initialize: function (options) {
            this.collection = options.collection;
       //   this.set('id',this.collection.nextId());
        },
        isUpdated:  0,

        defaults: function() {
            return {
                name: "default project name",
                income: 22
            };
        }
    });

    var ProjectCollection = Backbone.Collection.extend({
        model: ProjectModel,
        teamId : null,
        initialize: function (model,options) {
            console.log(options)
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
            'change .team-name': 'updateName',
            'click .button-add-project': 'addProjectToView'
        },
        templates: {
            'teamContainer': $('#team-row').html()
        },
        initialize: function () {
            this.el.append(this.render());
            // this.listenTo(this.model, 'change', this.render);
            // manage projects
            var teamId = this.model.get('id');
            this.projectCollection = new ProjectCollection(null,{teamId: teamId});
            this.listenTo(this.projectCollection, 'add', this.addProject);
            this.projectCollection.fetch();

        },
        addProject: function (model) {

            if(model.isUpdated === 0) {
                var view = new projectView({model: model, collection: this.projectCollection});
                this.$el.find(".project-list").append(view.render().el);
            }
        },

        addProjectToView: function () {

            var newProject = new ProjectModel({teamId:this.model.get('id')});
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
                type: 'success',
                body: '',
            });
        },
        removeSuccess: function (model, response) {
            var myFlag = AJS.flag({
                type: 'error',
                body: '',
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
        render: function () {
            var teamData = {
                getProjectUrl: AJS.contextPath() + '/rest/project/1.0/project',
                restfulTableId: this.model.get('id'),
                teamId: this.model.get('id'),
                teamName: this.model.get('name')
            };
            this.$el.html(mustache.render(this.templates.teamContainer, teamData));
            return this;
        },

        updateName: function (evt) {
            var projectName = $(evt.target).val();
            this.model.set('name', projectName);
        },

        saveTeam: function () {
            this.model.isUpdated = 1;

            var projectIds = [];
            console.log(this.projectCollection.size())
            this.projectCollection.each(function(model){
                console.log(model)
                    projectIds.push(model.get('id'));
            });

            this.model.set('projectIds',projectIds);
            this.model.save();
            this.collection.add(this.model);
            this.collection.allowToAdd = 1;
        }
    });

    return TeamView;

});