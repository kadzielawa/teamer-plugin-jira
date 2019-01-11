
define('mainapp',['jquery', 'backbone', 'js/mustache','view/main'],
    function($, Backbone, mustache,MainView) {

            var App = {
                Models: {},
                Views: {},
                Properties: {},
                Collections: {}
            };
            var mainView = new MainView();
            mainView.render();


        /** Models */

        var TeamModel = Backbone.Model.extend({
            urlRoot: AJS.contextPath() + '/rest/team/1.0/team',
            isUpdated:  0,
            viewId: null,
            profit: 0,

            defaults: function() {
                return {
                    id:  App.Collections.TeamCollection.nextId(),
                    name: "Przykładowa nazwa zespołu"
                };
            },
        });

        var TabModel = Backbone.Model.extend({
            initialize: function (id) {
                this.set('id', id);
            }
        });


        /** Collection **/

        var TeamCollection = Backbone.Collection.extend({
            model: TeamModel,
            allowToAdd: 1,
            setUrl:function (id) {
                this.url = AJS.contextPath() + '/rest/team/1.0/team?viewId=' + id;
            },
            nextId: function() {
                if (!this.length) return 1;
                return this.last().get('id') + 1;
            },
        });

        var ViewCollection = Backbone.Collection.extend({
            model: TabModel,
            url: AJS.contextPath() + '/rest/view/1.0/view/',
        });



        /** Instances **/
        App.Collections.TeamCollection = new TeamCollection();
        App.Models.TeamModel = TeamModel;
        App.Models.TabModel = TabModel;
        App.Collections.ViewCollection = new ViewCollection();
        App.Properties.LastViewId = null;

        return App;
});