/*
  This Controller library is concerned with timer-based functions that are
  kicked off periodicially.
*/

import config from '../../config/index.js'

class TimerControllers {
  constructor (localConfig = {}) {
    // Dependency Injection.
    this.adapters = localConfig.adapters
    if (!this.adapters) {
      throw new Error(
        'Instance of Adapters library required when instantiating Timer Controller libraries.'
      )
    }
    this.useCases = localConfig.useCases
    if (!this.useCases) {
      throw new Error(
        'Instance of Use Cases library required when instantiating Timer Controller libraries.'
      )
    }

    this.debugLevel = localConfig.debugLevel

    // Encapsulate dependencies
    this.config = config

    // Bind 'this' object to all subfunctions.
    this.checkMessages = this.checkMessages.bind(this)

    // this.startTimers()
  }

  // Start all the time-based controllers.
  startTimers () {
    // Any new timer control functions can be added here. They will be started
    // when the server starts.
    this.checkMessagesHandle = setInterval(this.checkMessages, 60000 * 5)

    return true
  }

  stopTimers () {
    clearInterval(this.checkMessagesHandle)
  }

  // Replace this example function with your own timer handler.
  async checkMessages () {
    try {
      const now = new Date()
      console.log(`checkMessages() timer controller executed at ${now.toLocaleString()}`)

      await this.useCases.email.checkMessages()

      return true
    } catch (err) {
      console.error('Error in checkMessages(): ', err)

      // Note: Do not throw an error. This is a top-level function.
      return false
    }
  }
}

export default TimerControllers
