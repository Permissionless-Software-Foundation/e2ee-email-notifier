/*
  This email use-case library contains business logic for detecting new e2ee
  messages and sending notifications to user.
*/

// Local libraries
// import UserEntity from '../entities/user.js'
// import wlogger from '../adapters/wlogger.js'

class EmailUseCases {
  constructor (localConfig = {}) {
    // console.log('User localConfig: ', localConfig)
    this.adapters = localConfig.adapters
    if (!this.adapters) {
      throw new Error(
        'Instance of adapters must be passed in when instantiating Email Use Cases library.'
      )
    }

    // Encapsulate dependencies
    // this.UserEntity = new UserEntity()
    // this.UserModel = this.adapters.localdb.Users
  }

  async checkMessages () {
    try {
      console.log('checkMessages() use case executed.')
    } catch (err) {
      console.error('Error in checkMessages(): ', err)
      throw err
    }
  }
}

export default EmailUseCases
