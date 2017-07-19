'use strict';

let $ = require('jquery');
window.jQuery = require("jquery");
let Handlebars = require('hbsfy/runtime');
let bootstrap = require('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
require('./user-factory'); // user-factory makes sigin signout functions and runs

//templates import
Handlebars.registerPartial( "movieInfoPartial", require('../templates/partials/movie-info.hbs') );
let searchCardTemplate = require ('../templates/searchCards.hbs');

//call for example 'BATMAN' search in data folder
$.ajax({
	  url: `../data/search-results-batman.json`
		})
		.done( (data) => {
			console.log('data', data);
			let cards = searchCardTemplate({movies: data.results});
			$("#movieContainer").append(cards);
		})
		.fail( (reject) => {
			console.log('error in ajax');
		});