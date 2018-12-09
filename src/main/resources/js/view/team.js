
define('view/team', [
    'jquery',
    'backbone',
    'mustache',
    'view/project'], function($, Backbone,mustache,projectView) {
    return Backbone.View.extend({
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
            //manage projects
        },
        addProject: function (model) {

            var view = new projectView({model: model});
            $(".project-list").append(view.render().el);
        },

        addProjectToView: function () {
         //   var newProject = new ProjectModel;
         //   this.collection.add(newProject);
            var teamId = this.model.get('id');
            var view = new projectView({teamId:teamId});
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
});