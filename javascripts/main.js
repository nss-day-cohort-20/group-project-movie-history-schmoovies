'use strict';

let $ = require('jquery');
window.jQuery = require("jquery");
let Handlebars = require('hbsfy/runtime');
let bootstrap = require('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
require('./user-factory'); // user-factory makes sigin signout functions and runs

let userFactory = require('./user-factory');

let movieController = require('./movie-controller');

// songController.loadSongsToDom();
// on click on sign in button.
$("#auth-btn").click( () =>
{
	console.log("auth-btn-clicked");
	$('#auth-btn').toggleClass('isHidden');
	$('#unauth-btn').toggleClass('isHidden');
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log('user', user);
		// do something with user here.
	}).catch( (err) => {
		console.log('error signing in', err);
	});
});


