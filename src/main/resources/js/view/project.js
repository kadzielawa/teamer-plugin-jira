define('view/project', ['jquery',  'backbone','mustache','view/members'],
    function($, Backbone,mustache, MembersView) {


     var ProjectView = Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectContainer' : $('#project-row').html()
        },
        events: {
            'change .project-name': 'updateName',
            'click .remove': 'destroy',
            'change .project-income': 'updateIncome'
        },
        options: null,
        initialize: function(options) {
            this.collection = options.collection;
            this.model = options.model;
            var teamId = options.model.get("teamId");
            var projectIncome = options.model.get("income");
            var projectName = options.model.get("name");

            this.projectData = {
                teamId : teamId,
                projectName: projectName,
                projectIncome: projectIncome,
                restfulTableId: options.model.get("projectId")
            }
        },
        destroy: function () {
            this.undelegateEvents();

            this.$el.removeData().unbind();
            this.collection.remove(this.model)
            this.model.remove();
            this.model.destroy();
            this.remove();
        },
        updateName: function (evt) {
            var projectName = $(evt.target).val();
            this.projectData.projectName = projectName;

            this.model.set('name', projectName);
        },

         updateIncome: function (evt) {

            var projectIncome = Number($(evt.target).val());
            this.model.set('income', projectIncome);
            this.projectData.projectIncome = projectIncome;

             this.render();
        },

        render: function () {


            var that = this
            this.$el.html(mustache.render(this.templates.projectContainer,this.projectData));
            var elVariable = "#person-list-" + that.projectData.teamId + "_" + that.projectData.restfulTableId;
            var membersView = new MembersView({
                "el": that.$el.find(elVariable),
                "projectData": that.projectData,
                "restfulTableId": that.projectData.restfulTableId
            });

            membersView.render();
            return this;
        }
    });

    return ProjectView;
});
