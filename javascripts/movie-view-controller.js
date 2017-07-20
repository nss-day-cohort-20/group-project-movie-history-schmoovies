'use strict';

let $ = require('jquery');

let Handlebars = require('hbsfy/runtime');
Handlebars.registerPartial( "movieInfoPartial", require('../templates/partials/movie-info.hbs') );
Handlebars.registerHelper('year', yearHelper);
let searchCardTemplate = require ('../templates/searchCards.hbs');
let unwatchedCardsTemplate = require('../templates/unwatchedCard.hbs');

function yearHelper(dateString) {
	return dateString.slice(0,4);
}

let fbFactory = require('./firebase-factory');
let fbURL = "https://schmoovies-e903e.firebaseio.com";


module.exports.searchDataToMovieCards = (data) => {
	let cards = searchCardTemplate({movies: data.results});
	$("#movieContainer").append(cards);
};

module.exports.unwatchedFBToMovieCards = (data) => {
	console.log('user movies from FB', data);
	let cards = unwatchedCardTemplate({movies: data});
	$("#movieContainer").html(cards);
};

module.exports.unwatchedDataToMovieCards = (data) => {
	let cards = unwatchedCardsTemplate({movies: data.results});
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

//show saved movies
module.exports.showSavedMovies = () => {
	console.log('showSavedMovies fn');
	fbFactory.getUserMovies()
	.then( (userMovieData) => {
		console.log('userMovieData', userMovieData);
		module.exports.unwatchedFBToMovieCards(userMovieData);
	})
	.catch( (error) => {
		console.log('error', error);
	});
};

// watchedLink

