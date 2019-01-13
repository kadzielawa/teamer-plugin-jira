require(['mainapp','view/tab'], function(App,TabView) {

    App.Collections.ViewCollection.fetch({async:false , success: function(data){

            App.Views.TabView = new TabView();

            data.models.forEach(function (model) {
                model.set('id',parseInt( model.get('id')))
                App.Views.TabView.render(model);
            })
          $(".tabs-menu").children().eq(1).trigger('click')

        },});
})