'use strict';
let fbURL = "https://schmoovies-e903e.firebaseio.com";
let $ = require('jquery');

module.exports.saveInFirebase = (movieObj) => {
	return new Promise( (resolve, reject) => {
		$.ajax(
	    {
	      url: `${fbURL}/movies.json`,
	      type: "POST",
	      data: JSON.stringify(movieObj), //stringify converts our object format to string format of JSON
	      dataType: 'json'
	    }).done( (movieId) => {
	    	console.log("movieId",movieId );
	      resolve(movieId);
	    });
	});
};