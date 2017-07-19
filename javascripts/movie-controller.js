'use strict';

let $ = require('jquery');
let db = require('./movie-factory');
let templates = require('./template-builder');
let $container = $('#movieContainer');

let movieViewController = require('./movie-view-controller');

module.exports.loadMoviesToDOM = () => {

};


//HANDLERS


let $searchInput = $('#text-search-input');
//Show New movies
$(document).on('keyup', '#text-search-input', function(){
	if (event.key === 'Enter') {
		// console.log('value with jquery', $searchInput.val());
		db.newMoviesSearch($searchInput.val())
		.then(function(searchResults){
			// console.log('data from movie factory new search method', searchResults);
			movieViewController.searchDataToMovieCards(searchResults);
		});
	}
});



//Show Watched

//Show Unwatched

//Add to unwatched list

//Move to watched list

//Modify rating

