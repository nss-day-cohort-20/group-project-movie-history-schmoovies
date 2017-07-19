'use strict';

let $ = require('jquery');
const fbURL = 'https://schmoovies-e903e.firebaseapp.com';
let firebase = require('./firebaseConfig');
let getApiKey = require('./api-getter')();
// const moviedbSearchURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${user_input}`;

module.exports.newMoviesSearch = (searchString) => {
	// console.log('search string', searchString);
	// console.log('api key', getApiKey.api_key);
	let apiKey = getApiKey.api_key;
	return new Promise(	(resolve, reject) => {
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchString}`
		}).done((dataFromMovieSearchApi)=>{
			// console.log('results of movie api search', dataFromMovieSearchApi);
			resolve(dataFromMovieSearchApi);
		}).fail((err) => {
			console.log('error from search api request', err);
			reject(err);
		});
	});

};

module.exports.savedMoviesSearch = (searchString) => {

};

module.exports.getUnWatchedMovies = () => {

};

module.exports.getWatchedMovides = () => {

};
