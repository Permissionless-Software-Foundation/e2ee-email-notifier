/*
  This email use-case library contains business logic for detecting new e2ee
  messages and sending notifications to user.
*/

// Global npm libraries
import BchWallet from 'minimal-slp-wallet'
import MsgLib from 'bch-message-lib'

// Local libraries
// import UserEntity from '../entities/user.js'
// import wlogger from '../adapters/wlogger.js'
import config from '../../config/index.js'


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
    this.config = config
    // this.MsgLib = MsgLib
    // this.BchWallet = BchWallet
    this.wallet = new BchWallet(undefined, { interface: 'consumer-api'})
    this.msgLib = new MsgLib({ wallet: this.wallet })
  }

  async checkMessages () {
    try {
      // console.log('checkMessages() use case executed.')

      const cashAddress = this.config.merchantAddr

      // Get message signals from the blockchain.
      const messages = await this.msgLib.memo.readMsgSignal(cashAddress)
      // console.log(`messages: ${JSON.stringify(messages, null, 2)}`)

      // Filter out sent messages, so user only sees recieved messages.
      const receiveMessages = this.filterMessages(cashAddress, messages)
      if (!receiveMessages.length) {
        console.log('No Messages Found!')
        return false
      }
      // console.log('receiveMessages: ', receiveMessages)

      // Loop through all the found messages
      for(let i=0; i < receiveMessages.length; i++) {
        const thisMsg = receiveMessages[i]

        // Check messages against database.
        const msgFoundInDb = await this.adapters.localdb.Messages.findOne({txid: thisMsg.txid})
        // console.log(`msgFoundInDb: ${JSON.stringify(msgFoundInDb, null, 2)}`)

        // If message is not in database, then send email notification.
        if(!msgFoundInDb) {
          console.log('New message found! thisMsg: ', thisMsg)

          // Send email notification.

          // Add message to the database.
          const newMsg = new this.adapters.localdb.Messages({txid: thisMsg.txid})
          await newMsg.save()
        }
      }

      
    } catch (err) {
      console.error('Error in checkMessages(): ', err)
      throw err
    }
  }

  // Ignores send messages
  // returns only received messages
  filterMessages (bchAddress, messages) {
    try {
      if (!bchAddress || typeof bchAddress !== 'string') {
        throw new Error('bchAddress must be a string.')
      }
      if (!Array.isArray(messages)) {
        throw new Error('messages must be an array.')
      }
      const filtered = []

      for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        if (message.sender !== bchAddress) {
          filtered.push(message)
        }
      }
      return filtered
    } catch (error) {
      console.log('Error in filterMessages()')
      throw error
    }
  }
}

export default EmailUseCases
