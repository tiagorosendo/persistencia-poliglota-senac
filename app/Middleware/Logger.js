'use strict'
const uuid = require('uuid/v4')
const cosmosdb = use('App/Services/CosmosDBWriter')

class Logger {
  async handle ({request, response}, next) {
    const logInformations = {
      Message: '',
      Method: request.request.method,
      Body: {},
      RequestPath: request.request.url,
      RequestId: uuid()
    }

    try {
      console.log('Request: ', JSON.stringify(logInformations, null, 2))
      this.FillLogInformations(logInformations, 'Request', request.body)
      await cosmosdb.createDocument(logInformations)

      await next()
    } catch (error) {
      console.log('An Error has occured: ', error)

      this.FillLogInformations(logInformations, 'An Error has occured: ', error.stack)
      await cosmosdb.createDocument(logInformations)

      throw error
    } finally {
      this.FillLogInformations(logInformations, 'Response', response._lazyBody.content)
      console.log('Response: ', JSON.stringify(logInformations, null, 2))
      await cosmosdb.createDocument(logInformations)
    }
  }

  FillLogInformations (logInformations, message, error) {
    logInformations.Message = message
    logInformations.Body = error
    logInformations.id = uuid()
  }
}

module.exports = Logger
