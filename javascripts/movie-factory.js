'use strict';

let $ = require('jquery');
const fbURL = 'https://schmoovies-e903e.firebaseapp.com';
let firebase = require('./firebaseConfig');
let getApiKey = require('./api-getter')();
// const moviedbSearchURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${user_input}`;
let apiKey = getApiKey.api_key;

let actorSearch = (movieId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
		}).done((dataFromActorSearch)=>{
			// console.log('dataFromActorSearch ajax', dataFromActorSearch.cast);
			let threeActors = dataFromActorSearch.cast.slice(0,3).map(function(castMember){
				return castMember.name;
			});
			// console.log('three actors', threeActors);
			resolve(threeActors);
		}).fail((err)=>{
			console.log('error from actorSearch ajax');
			reject(err);
		});
	});
};

module.exports.newMoviesSearch = (searchString) => {
	// console.log('search string', searchString);
	// console.log('api key', getApiKey.api_key);
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchString}`
		}).done((dataFromMovieSearchApi)=>{
			// console.log('results of movie api search', dataFromMovieSearchApi);
			let moviesIds = dataFromMovieSearchApi.results.map((movie)=>{
				return movie.id;
			});
			// console.log(moviesIds);
			let actorRequests = moviesIds.map((movieId)=>{
				return actorSearch(movieId);
			});
			// console.log('actor requests array', actorRequests);
			Promise.all(actorRequests)
			.then((actorsArrays) => {
				// console.log(actorsArrays);
				dataFromMovieSearchApi.results.forEach((movie, index) => {
					dataFromMovieSearchApi.results[index].actors = actorsArrays[index];
				});
				// console.log('modified search results', dataFromMovieSearchApi);
				resolve(dataFromMovieSearchApi);
			});

			// resolve(dataFromMovieSearchApi);
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
