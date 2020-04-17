import React from 'react'
import { Meteor } from 'meteor/meteor'

const baseUrl = Meteor.settings.public.chatUrl

class Iframe extends React.Component {
  constructor (props) {
    super(props)
    this.iframeRef = React.createRef()
  }

  render () {
    const { src, height, width, authToken } = this.props
    console.log(authToken)

    if (!authToken){
      return null
    }

    function iframeDidLoad (event) {
      console.log(event.target)
      const iWindow = event.target.contentWindow
       iWindow.postMessage({
        event: 'login-with-token',
        loginToken: authToken
      }, baseUrl);
    }

    return (
      <iframe ref={this.iframeRef} src={src} height={height} width={width} onLoad={iframeDidLoad} />
    )
  }
}

class Chat extends React.Component {
  state = {
    authToken: null
  }

  UNSAFE_componentWillMount () {
    Meteor.call('chat.getLoginToken', (err, data) => {
      // console.log(err)
      if (!err) {
        console.log(data)
        this.setState({ authToken: data.data.authToken })
      }
    })
  }

  render () {
    const {authToken} = this.state

    const frameProps = {
      src: `${baseUrl}/channel/general?layout=embedded`,
      height: '100%',
      width: '100%',
      authToken
    }
    return (
      <Iframe {...frameProps} />
    )
  }
}

export default Chat
