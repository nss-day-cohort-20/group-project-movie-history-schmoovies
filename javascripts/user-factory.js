'use strict';

let $ = require('jquery');
let firebase = require('./firebaseConfig');
let provider = new firebase.auth.GoogleAuthProvider();
let logInGoogle = () =>
{
	console.log("in auth");
	return firebase.auth().signInWithPopup(provider);
};

let logOut = () =>
{
	return firebase.auth().signOut();
};

$("#auth-btn").click( () =>
{
	console.log("auth-btn-clicked");
	$('#auth-btn').toggleClass('isHidden');
	$('#unauth-btn').toggleClass('isHidden');
	logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log('user', user);
		// do something with user here.
	}).catch( (err) => {
		console.log('error signing in', err);
	});
});

// on click on logout button. make sure it has isHidden class.
$("#unauth-btn").click( () =>
{
	console.log('unauth-btn clicked');
	logOut()
	.then( (result) => {
		console.log('Successfully signed out');
		location.reload();
	})
	.catch( (err) =>
	{
		console.log('error signing you out', err);
	});
});
