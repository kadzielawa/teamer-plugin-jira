

define('view/project-result', [
    'jquery',
    'backbone',
    'mustache'], function($, Backbone,mustache) {


    var ProjectResultModel = Backbone.Model.extend({
        initialize: function (options) {
            this.collection = options.collection;
            //   this.set('id',this.collection.nextId());
        },

        defaults: function() {
            return {
                costTeam: 0,
                okpSum: 0,
                result: 0,
                profitability: 0,
            };
        }
    });

    var ProjectResultView = Backbone.View.extend({

        tagName : 'div',
        templates: {
            'projectResultContainer' : $('#project-result').html()
        },
        collection: null,
        initialize: function (options) {

            //members collection
            this.collection = options.collection;

            this.listenTo(this.collection, 'add', this.computeData);
            this.listenTo(this.collection, 'remove', this.computeData);
            this.computeData()
        },

        computeData: function (changedModel) {
          //  console.log(changedModel)
            var costTeam =0,okpSum =0, profitability=0,result=0;

            this.collection.each(function(model, index, list){

                costTeam += parseInt(model.get('cost'));
                okpSum += 2;
                profitability += 2;
                result+=2;

            });

            this.projectResultData = {
                costTeam: costTeam,
                okpSum: okpSum,
                profitability: profitability,
                result: result
            };

            this.render();
        },
        render: function () {
           var that = this
           this.$el.html(mustache.render(this.templates.projectResultContainer,this.projectResultData));
           return this;
        }
    });

return ProjectResultView;
});
