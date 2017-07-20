'use strict';

let $ = require('jquery');
let firebase = require('./firebaseConfig');

let fbURL = "https://schmoovies-e903e.firebaseio.com";

module.exports.saveInFirebase = (movieObj) => {
	return new Promise( (resolve, reject) => {
		$.ajax({
	      url: `${fbURL}/movies.json`,
	      type: "POST",
	      data: JSON.stringify(movieObj), //stringify converts our object format to string format of JSON
	      dataType: 'json'
	    })
			.done( (movieId) => {
	    	// console.log("movieId",movieId );
	      resolve(movieId);
	    });
	});
};

module.exports.getUserMovies = () => {
	return new Promise( (resolve, reject) => {
		let currentUser = firebase.auth().currentUser.uid;
		$.ajax({
	      url: `${fbURL}/movies.json?orderBy="uid"&equalTo="${currentUser}"`,
	    })
			.done( (movieData) => {
	    	// console.log("movieData",movieData );
	      resolve(movieData);
	    });
	});
};