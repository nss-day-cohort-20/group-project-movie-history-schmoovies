'use strict';

let $ = require('jquery');

let Handlebars = require('hbsfy/runtime');
Handlebars.registerPartial( "movieInfoPartial", require('../templates/partials/movie-info.hbs') );
let searchCardTemplate = require ('../templates/searchCards.hbs');
let unwatchedCardTemplate = require ('../templates/unwatchedCard.hbs');

let fbFactory = require('./firebase-factory');
let fbURL = "https://schmoovies-e903e.firebaseio.com";

module.exports.searchDataToMovieCards = (data) => {
	let cards = searchCardTemplate({movies: data.results});
	$("#movieContainer").append(cards);
};

module.exports.savedFBToMovieCards = (data) => {
	console.log('user movies from FB', data);
	let cards = unwatchedCardTemplate({movies: data});
	$("#movieContainer").html(cards);
};

module.exports.deleteFromScreen = (movieObjId) => {
	return new Promise( (resolve, reject) => {
		$.ajax({
	      url: `${fbURL}/movies/${movieObjId}.json`,
	      type: "GET"
	    }).done( (movieObj) => {
	    	let movieId = movieObj.id;
	      $(`#searchedMovie${movieId}`).remove();
	      resolve(movieObj.id);
	    }).fail( (err) => {
	    	console.log("error", err);
	    });
	});
};

//show saved movies
module.exports.showSavedMovies = () => {
	console.log('showSavedMovies fn');
	fbFactory.getUserMovies()
	.then( (userMovieData) => {
		console.log('userMovieData', userMovieData);
		module.exports.savedFBToMovieCards(userMovieData);
	})
	.catch( (error) => {
		console.log('error', error);
	});
};

// watchedLink

