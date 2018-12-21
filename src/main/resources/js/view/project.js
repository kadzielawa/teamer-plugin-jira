define('view/project', ['jquery',  'backbone','mustache','view/members'], function($, Backbone,mustache, MembersView) {
     var ProjectView = Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectContainer' : $('#project-row').html()
        },

        options: null,
        initialize: function(options) {

           this.listenTo(options.collection, 'add', this.addProject);

            this.collection = options.collection;
            var teamId = options.model.get("teamId");

            this.projectData = {
                teamId : teamId,
                restfulTableId: options.model.get("projectId")
            }
        },

         addProject: function (model) {

         },

        render: function () {

            var that = this
            this.$el.html(mustache.render(this.templates.projectContainer,this.projectData));
            var elVariable = "#person-list-" + that.projectData.teamId + "_" + that.projectData.restfulTableId;
            console.log(that.$el);
            var membersView = new MembersView({
                "el": that.$el.find(elVariable),
                "restfulTableId": that.projectData.restfulTableId
            });
            membersView.render();
            return this;
        }
    });

    return ProjectView;
});

(function() {
/*

    jQuery(document).on(AJS.RestfulTable.Events["EDIT_ROW"], function() {
        var projectTable = arguments[2];
        var rowUser = arguments[1];
        console.log($(rowUser.$el[0]).find(".userSearcher"));
        $(rowUser.$el[0]).find(".userSearcher").auiSelect2( {
            ajax: {
                url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                dataType: 'json',
                results: function results(data) {

                    return {
                        results: data
                    };
                },
            }})


    });
*/

})();