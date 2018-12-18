
define('view/team', [
    'jquery',
    'backbone',
    'mustache',
    'view/project'], function($, Backbone,mustache,projectView) {



    var ProjectModel = Backbone.Model.extend({
        initialize: function (options) {
            this.collection = options.collection;
          this.set('id',this.collection.nextId());
        },
        defaults: function() {
            return {
                name: "default project name",
                income: 22
            };
        }
    });

    var ProjectCollection = Backbone.Collection.extend({
        //  url: AJS.contextPath() + '/rest/team/1.0/team',
        model: ProjectModel,
        teamId : null,
        initialize: function (teamId) {
            this.teamId = teamId;
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

            this.listenTo(this.model, 'change', this.render);
          //  this.listenTo(this.collection, 'add', this.addProject);
            //manage projects
            console.log('tworzy project collection');
            this.projectCollection = new ProjectCollection();


        },
        addProject: function (model) {
            var view = new projectView(
                {
                    model: model,
                });

            $(".project-list").append(view.render().el);
        },

        addProjectToView: function () {
            var newProject = new ProjectModel({collection: this.projectCollection,teamId:this.model.get('id')});

            var view = new projectView(
                {
                    model: newProject,
                    collection: this.projectCollection
                });

            this.projectCollection.add(newProject);
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
            this.model.save();
            this.collection.add(this.model);
            this.collection.allowToAdd = 1;
        }
    });

    return TeamView;

});