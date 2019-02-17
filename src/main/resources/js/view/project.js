define('view/project', ['jquery',  'backbone','js/mustache','view/members', 'view/editable-input'],
    function($, Backbone,mustache, MembersView,EditableInput) {

    return Backbone.View.extend({
        tagName : 'div',
        className: 'project-view',
        templates: {
            'projectContainer' : $('#project-row').html()
        },
        events: {
            'click .input-editable-save': 'updateValue',
            'click .remove': 'destroy',
        },
        options: null,
        initialize: function(options) {
            this.collection = options.collection;
            this.model = options.model;
            var viewId = this.collection.viewId;
            var teamId = options.model.get("teamId");
            var projectIncome = options.model.get("income");
            var projectName = options.model.get("name");
            var projectId =     options.model.get("projectId");

            this.projectData = {
                viewId : viewId,
                projectId : projectId,
                teamId : teamId,
                projectName: projectName,
                projectIncome: projectIncome,
                restfulTableId: options.model.get("projectId")
            }
        },
        destroy: function () {
            this.undelegateEvents();

            Backbone.trigger('updateProfitTeam',{
                totalProfit: this.model.get('profit'),
                teamId: this.projectData.teamId,
                toSubstract: true
            });
            var myFlag = AJS.flag({
                type: 'success',
                body: 'Project has been deleted successfully.',
            });
            setTimeout(function(){ myFlag.close() }, 4000);
            this.$el.removeData().unbind();
            this.collection.remove(this.model)
            this.model.remove();
            this.model.destroy();

            this.remove();
        },
        updateProjectName: function (projectName) {
            this.projectData.projectName = projectName;
            this.model.set('name', projectName);
            Backbone.trigger('saveDataTeam')
        },

        updateProjectIncome: function (projectIncome) {
            this.model.set('income', projectIncome);
            this.projectData.projectIncome = projectIncome;
            this.render();
            Backbone.trigger('saveDataTeam')
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

            var idProjectName = 'projectName_' + that.projectData.teamId + '_' + that.projectData.restfulTableId;
            var projectNameField = new EditableInput(
                {
                    value:that.projectData.projectName,
                    classField:"project-name",
                    id: idProjectName,
                    action: this.updateProjectName,
                    obj: this
                }
                );

            this.$el.find(".project-name-field").append( projectNameField.render().el );
            var idProjectIncome = 'projectIncome_' + that.projectData.teamId + '_' + that.projectData.restfulTableId;
            var projectIncomeField = new EditableInput(
                {
                    value: that.projectData.projectIncome,
                    classField: "project-income",
                    id: idProjectIncome,
                    action: this.updateProjectIncome,
                    obj: this
                });
            this.$el.find(".project-income-field").append( projectIncomeField.render().el );
            return this;
        }
    });
});
