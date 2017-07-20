'use strict';

let $ = require('jquery');
let firebase = require('./firebaseConfig');
let provider = new firebase.auth.GoogleAuthProvider();
let movieViewController = require('./movie-view-controller');

let logInGoogle = () => {
	console.log("in auth");
	return firebase.auth().signInWithPopup(provider);
};

let logOut = () => {
	return firebase.auth().signOut();
};

$("#auth-btn").click( () => {
	console.log("auth-btn-clicked");
	// $('').toggleClass('isHidden');
	// $('#unauth-btn').toggleClass('isHidden');
	logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log('user', user);
		$('#loginPage').toggleClass('isHidden');
		$('#afterSignin').toggleClass('isHidden');
		movieViewController.showSavedMovies();
	}).catch( (err) => {
		console.log('error signing in', err);
	});
});

// on click on logout button. make sure it has isHidden class.
$("#unauth-btn").click( () => {
	console.log('unauth-btn clicked');
	logOut()
	.then( (result) => {
		console.log('Successfully signed out');
		location.reload();
	})
	.catch( (err) => {
		console.log('error signing you out', err);
	});
});
