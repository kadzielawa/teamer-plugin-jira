
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

        var ProjectModel = Backbone.Model.extend({
            initialize: function (options) {
                this.collection = options.collection;
            },
            isUpdated:  0,

            remove: function () {
                var that = this;
                this.url = AJS.contextPath() + '/rest/project/1.0/project/' + that.get('projectId') + '/' + that.get('teamId');
                Backbone.ajax({
                    dataType: "json",
                    type: "DELETE",
                    url: AJS.contextPath() + '/rest/project/1.0/project/' + that.get('projectId') + '/' + that.get('teamId'),
                });
            },

            defaults: function() {
                return {
                    name: "Przykładowa nazwa projektu",
                    income: 10000
                };
            }
        });


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

        });

        var MemberModel = Backbone.Model.extend({
            initialize: function () {
                var define_okp = parseInt($("#okpCost"+this.get('viewId')).val());
                var availability = this.get('availability');
                this.set('define_okp',define_okp);
                var real_okp = (availability / 100) * define_okp;
                this.set('okp',real_okp );
            },
            defaults: function () {
                return {
                    viewId: App.Properties.LastViewedViewId
                }
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


        var ProjectCollection = Backbone.Collection.extend({
            model: ProjectModel,
            teamId : null,
            teamName: null,
            viewId: null,
            initialize: function (model,options) {
                this.viewId = options.viewId;
                this.url = AJS.contextPath() + '/rest/project/1.0/project/'+options.teamId;
            },
            nextId: function() {
                if (!this.length) return 1;
                return this.last().get('id') + 1;
            },


        });




        /** Instances **/
        App.Collections.TeamCollection = new TeamCollection();
        App.Models.TeamModel = TeamModel;
        App.Models.TabModel = TabModel;
        App.Models.ProjectModel = ProjectModel;
        App.Models.MemberModel = MemberModel;
        App.Collections.ViewCollection = new ViewCollection();
        App.Collections.ProjectCollection = ProjectCollection;
        App.Properties.LastViewedViewId = null;
        App.Properties.LastViewId = 0;

        return App;
});