
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

        deleteView: function (e) {
            var viewId = $(e.currentTarget).data('view_id')
            if(this.viewId === viewId) {
                Backbone.ajax({
                    dataType: "json",
                    type: "DELETE",
                    contentType: 'application/json',
                    url: AJS.contextPath() + '/rest/view/1.0/view/' + viewId
                }).complete(function () {
                    $('li.menu-item[data-view_id="' + viewId + '"]').remove()
                    AJS.tabs.change($('li.menu-item a').last());
                });
            }
        },

        changeViewSettings: function (e) {
            var newViewName = ''
           if($(e.currentTarget).data('view_id') == this.viewId){
              newViewName = $('#viewName'+this.viewId).val();
              newOkpValue = $('#okpCost'+this.viewId).val()
              $('li.active-tab').find('a').text(newViewName)
              this.updateView({viewName: newViewName, viewId: this.viewId, okp: newOkpValue})
           }
        },

        updateView: function (data) {
            Backbone.ajax({
                dataType: "json",
                type: "POST",
                contentType: 'application/json',
                url: AJS.contextPath() + '/rest/view/1.0/view/' + this.viewId,
                data: JSON.stringify(data),
            });
        },

        exportTeams: function (e) {
            var viewId = $(e.currentTarget).data('view_id');
            if(viewId == this.viewId) {
                viewName = $('#viewName'+this.viewId).val();
                okpValue = $('#okpCost'+this.viewId).val();
                Backbone.ajax({
                    dataType: "json",
                    type: "PUT",
                    url: AJS.contextPath() + '/rest/view/1.0/view/' + viewId,
                    data: "", //add your data
                    success: function (data) {
                        App.Properties.LastViewId = data.created_id;
                        var newModel = new App.Models.TabModel({id: App.Properties.LastViewId, okp: okpValue, name: viewName + " (copy)"});
                        App.Views.TabView.render(newModel);
                        $(".tabs-menu").children().last().trigger('click')
                    }

                });
            }
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
            view.saveTeam();
        }
    });
});