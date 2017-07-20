'use strict';

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let fbURL = "https://schmoovies-e903e.firebaseio.com";

Handlebars.registerPartial( "movieInfoPartial", require('../templates/partials/movie-info.hbs') );
let searchCardTemplate = require ('../templates/searchCards.hbs');

module.exports.searchDataToMovieCards = (data) => {
	let cards = searchCardTemplate({movies: data.results});
	$("#movieContainer").html(cards);
};

module.exports.deleteFromScreen = (movieObjId) => {
	return new Promise( (resolve, reject) => {
		$.ajax({
	      url: `${fbURL}/movies/${movieObjId}.json`,
	      type: "GET"
	    }).done( (movieObj) => {
	    	let movieId = movieObj.id;
	      $(`#movie${movieId}`).remove();
	      resolve(movieObj.id);

	    }).fail( (err) => {
	    	console.log("error", err);
	    });
	});
};