'use strict';

let $ = require('jquery');
window.jQuery = require("jquery");
let bootstrap = require('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
require("../lib/node_modules/jquery-bar-rating/dist/jquery.barrating.min.js");
let Handlebars = require('hbsfy/runtime');

require('./user-factory'); // user-factory makes sigin signout functions and runs
let movieController = require('./movie-controller');

$(function() {
  $('.rating').barrating({
    theme: 'bootstrap-stars'
  });
});
