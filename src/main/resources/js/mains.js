
define('mainapp',['jquery', 'backbone', 'js/mustache','view/main'],
    function($, Backbone, mustache,MainView) {

            var App = {
                Models: {},
                Views: {},
                Properties: {},
                Collections: {},
                start: function () {}
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

        /** Instances **/
        App.Collections.TeamCollection = new TeamCollection();
        App.Models.TeamModel = TeamModel;
        App.Properties.LastViewId = null;

        return App;
});