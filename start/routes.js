'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'UserController.register')
Route.post('/authenticate', 'UserController.authenticate')
Route.post('/forgot', 'ResetPasswordController.forgot')
Route.post('/reset', 'ResetPasswordController.store')

Route.group(() => {
  Route.resource('/animals', 'AnimalController').apiOnly()
  Route.post('/animal/:id', 'ImageController.store')
  Route.resource('/city', 'CityController').apiOnly()
  Route.get('/adopted', 'AdoptedAnimalController.index')
  Route.resource('/user', 'UserDatumController').apiOnly().except(['destroy', 'store'])
  Route.get('animal', 'UserDatumController.animals')
}).middleware('auth')
