'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static createInstance (username, email, password) {
    if (!username) { throw new Error() }
    if (!email) { throw new Error() }
    if (!password) { throw new Error() }

    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    return user
  }
}

module.exports = User
