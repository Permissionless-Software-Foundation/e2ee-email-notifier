/*
  Database model for tracking on-chain message signals.
*/

// Global npm libraries
import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  txid: { type: String }
})

export default mongoose.model('message', Message)
