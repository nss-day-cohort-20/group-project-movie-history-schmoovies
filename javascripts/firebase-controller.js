'use strict';
let fbURL = "https://schmoovies-e903e.firebaseio.com";
let $ = require('jquery');
let viewController = require('./movie-view-controller');

module.exports.saveInFirebase = (movieObj) => {
	return new Promise( (resolve, reject) => {
		$.ajax(
	    {
	      url: `${fbURL}/movies.json`,
	      type: "POST",
	      data: JSON.stringify(movieObj), //stringify converts our object format to string format of JSON
	      dataType: 'json'
	    }).done( (movieObjId) => {
	    	console.log("movieObjId",movieObjId.name);
	    	viewController.deleteFromScreen(movieObjId.name);
	      resolve(movieObjId);
	    });
	});
};