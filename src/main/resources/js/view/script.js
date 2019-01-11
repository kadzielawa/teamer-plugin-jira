require(['mainapp','view/tab'], function(App,TabView) {

    App.Collections.ViewCollection.fetch({async:false , success: function(data){

        data.models.forEach(function (model) {
            var tabView = new TabView({model:model});
            tabView.render();
        })

        },});
})