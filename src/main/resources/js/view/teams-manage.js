
define('view/teams-manage', ['jquery',  'backbone', 'view/team','mainapp'], function($, Backbone,TeamView,App) {

    return Backbone.View.extend({
        el: '.buttons-teams-manage',
        events: {
            'click #button-add-team' : 'addTeamToView',
            'click #button-export-teams' : 'exportTeams'
        },

        allowToAdd: 1,

        initialize: function(options) {
            this.viewId = options.viewId;

            this.listenTo(this.collection, 'add', this.addTeam);
            this.listenTo(this.collection, 'destroy', this.removeItem);
            this.collection.fetch();
        },
        exportTeams: function () {

        },


        addTeam: function (model) {

            if(model.isUpdated === 0 && this.viewId ===model.get('viewId')) {
                var view = new TeamView({model: model,collection:this.collection});
                $("#view"+model.get('viewId')).find(".teams-list").append(view.render().el);
            }
        },
        //if removed item is new item
        removeItem: function(model) {

            if(model.isUpdated === 1) {
                this.collection.allowToAdd = 1;
            }
        },
        addTeamToView: function () {

            if(this.collection.allowToAdd === 0 ){
                return false;
            }
            this.collection.allowToAdd =0;
            var model = new App.Models.TeamModel;
            //set item is added to view only.
            model.isUpdated = 1;
            model.set('viewId',this.viewId);
            this.collection.add(model);
            var view = new TeamView({model:model,collection:this.collection});
            $("#view"+this.viewId).find(".teams-list").append(view.render().el);
        }
    });
});