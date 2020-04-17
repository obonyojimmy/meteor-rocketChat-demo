import React from 'react'
import Chat from './Chat.jsx'

class App extends React.Component {
  render () {
    return (
      <div className='cont'>
        <div className='collumn'>
          <Chat />
        </div>
        <div className='collumn' />
      </div>
    )
  }
}

export default App
