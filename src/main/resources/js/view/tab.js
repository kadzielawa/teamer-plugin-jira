
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
        },

        menuNewItemClick: function (e) {
            var standardOkp = 4500
            var standardName = "empty titile..."
            var newViewId = ++App.Properties.LastViewId;
            var newModel = new App.Models.TabModel({id:newViewId, okp: standardOkp, name: standardName});
            var newView = this.render(newModel);
            newView.updateView({viewName: standardName, viewId: newViewId, okp: standardOkp})
            $(".tabs-menu").children().last().trigger('click')

        },

        menuItemClick: function (e) {
            var $tabsMenu = $(e.currentTarget).parent();

            if($(e.currentTarget).hasClass('new')){
                this.menuNewItemClick(e)
                return false;
            }
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
            App.Properties.LastViewedViewId = viewId;
        },
        render: function (newModel) {
            var viewId = newModel.get('id') || this.model.get('id');
            var viewName = newModel.get('name')
            var okp = newModel.get('okp')
            App.Properties.LastViewId = viewId;
            this.$el.append(mustache.render(this.templates.singleView,{viewId: viewId,okp: okp, viewName: viewName}));
            this.$el.find('.tabs-menu').append(mustache.render(this.templates.singleTab,{viewId: viewId, viewName: viewName}));
            var teamCollection = App.Collections.TeamCollection;
            teamCollection.setUrl(viewId);
            var teamsView = new TeamsView({collection: teamCollection,viewId: viewId});

            return teamsView;
        }
    });
});
