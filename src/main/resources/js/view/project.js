define('view/project', ['jquery',  'backbone','js/mustache','view/members', 'view/editable-input'],
    function($, Backbone,mustache, MembersView,EditableInput) {


     var ProjectView = Backbone.View.extend({
        tagName : 'div',
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

            this.projectData = {
                viewId : viewId,
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
         updateValue: function (evt) {

            console.log('xxx')

            var value = $(evt.currentTarget).parent().prev().find(".editable-field-input").html();
            if($(evt.currentTarget).parent().prev().hasClass('project-name')) {
                this.projectData.projectName = value;
                this.model.set('name', value);
            } else  if($(evt.currentTarget).parent().prev().hasClass('project-income')) {
                this.model.set('income', value);
                this.projectData.projectIncome = value;
                this.render();
            }
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
