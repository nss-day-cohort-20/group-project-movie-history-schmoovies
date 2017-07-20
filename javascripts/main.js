'use strict';

let $ = require('jquery');
window.jQuery = require("jquery");
let Handlebars = require('hbsfy/runtime');
let bootstrap = require('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
require('./user-factory'); // user-factory makes sigin signout functions and runs
let userFactory = require('./user-factory');
let movieController = require('./movie-controller');

//use to test getting a user's database in the console, remove after that view is finished.
// window.fbFactory = require('./firebase-factory.js');

