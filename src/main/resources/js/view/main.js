
define('view/main', [
    'jquery', 'underscore',
    'backbone',
    'js/mustache'], function($, _,Backbone,mustache) {

    return Backbone.View.extend({
        el: '.aui-page-panel-content',
        templates: {
            'mainView': $('#main-view').html()
        },
        render: function () {
            this.$el.html(mustache.render(this.templates.mainView));
            return this;
        }
    });
});
