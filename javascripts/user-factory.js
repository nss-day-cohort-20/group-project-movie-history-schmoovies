'use strict';

let firebase = require('./firebaseConfig');
let provider = new firebase.auth.GoogleAuthProvider();
module.exports.logInGoogle = () =>
{
	console.log("in auth");
	return firebase.auth().signInWithPopup(provider);
};

module.exports.logOut = () =>
{
	return firebase.auth().signOut();
};