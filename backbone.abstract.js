define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	var realSync = Backbone.sync

	//Modify the sync method to play nice with custom URLs.
	Backbone.realSync = Backbone.sync;
	Backbone.sync = function(method, model, options){

		options = options || {};
		switch(method){
			case('create'):
			options.url = model.url+model.namespace;
			break;
			case('read'):
			case('update'):
			case('delete'):
			options.url = model.url+model.namespace+'/'+model.id;
			break;
			default:
			options.url = model.url+model.namespace+'/'+method;
			if(model.id){
				options.url = options.url+'/'+model.id;
			}
			break;
		}
		return realSync(method, model, options);
	}

	return Backbone;

});