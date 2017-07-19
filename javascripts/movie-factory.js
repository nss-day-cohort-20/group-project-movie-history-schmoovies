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
		let currentUser = firebase.auth().currentUser.uid;
		$.ajax({
			url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchString}`
		}).done((dataFromMovieSearchApi)=>{
			console.log('results of movie api search', dataFromMovieSearchApi);
			console.log(currentUser);
			let $results = dataFromMovieSearchApi.results; //adding userid to the object to use it later.
			$results.forEach( (movie) =>
			{
				movie.uid = currentUser;
			});
			// makeEventLIstener(dataFromMovieSearchApi, currentUser);
			resolve(dataFromMovieSearchApi);
		}).fail((err) => {
			console.log('error from search api request', err);
			reject(err);
		});
	});

};

module.exports.getOneMovie = (movieId) =>
{
	return new Promise( (resolve, reject) =>
	{		
		let currentUser = firebase.auth().currentUser.uid;
		let apiKey = getApiKey.api_key;
		$.ajax({
			url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
		}).done( (requestedMovie) => {
			console.log(requestedMovie, "requestedMovie");
			let movieObj = {};
			movieObj.title = requestedMovie.title;
			movieObj.id = requestedMovie.id;
			movieObj.year = requestedMovie.release_date.slice(0,4);
			movieObj.poster_path = requestedMovie.poster_path;
			movieObj.uid = currentUser;
			movieObj.watched = false;
			movieObj.rating = 0;
			resolve(movieObj);
		}).fail( (err) => {
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
