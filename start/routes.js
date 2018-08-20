'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group('users', () => {
  Route.get('/', 'UserController.get')

  Route.get('/:id', 'UserController.show')

  Route.post('/', 'UserController.post')
}).prefix('/users')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})
