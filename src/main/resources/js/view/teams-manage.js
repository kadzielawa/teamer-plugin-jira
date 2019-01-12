
define('view/teams-manage', ['jquery',  'backbone', 'view/team','mainapp'], function($, Backbone,TeamView,App) {

    return Backbone.View.extend({
        el: '.buttons-teams-manage',
        events: {
            'click #button-add-team' : 'addTeamToView',
            'click #button-export-teams' : 'exportTeams',
            'click .delete-view' : 'deleteView',
            'blur .input-view-name' : 'changeViewSettings',
            'blur .input-okp-value' : 'changeViewSettings'
        },

        allowToAdd: 1,

        initialize: function(options) {
            this.viewId = options.viewId;

            this.listenTo(this.collection, 'add', this.addTeam);
            this.listenTo(this.collection, 'destroy', this.removeItem);
            this.collection.fetch();
        },

        deleteView: function () {
            if (confirm('Are you sure you want to remove view from your db?')) {
                Backbone.ajax({
                    dataType: "json",
                    type: "DELETE",
                    contentType: 'application/json',
                    url: AJS.contextPath() + '/rest/view/1.0/view/' + this.viewId,
                    data: JSON.stringify(data),
                }).complete(function () {
                    //Code after complete the request
                });
            } else {
                // Do nothing!
            }
        },

        changeViewSettings: function (e) {
            var newViewName = ''
           if($(e.currentTarget).data('view_id') == this.viewId){
              newViewName = $('#viewName'+this.viewId).val();
              newOkpValue = $('#okpCost'+this.viewId).val()
              var data = {viewName: newViewName, viewId: this.viewId, okp: newOkpValue};
               $('li.active-tab').find('a').text(newViewName)

               Backbone.ajax({
                   dataType: "json",
                   type: "POST",
                   contentType: 'application/json',
                   url: AJS.contextPath() + '/rest/view/1.0/view/' + this.viewId,
                   data: JSON.stringify(data),
               }).complete(function () {
                   //Code after complete the request
               });
           }
        },
        exportTeams: function (e) {
            var viewId = $(e.currentTarget).data('view_id');
            Backbone.ajax({
                dataType: "json",
                type: "PUT",
                url: AJS.contextPath() + '/rest/view/1.0/view/' + viewId,
                data: "", //add your data
            }).complete(function () {
                $(".tabs-menu").children().last().trigger('click')
            });
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