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

module.exports.searchDataToMovieCards = (data) => {
	let cards = searchCardTemplate({movies: data.results});
	$("#movieContainer").html(cards);
};

module.exports.unwatchedDataToMovieCards = (data) => {
	let cards = unwatchedCardsTemplate({movies: data.results});
	$("#movieContainer").html(cards);
};