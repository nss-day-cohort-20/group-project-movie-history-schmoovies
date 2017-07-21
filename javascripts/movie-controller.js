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


let filteredMovies = [];
//Search handler - show all matching saved movies, then api matches
$(document).on('keyup', '#text-search-input', function() {
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
			// movieViewController.movieCardsView(filteredMovies);
			return db.newMoviesSearch(queryString);
		  })
		.then( (newMovies) => {
			movieViewController.searchDataToMovieCards(newMovies);

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
		movieViewController.savedFBToMovieCards(recievedMovieObj);
	});
});

//Modify rating NOT FINISHED YET
$(document).on('click', '.rating span', function() {
	console.log('star was clicked', event.target);
	// fbFactory.modifyRating();
});
