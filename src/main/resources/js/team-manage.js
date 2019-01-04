require(['jquery', 'backbone', 'mustache','view/team'], function($, Backbone, mustache,teamView) {

    AJS.toInit(function() {

        /** Models */

        var TeamModel = Backbone.Model.extend({
            urlRoot: AJS.contextPath() + '/rest/team/1.0/team',
            isUpdated:  0,
            profit: 0,
            defaults: function() {
                return {
                    id: teamCollection.nextId(),
                    name: "Przykładowa nazwa zespołu"
                };
            },
        });

        /** Collection **/

        var TeamCollection = Backbone.Collection.extend({

            url: AJS.contextPath() + '/rest/team/1.0/team',
            model: TeamModel,
            allowToAdd: 1,
            nextId: function() {
                if (!this.length) return 1;
                return this.last().get('id') + 1;
            },
        });


        /** Instances **/
        var teamCollection = new TeamCollection();

        /** View **/
           var TeamsView = Backbone.View.extend({
            el: '.buttons-teams-manage',
            events: {
                'click #button-add-team' : 'addTeamToView',
                'click #button-export-teams' : 'exportTeams'
            },

            allowToAdd: 1,

            initialize: function() {
                this.listenTo(this.collection, 'add', this.addTeam);
                this.listenTo(this.collection, 'destroy', this.removeItem);
                this.collection.fetch();
            },
            exportTeams: function () {
                console.log(this.collection.toJSON())
            },


            addTeam: function (model) {

                if(model.isUpdated === 0) {
                    var view = new teamView({model: model,collection:this.collection});
                    $(".teams-list").append(view.render().el);
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
                var model = new TeamModel;
                //set item is added to view only.
                model.isUpdated = 1;

                this.collection.add(model);
                var view = new teamView({model:model,collection:this.collection});
                $(".teams-list").append(view.render().el);
            }
        });

        var teamsView = new TeamsView({collection: teamCollection});

        /* Fetch data */
       teamCollection.fetch();
    });
});