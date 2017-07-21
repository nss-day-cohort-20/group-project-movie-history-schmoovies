'use strict';

let $ = require('jquery');
let db = require('./movie-factory');
let templates = require('./template-builder');
let firebase = require('./firebaseConfig');
let fbFactory = require('./firebase-factory');
let movieViewController = require('./movie-view-controller');

let $container = $('#movieContainer');
let $searchInput = $('#text-search-input');
let $radioNew = $('#new-search-radio');


//Search handler - show all matching saved movies, then api matches
$(document).on('keyup', '#text-search-input', function() {
	let filteredMovies = [];
	// console.log('input event', event);
	if (event.key === 'Enter') {
		$container.empty();
		//grab search string
		let queryString = $('#text-search-input').val();
		//get user's movies
		fbFactory.getUserMovies()
		.then( (userMovies) => {
			//filter to match search and store in array
			for (var movie in userMovies) {
				if (userMovies[movie].title.toLowerCase().indexOf(queryString) != -1 ) {
					filteredMovies.push(userMovies[movie]);
				}
			}
			movieViewController.savedFBToMovieCards(filteredMovies);
			return db.newMoviesSearch(queryString);
		  })
		//get search results
		.then( (newMovies) => {
			movieViewController.searchDataToMovieCards(newMovies);
			//check DB movie ID for each result, remove from DOM if match
			newMovies.results.forEach( (movie) => {
				filteredMovies.forEach( (fmovie) => {
					if(movie.id === fmovie.id) {
						console.log("found one");
						$(`#searchedMovie${fmovie.id}`).remove();
					}
				});
			});
		});
	}
});

//Add to unwatched list
$(document).on('click', `.saveMovieLink`, function() {
	let currentUser = firebase.auth().currentUser.uid;
	// console.log(currentUser);
	let movieId = event.target.classList[1]; //get the movie id
	db.getOneMovie(movieId)
	.then( (recievedMovieObj) => {
		console.log("recievedMovieObj",recievedMovieObj);
		fbFactory.saveInFirebase(recievedMovieObj);
	});
});

//Modify rating NOT FINISHED YET
$(document).on('click', '.rating span', function() {
	// console.log('star was clicked', event.target);
	console.log('the rating is', $(this).data('rate'));
	let ratingObj = {};
	ratingObj.rating = $(this).data('rate');
	console.log('rating object', ratingObj);
	// fbFactory.modifyRating(ratingObj);
});

//FILTERS - TODO - Dry these up.
//show only unsaved/untracked movies
$(document).on('click', '#untracked-btn', function() {
	let allMovieCards = $('.movieCard');
	allMovieCards.each( function() {
		$(this).addClass('isHidden');
		if ( $(this).hasClass('searchResult') ) {
			$(this).removeClass('isHidden');
		}
	});
});

//show only saved/unwatched movies
$(document).on('click', '#unwatched-btn', function() {
	let allMovieCards = $('.movieCard');
	allMovieCards.each( function() {
		$(this).removeClass('isHidden');
		if ( $(this).data('rating') != 0 ) {
			$(this).addClass('isHidden');
		}
		if ( $(this).hasClass('searchResult') ){
			$(this).addClass('isHidden');
		}
	});
});

//show only watched movies
$(document).on('click', '#watched-btn', function() {
	let allMovieCards = $('.movieCard');
	allMovieCards.each( function() {
		$(this).removeClass('isHidden');
		if ($(this).data('rating')  < 1 ) {
			$(this).addClass('isHidden');
		}
		if ( $(this).hasClass('searchResult') ){
			$(this).addClass('isHidden');
		}
	});
});

//show only favorite movies
$(document).on('click', '#fav-btn', function() {
	let allMovieCards = $('.movieCard');
	allMovieCards.each( function() {
		$(this).removeClass('isHidden');
		if ( $(this).data('rating') < 9 ) {
			$(this).addClass('isHidden');
		}
		if ( $(this).hasClass('searchResult') ){
			$(this).addClass('isHidden');
		}
	});
});




