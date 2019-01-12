require(['mainapp','view/tab'], function(App,TabView) {

    App.Collections.ViewCollection.fetch({async:false , success: function(data){

            var tabView = new TabView();

            data.models.forEach(function (model) {
                model.set('id',parseInt( model.get('id')))
                tabView.render(model);
            })
          $(".tabs-menu").children().eq(1).trigger('click')

        },});
})