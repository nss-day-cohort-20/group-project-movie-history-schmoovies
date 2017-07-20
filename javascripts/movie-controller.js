'use strict';

let $ = require('jquery');
let db = require('./movie-factory');
let templates = require('./template-builder');
let firebase = require('./firebaseConfig');
let fbFactory = require('./firebase-factory');
let movieViewController = require('./movie-view-controller');

let $container = $('#movieContainer');

//HANDLERS

let $searchInput = $('#text-search-input');
let $radioNew = $('#new-search-radio');

//Search handler - show all matching saved movies, then api matches
$(document).on('keyup', '#text-search-input', function(){
	// console.log('input event', event);
	if (event.key === 'Enter') {
		// console.log('value with jquery', $searchInput.val());

		db.newMoviesSearch($searchInput.val())
		.then(function(searchResults){
			// console.log('data from movie factory new search method', searchResults);
			movieViewController.searchDataToMovieCards(searchResults);
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

//Move to watched list

//Modify rating

