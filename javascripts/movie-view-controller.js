'use strict';

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');

Handlebars.registerPartial( "movieInfoPartial", require('../templates/partials/movie-info.hbs') );
let searchCardTemplate = require ('../templates/searchCards.hbs');

module.exports.searchDataToMovieCards = (data) => {
	let cards = searchCardTemplate({movies: data.results});
	$("#movieContainer").append(cards);
};