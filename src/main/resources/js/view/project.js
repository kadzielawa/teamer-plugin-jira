define('view/project', ['jquery',  'backbone','mustache'], function($, Backbone,mustache) {
    return Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectContainer' : $('#project-row').html()
        },
        initialize: function(options) {
            this.options = options;
            console.log('new view project created');
            console.log(this.options.teamId);
        },
        projectData: {
            //  projectName : this.model.get("name"),
            //    projectId:  this.model.get("id")
        },
        render: function () {
            console.log('render project view');
            this.$el.html(mustache.render(this.templates.projectContainer,this.projectData));
            return this;
        }
    });
});
