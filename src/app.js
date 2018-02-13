import React, { Component } from 'react'

import '../node_modules/bulma/css/bulma.css'
import './icons.css'
import './fireworks.css'
import './index.css'
import './app.css'
import logo from './assets/images/logo.svg'

import {
  Footer,
  FooterContainer,
  PreviewFrame,
  NavBar,
  NavBarMenu,
  NavBarMenuItem,
  Content,
  Tools,
  ToolLogo,
  ToolLogoImage,
  Url,
  Logo
} from './app.styles'

function sendMessage(e) {
  // Prevent any default browser behaviour.
  // e.preventDefault();

  // Send a message with the text 'Hello Treehouse!' to the receiver window.
  // var receiver = document.getElementById('preview_frame')
  //
  // receiver.onload()
  // receiver.contentWindow;
  // receiver.postMessage('Hello Treehouse!', 'http://localhost:3000');
}

const timer = {
  start: 0,
  end: 0,
  result: 0
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFirstClick: true,
      isFinished: false,
      isStarted: false,
      previewFrameSrc: '',
      participants: [
        {
          title: 'ES5',
          url: 'http://localhost:8000',
          // url: 'http://jsmeasure-es5.surge.sh',
          progress: 0,
          time: 0,
          isSelected: false
        },
        {
          title: 'ES6',
          url: 'http://localhost:8001',
          // url: 'http://jsmeasure-es6.surge.sh',
          progress: 0,
          time: 0,
          isSelected: false
        },
        {
          title: 'jQuery',
          url: 'http://localhost:8002',
          // url: 'http://jsmeasure-jquery.surge.sh',
          progress: 0,
          time: 0,
          isSelected: false
        },
        {
          title: 'Backbone',
          url: 'http://localhost:8003',
          // url: 'http://jsmeasure-backbone.surge.sh',
          progress: 0,
          time: 0,
          isSelected: false
        },
        {
          title: 'Aurelia',
          url: 'http://localhost:7000',
          // url: 'http://localhost:9000#10000',
          // url: 'http://jsmeasure-aurelia.surge.sh',
          progress: 0,
          time: 0,
          isSelected: false
        }
      ]
    }

    window.addEventListener('message', event => {
      const message = event.data

      console.log('message', message)

      if (message === 'FRAME_LOADED') {
        const result = new Date().getTime() - timer.start
        const participants = this.state.participants

        for (let i = 0; i < participants.length; i++) {
          const participant = participants[i]

          if (participant.isSelected) {
            participant.time = result
            participant.isSelected = false

            const participantNext = participants[i + 1]

            if (participantNext) {
              participantNext.isSelected = true
            }

            this.setState({participants: participants})

            this.startTest()
            break
          }
        }
      }
    }, false)
  }

  startTest(isNewStart) {
    if (isNewStart) {
      const participants = this.state.participants
      participants[0].isSelected = true
      this.setState({participants: participants})
    }

    timer.start = new Date().getTime()

    const participantSelected = this.state.participants.filter(participant => participant.isSelected)[0]

    if (!participantSelected) {
      this.finishTest()
      return
    }

    console.log('participantSelected', participantSelected)

    this.setState({
      isStarted: true,
      previewFrameSrc: participantSelected.url
    })

    sendMessage()
  }

  finishTest() {
    const participants = this.state.participants.map(participant => {
      participant.isSelected = false
      return participant
    })

    this.setState({
      participants: participants,
      isStarted: false,
      previewFrameSrc: ''
    })
  }

  renderTools() {
    const tools = [
      {
        name: 'React JS',
        logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
        url: 'https://reactjs.org'
      },
      {
        name: 'Bulma',
        logo: 'https://bulma.io/images/bulma-logo.png',
        url: 'https://bulma.io'
      }
    ]

    return tools.map((tool, i) => (
      <ToolLogo key={'tool_' + i} href={tool.url} target={'_blank'} title={tool.name}>
        <ToolLogoImage src={tool.logo} alt={tool.name}/>
      </ToolLogo>
    ))
  }

  renderParticipants() {
    return this.state.participants.map((participant, i) => (
      <tr key={'participant_' + i} className={participant.isSelected ? 'is-selected' : ''}>
        <th>{i + 1}</th>
        <td>
          {participant.title} <Url href={participant.url} target={'_blank'}>{participant.url}</Url>
        </td>
        <td className="has-text-right">{participant.progress}%</td>
        <td className="has-text-right">{participant.time}ms</td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
        <div className="container">
          <NavBar className="navbar">
            <NavBarMenu className="navbar-menu is-active">
              <div className="navbar-start">
                <a className="navbar-item" href="/">
                  <Logo src={logo} alt="" />
                </a>
              </div>

              <div className="navbar-end">
                <NavBarMenuItem className="navbar-item">
                  Home
                </NavBarMenuItem>
                <NavBarMenuItem className="navbar-item">
                  Home
                </NavBarMenuItem>
                <NavBarMenuItem className="navbar-item">
                  Home
                </NavBarMenuItem>
              </div>
            </NavBarMenu>
          </NavBar>

          <Content className="content">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <a
                    className={'button is-primary is-pulled-right' + (this.state.isStarted ? ' is-loading' : '')}
                    onClick={() => this.startTest(true)}
                  >
                    Start test
                  </a>

                  <table className="table">
                    <thead>
                      <tr>
                        <th width="50">#</th>
                        <th>Title</th>
                        <th width="100">Progress</th>
                        <th width="100">Time, ms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderParticipants()}
                    </tbody>
                  </table>
                </div>
                <div className="column is-one-third">
                  <PreviewFrame
                    id="preview_frame"
                    title="previewFrame"
                    src={this.state.previewFrameSrc}
                    frameBorder="0"
                  >
                  </PreviewFrame>
                </div>
              </div>
            </div>
          </Content>

          <Tools className="container">
            {this.renderTools()}
          </Tools>
        </div>

        <Footer className="footer">
          <FooterContainer className="container">
            <div className="columns">
              <div className="column">
                First column
              </div>
              <div className="column">
                Second column
              </div>
              <div className="column">
                <h3>Tools & Technologies</h3>
              </div>
              <div className="column">
                <p>
                  <a href="http://jgthms.com"><strong>JSMeasure</strong></a>
                </p>
                <p>
                  The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                </p>
                <p>
                  The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
              </div>
            </div>
          </FooterContainer>
        </Footer>
      </div>
    )
  }
}
