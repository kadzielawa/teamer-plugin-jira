define('view/project', ['jquery',  'backbone','mustache','view/members', 'view/editable-input'],
    function($, Backbone,mustache, MembersView,EditableInput) {


     var ProjectView = Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectContainer' : $('#project-row').html()
        },
        events: {
            'input .project-name': 'updateName',
            'click .remove': 'destroy',
            'input .project-income': 'updateIncome'
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
            var projectName = $(evt.target).html();
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
            membersView.checkIfColumnsAreDisplayed(that.projectData.restfulTableId,that.projectData.teamId);


            var projectNameField = new EditableInput({value:that.projectData.projectName,classField:"project-name"});
            this.$el.find(".project-name-field").append( projectNameField.render().el );

            var projectIncomeField = new EditableInput({value:that.projectData.projectIncome,classField:"project-income"});
            this.$el.find(".project-income-field").append( projectIncomeField.render().el );
            return this;
        }
    });

    return ProjectView;
});
