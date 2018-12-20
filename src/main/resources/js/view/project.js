define('view/project', ['jquery',  'backbone','mustache'], function($, Backbone,mustache) {
     var ProjectView = Backbone.View.extend({
        tagName : 'div',
        templates: {
            'projectContainer' : $('#project-row').html()
        },
        options: null,
        initialize: function(options) {
           this.listenTo(options.collection, 'add', this.addProject);
          //  options.collection.add()
            console.log('ad!');
            console.log(options.collection);
            this.collection = options.collection;
            var teamId = options.model.get("teamId");

            this.projectData = {
                teamId : teamId,
                restfulTableId: options.model.get("projectId")
            }
        },


         addProject: function (model) {

         },

         addRESTfulTable: function (elVariable,projectId) {


             var EditGroupView = AJS.RestfulTable.CustomEditView.extend({
                 render: function (self) {
                     var $text = $("<input type='text' class='userSearcher' name='userId' placeholder='wyszukaj Usera'> ");

                     $text.val(self.value); //
                     return $text;
                 }
             });

             var BilledAuiToogleView = AJS.RestfulTable.CustomEditView.extend({
                 render: function (self) {
                     console.log(self);
                     var $text = $('<aui-toggle name="billed" id="gzip-compression" label="use gzip compression"></aui-toggle>');
                  /*   if(self.value === 'on'){
                         $text.attr('checked','checked');
                     }*/
                     return $text;
                 }
             });


            new AJS.RestfulTable({
                 autoFocus: true,
                 el: this.$el.find(elVariable),
                 allowReorder: true,
                 resources: {
                     all: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/'+projectId,
                     self: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/'+projectId
                 },
                 columns: [
                     {
                         id: "id",
                         header: "id user",
                         allowEdit: false,

                     },
                     {
                         id: "developer_name",
                         name:"userId",
                         header: "Imię i nazwisko",
                         createView: EditGroupView,
                         editView: EditGroupView
                     },
                     {
                         id: "role",
                         header: "Rola"
                     },
                     {
                         id: "billed",
                         header: "Bilowanie",
                         createView: BilledAuiToogleView,
                         editView: BilledAuiToogleView
                     },
                     {
                         id: "availability",
                         header: "Zaangażowanie"
                     },
                     {
                         id: "cost",
                         header: "Koszt stawka"
                     },
                     {
                         id: "okp",
                         header: "OKP"
                     }
                 ]
             });
/*

             createRow.bind(AJS.RestfulTable.Events.VALIDATION_ERROR, function (errors) {
                 alert('fix your validation errors before creating new row');
             });

             createRow.bind(AJS.RestfulTable.Events.RENDER, function (errors) {
                 console.log('hhh');
             });
             createRow.bind(AJS.RestfulTable.Events.CREATED, function (errors) {
                 console.log('vvvvv');
             });
*/



             var $ecl = this.$el.find(elVariable)
             $ecl.bind(AJS.RestfulTable.Events.ROW_INITIALIZED, function (row) {
                 console.log(row);

                 AJS.$(event.target).bind(AJS.RestfulTable.Events.RENDER, function () {
                     console.log('tttttttxx');
                 });

                 AJS.$(event.target).find('input[name="userId"]').auiSelect2({
                     ajax: {
                         url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                         dataType: 'json',
                         results: function results(data) {

                             return {
                                 results: data
                             };
                         },
                     }});
             });
//console.log('xxx');
          //   console.log(AJS.RestfulTable.Events.INITIALIZED);
             $ecl.bind(AJS.RestfulTable.Events.INITIALIZED, function (event) {
             //    console.log(this);
             //    console.log(event);

                 $ecl.find('.userSearcher').auiSelect2( {
                     ajax: {
                         url: AJS.contextPath() + '/rest/projectmembers/1.0/projectmembers/users',
                         dataType: 'json',
                         results: function results(data) {

                             return {
                                 results: data
                             };
                         },
                     }})
             });
         },

        render: function () {
            this.$el.html(mustache.render(this.templates.projectContainer,this.projectData));
            var elVariable = "#person-list-" + this.projectData.teamId + "_" + this.projectData.restfulTableId;


            this.$el.find(elVariable).html(this.addRESTfulTable(elVariable,this.projectData.restfulTableId));
           // console.log(this.$el.find(elVariable).find("input[name=developer_name]"))
           // .auiSelect2();


            return this;
        }
    });



    return ProjectView;
});
