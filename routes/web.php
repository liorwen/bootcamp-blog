<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});
//
//Auth::routes();
//
//Route::get('/home', 'HomeController@index');
//
//
//Route::get('/signup', function () {
//    return view('auth/sign-up');
//});
//Route::get('/signin', function () {
//    return view('auth/sign-in');
//});

Route::get('/{vue_capture?}', function () {
    return view('frontend.app');
})->where('vue_capture', '[\/\w\.-]*');
