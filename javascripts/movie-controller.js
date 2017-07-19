'use strict';

let $ = require('jquery');
let db = require('./movie-factory');
let templates = require('./template-builder');
let $container = $('#movieContainer');

module.exports.loadMoviesToDOM = () => {

};


//HANDLERS

//Show New movies
$(document).on('keyup', '#text-search-input', function(){
	console.log('enter typed while in input');
});



//Show Watched

//Show Unwatched

//Add to unwatched list

//Move to watched list

//Modify rating

