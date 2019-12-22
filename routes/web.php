<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::middleware(['auth'])->group(function() {
	Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/contacts', 'ContactController@get')->name('contact.get');
    Route::post('/contacts', 'ContactController@add')->name('contact.add');
    Route::put('/contacts/{id}', 'ContactController@edit')->name('contact.edit');
    Route::delete('/contacts/{id}', 'ContactController@delete')->name('contact.find');

    Route::post('/users', 'UserController@search')->name('user.search');
});
