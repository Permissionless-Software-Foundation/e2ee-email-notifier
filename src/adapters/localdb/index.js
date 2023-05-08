/*
  This library encapsulates code concerned with MongoDB and Mongoose models.
*/

// Load Mongoose models.
import Users from './models/users.js'
import Messages from './models/messages.js'

class LocalDB {
  constructor () {
    // Encapsulate dependencies
    this.Users = Users
    this.Messages = Messages
  }
}

export default LocalDB
