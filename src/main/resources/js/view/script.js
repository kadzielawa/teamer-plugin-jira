require(['mainapp','view/tab'], function(App,TabView) {

    App.start();


    var TabModel = Backbone.Model.extend({
        initialize: function (id) {
            this.set('id', id);
            var tabView = new TabView({model: this});
            tabView.render();
        }
    });
    var ViewCollection = Backbone.Collection.extend({
        model: TabModel,
        url: AJS.contextPath() + '/rest/view/1.0/view/',
    });


    var viewCollection = new ViewCollection();
    viewCollection.fetch({async:false , success: function(collection, response, options){
            $(".tabs-menu").children().first().trigger('click')

        },});



})