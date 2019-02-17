

define('view/project-result', [
    'jquery',
    'backbone',
    'underscore',
    'js/mustache',
    'mainapp'], function($, Backbone,_, mustache,App) {

    return Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectResultContainer' : $('#project-result').html()
        },
        collection: null,
        projectData: null,
        initialize: function (options) {
            //members collection
            this.collection = options.collection;
            this.projectData = options.projectData;
            this.listenTo(this.collection, 'add', this.computeData);
            this.listenTo(this.collection, 'remove', this.computeData);
            this.computeData()
        },

        computeData: function () {
            var that = this;
            var projectIncome = this.projectData.projectIncome;
            var costProject = 0,
                okpSum = 0;
            this.collection.each(function(model){
                okpSum += parseInt(model.get('okp'));
                costProject += (parseInt(model.get('cost')) + parseInt(model.get('okp')));
            });
            var result = projectIncome - costProject;
            var profitInPercent = (result / projectIncome) * 100;
            var profitability = profitInPercent.toFixed(2);
            var teamId =  this.projectData.teamId;
            var teamData = _.where(App.Collections.ProjectCollection.items,{teamId: teamId});
            if(teamData.length >0) {
                var projectModels = teamData[0].data;
                var totalProfit = 0;
                projectModels.each(function (model) {
                    if (model.get('projectId') === that.projectData.projectId) {
                        model.set('profit',result);
                        totalProfit += result;
                    } else {
                        totalProfit += model.get('profit');
                    }
                });
            }
            Backbone.trigger('updateProfitTeam',{totalProfit: totalProfit, teamId: teamId});
            this.projectResultData = {
                costProject: costProject,
                okpSum: okpSum,
                profitability: profitability,
                result: result
            };
            this.render();
        },
        render: function () {
           this.$el.html(mustache.render(this.templates.projectResultContainer,this.projectResultData));
           return this;
        }
    });
});
