/*
  Unit tests for the email use-case library
*/

// Public npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import EmailUseCases from '../../../src/use-cases/email.js'
import adapters from '../mocks/adapters/index.js'

describe('#email-use-case', () => {
  let uut
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    uut = new EmailUseCases({ adapters })
  })

  afterEach(() => sandbox.restore())

  describe('#constructor', () => {
    it('should throw an error if adapters are not passed in', () => {
      try {
        uut = new EmailUseCases()

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(
          err.message,
          'Instance of adapters must be passed in when instantiating Email Use Cases library.'
        )
      }
    })
  })

  describe('#checkMessages', () => {
    it('should return false if there are no messages', async () => {
      // Mock dependencies and force desired code path
      sandbox.stub(uut.msgLib.memo, 'readMsgSignal').resolves([])

      const result = await uut.checkMessages()

      assert.equal(result, false)
    })

    it('should return true when detecting new messages', async () => {
      // Mock dependencies and force desired code path
      sandbox.stub(uut.msgLib.memo, 'readMsgSignal').resolves([{
        hash: 'zdpuAnPowM1BLngW68mqjriu3NYVcRg2Mf8uhqxAFBkSHM5fx',
        subject: 'Order Paid',
        sender: 'bitcoincash:qznmqxu0yxhus0ff7wufqh8zlexkm4v4mvjav2r7v3',
        txid: '30e9461a6f32cf31f9fa80a2cad41a02dfe38910f419ccaaf29454348d37088f',
        time: 1683569356
      }])
      sandbox.stub(uut.adapters.localdb.Messages, 'findOne').resolves(null)
      sandbox.stub(uut.adapters.nodemailer, 'sendEmail').resolves()

      const result = await uut.checkMessages()

      assert.equal(result, true)
    })

    it('should catch, report, and throw errors', async () => {
      // Mock dependencies and force desired code path
      sandbox.stub(uut.msgLib.memo, 'readMsgSignal').rejects(new Error('test error'))

      try {
        await uut.checkMessages()

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })
  })

  describe('#filterMessages()', () => {
    it('should filter messages.', async () => {
      const msgs = [{
        hash: 'zdpuAnPowM1BLngW68mqjriu3NYVcRg2Mf8uhqxAFBkSHM5fx',
        subject: 'Order Paid',
        sender: 'bitcoincash:qznmqxu0yxhus0ff7wufqh8zlexkm4v4mvjav2r7v3',
        txid: '30e9461a6f32cf31f9fa80a2cad41a02dfe38910f419ccaaf29454348d37088f',
        time: 1683569356
      }]

      const bchAddress =
        'bitcoincash:qpjxec7k5rlxz6md8ur6zlmmkrqcu2jnlsdh0j4ksx'
      const result = await uut.filterMessages(bchAddress, msgs)

      assert.isArray(result)
    })

    it('should throw error if bchAddress is not provided.', async () => {
      try {
        await uut.filterMessages()

        assert.fail('Unexpected result')
      } catch (err) {
        assert.include(
          err.message,
          'bchAddress must be a string.',
          'Should throw expected error.'
        )
      }
    })

    it('should throw error if messages is not provided', async () => {
      try {
        const bchAddress =
          'bitcoincash:qpjxec7k5rlxz6md8ur6zlmmkrqcu2jnlsdh0j4ksx'

        await uut.filterMessages(bchAddress)

        assert.fail('Unexpected result')
      } catch (err) {
        assert.include(
          err.message,
          'messages must be an array.',
          'Should throw expected error.'
        )
      }
    })
  })
})
