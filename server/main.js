import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

const baseUrl = Meteor.settings.public.chatUrl

Meteor.methods({
  'chat.registerUser' (params) {
    // TODO
  },
  'chat.getLoginToken' () {
    if(!this.user) throw new Meteor.Error('Login to access chat')

    const {chat: {username, password}} = Meteor.user()

    try {
      const res = HTTP.post(`${baseUrl}/api/v1/login`, {
        data: { username, password }
      })

      return res.data
    } catch (error) {
      console.log(error)
    }
  }
})
