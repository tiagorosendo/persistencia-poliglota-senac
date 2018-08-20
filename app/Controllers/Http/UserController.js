'use strict'
const User = use('App/Models/User')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class UserController {
  async get ({response}) {
    const configurations = await User.all()
    return response.apiCollection(configurations)
  }

  async show ({ request, response }) {
    const user = await User.findBy('id', request.params.id)

    if (!user) {
      throw ResourceNotFoundException.invoke(`Can not find user with id "${request.params.id}"`)
    }

    return response.apiItem(user)
  }

  async post ({ request, response }) {
    const user = User.createInstance(request.body.username, request.body.email, request.body.password)
    await user.save()

    return response.apiCreated(user)
  }
}

module.exports = UserController
