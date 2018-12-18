define('view/project', ['jquery',  'backbone','mustache'], function($, Backbone,mustache) {
     var ProjectView = Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectContainer' : $('#project-row').html()
        },
        options: null,
        initialize: function(options) {
           this.listenTo(options.collection, 'add', this.addProject);
          //  options.collection.add()
            console.log('ad!');
            console.log(options.collection);
            this.collection = options.collection;
            var teamId = options.model.get("teamId");
            this.projectData = {
                teamId : teamId,
                restfulTableId: options.model.get("id")
            }
        },

         addProject: function (model) {

         },

         addRESTfulTable: function (elVariable) {

            new AJS.RestfulTable({
                 autoFocus: true,
                 el: this.$el.find(elVariable),
                 allowReorder: true,
                 resources: {
                     all: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers',
                     self: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers'
                 },
                 columns: [
                     {
                         id: "status",
                         header: ""
                     },
                     {
                         id: "name",
                         header: AJS.I18n.getText("common.words.name")
                     },
                     {
                         id: "description",
                         header: AJS.I18n.getText("common.words.description")
                     },
                     {
                         id: "releaseDate",
                         header: AJS.I18n.getText("version.releasedate")
                     }
                 ]
             });
         },

        render: function () {
            this.$el.html(mustache.render(this.templates.projectContainer,this.projectData));
            var elVariable = "#person-list-" + this.projectData.teamId + "_" + this.projectData.restfulTableId;
            this.$el.find(elVariable).html(this.addRESTfulTable(elVariable));
            return this;
        }
    });



    return ProjectView;
});
