
define('view/tab', [
    'jquery',
    'underscore',
    'backbone',
    'js/mustache',
    'view/teams-manage',
    'mainapp'], function($, _,Backbone,mustache,TeamsView,App) {

    return Backbone.View.extend({
        el: ".horizontal-tabs",
        model: App.Models.TabModel,
        templates: {
            'singleTab': $('#single-tab').html(),
            'singleView': $('#single-view').html()
        },
        events: {
            'click .menu-item': "menuItemClick" ,
            'click .menu-new-item': "menuNewItemClick" ,
        },

        menuNewItemClick: function () {

        },

        menuItemClick: function (e) {
            var $tabsMenu = $(e.currentTarget).parent();
            var viewId = $(e.currentTarget).data('view_id');
            $tabsMenu.children().each(function (a,b) {
                $(b).removeClass("active-tab");
            })
            $(e.currentTarget).addClass('active-tab');

            var $tabsPane = this.$el.find('.tabs-pane');
            $tabsPane.each(function (b,a) {
                $(a).removeClass('active-pane')
            });

            this.$el.find('#view'+viewId).addClass('active-pane')
            App.Properties.LastViewId = viewId;
            console.log(App);
        },
        render: function () {
            var viewId = this.model.get('id');
            this.$el.append(mustache.render(this.templates.singleView,{viewId: viewId}));
            this.$el.find('.tabs-menu').append(mustache.render(this.templates.singleTab,{viewId: viewId}));
            var teamCollection = App.Collections.TeamCollection;
            teamCollection.setUrl(viewId);
            var teamsView = new TeamsView({collection: teamCollection,viewId: viewId});
            this.$el.find(".tabs-menu").children().eq(1).trigger('click')

            return this;
        }
    });
});
