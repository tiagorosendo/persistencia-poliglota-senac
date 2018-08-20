const Env = use('Env')
const DocumentClient = require('documentdb').DocumentClient
const uriFactory = require('documentdb').UriFactory

const LOG_URI = Env.get('LOG_URI')
const LOG_TOKEN = Env.get('LOG_TOKEN')
const LOG_DB = Env.get('LOG_DB')
const LOG_COLLECTION = Env.get('LOG_COLLECTION')

const client = new DocumentClient(LOG_URI, { 'masterKey': LOG_TOKEN })

const createDocument = (document) => {
  let collectionUrl = uriFactory.createDocumentCollectionUri(LOG_DB, LOG_COLLECTION)
  return new Promise((resolve, reject) => {
    client.createDocument(collectionUrl, document, (err) => {
      if (err) {
        console.log(err)
        reject(err)
      }

      resolve()
    })
  })
}

module.exports = {
  createDocument: createDocument
}
