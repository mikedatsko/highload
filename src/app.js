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
  Content,
  Tools,
  ToolLogo,
  ToolLogoImage,
  Url,
  Logo
} from './app.styles'

const hostUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

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
      iterations: 1,
      iteration: 1,
      participants: [
        {
          title: 'ES5',
          // url: 'http://localhost:8000',
          url: `http://jsmeasure-es5.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 0
        },
        {
          title: 'ES6',
          // url: 'http://localhost:8001',
          url: `http://jsmeasure-es6.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 1
        },
        {
          title: 'jQuery',
          // url: 'http://localhost:8002',
          url: `http://jsmeasure-jquery.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 2
        },
        {
          title: 'Backbone',
          // url: 'http://localhost:8003',
          url: `http://jsmeasure-backbone.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 3
        },
        {
          title: 'Aurelia',
          // url: 'http://localhost:7000',
          // url: 'http://localhost:9000#10000',
          url: `http://jsmeasure-aurelia.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 4
        },
        {
          title: 'Angular',
          url: `http://jsmeasure-angular.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          // url: 'http://localhost:9000#10000',
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 5
        },
        {
          title: 'Angular 2',
          url: `http://jsmeasure-angular2.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          // url: 'http://localhost:9000#10000',
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 6
        },
        {
          title: 'React',
          url: `http://jsmeasure-react.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          // url: 'http://localhost:9000#10000',
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 7
        },
        {
          title: 'React (memory game)',
          url: `http://jsmeasure-react-memory.surge.sh${hostUrl ? `?host_url=${hostUrl}` : ''}`,
          // url: 'http://localhost:9000#10000',
          progress: 0,
          time: 0,
          times: [],
          isSelected: false,
          order: 8
        }
      ],
      add_url: '',
      add_title: ''
    }

    window.addEventListener('message', event => {
      const message = event.data

      // console.log('message', message)

      if (message === 'FRAME_LOADED') {
        const result = new Date().getTime() - timer.start
        const participants = this.state.participants

        for (let i = 0; i < participants.length; i++) {
          const participant = participants[i]

          if (participant.isSelected) {
            participant.time = result
            participant.times.push(result)
            const iteration = +this.state.iteration
            const iterations = +this.state.iterations

            // console.log(iteration, iterations)

            if (iteration < iterations) {
              this.startTest()
              this.setState({iteration: iteration + 1})
            } else {
              participant.isSelected = false

              const participantNext = participants[i + 1]

              if (participantNext) {
                participantNext.isSelected = true
              }

              this.setState({participants: participants, iteration: 1})

              this.startTest()
              break
            }
          }
        }
      }
    }, false)
  }

  startTest(isNewStart) {
    this.setState({
      isStarted: true,
      previewFrameSrc: ''
    })

    if (isNewStart) {
      // console.log(this.state.iterations)
      const participants = this.state
        .participants
        .map(participant => {
          participant.time = 0
          return participant
        })
        .sort((a, b) => a.order > b.order)

      participants[0].isSelected = true
      this.setState({participants: participants, isFinished: false})
    }

    timer.start = new Date().getTime()

    const participantSelected = this.state.participants.filter(participant => participant.isSelected)[0]

    if (!participantSelected) {
      this.finishTest()
      return
    }

    // console.log('participantSelected', participantSelected)

    this.setState({
      isStarted: true,
      previewFrameSrc: participantSelected.url
    })

    sendMessage()
  }

  finishTest() {
    // console.log(this.state.participants)

    const participants = this.state
      .participants
      .map(participant => {
        participant.isSelected = false
        return participant
      })
      .sort((a, b) => a.time > b.time)

    this.setState({
      participants: participants,
      isStarted: false,
      isFinished: true,
      previewFrameSrc: ''
    })
  }

  onChangeInput(prop, value) {
    this.setState({[prop]: value})
  }

  addTest() {
    const participants = this.state.participants
    const orderLast = Math.max.apply(Math, participants.map(participant => participant.order))
    participants.push({
      title: this.state.add_title,
      url: `${this.state.add_url}${hostUrl ? `?host_url=${hostUrl}` : ''}`,
      progress: 0,
      time: 0,
      times: [],
      isSelected: false,
      order: orderLast + 1
    })

    this.setState({
      participants: participants,
      add_title: '',
      add_url: ''
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
    const participants = this.state.participants
    const maxTime = Math.max.apply(Math, participants.map(participant => participant.time))

    return participants.map((participant, i) => {
      const width = Math.round(participant.time / maxTime * 100)
      const time = participant.times.length
        ? Math.round(participant.times.reduce((a, b) => a + b) / participant.times.length)
        : participant.time

      return (
        <tr key={'participant_' + i} className={participant.isSelected ? 'is-selected' : ''}>
          <th>{i + 1}</th>
          <td className="participant-title">
            {participant.title} <Url href={participant.url} target={'_blank'}>{participant.url}</Url>
            <div className="participant-result" style={{width: `${width}%`}}/>
          </td>
          <td className="has-text-right">{participant.time}ms</td>
        </tr>
      )
    })
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
                <div className="add-form">
                  <div className="field  is-grouped">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Code"
                        value={'window.parent.postMessage(\'FRAME_LOADED\',(new URL(document.location.href)).searchParams.get(\'host_url\') || \'http://jsmeasure.surge.sh\');'}
                        onFocus={e => e.target.select()}
                      />
                    </p>

                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={this.state.add_title}
                        onChange={e => this.onChangeInput('add_title', e.target.value)}
                      />
                    </p>

                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Url"
                        value={this.state.add_url}
                        onChange={e => this.onChangeInput('add_url', e.target.value)}
                      />
                    </p>

                    <p className="control">
                      <a
                        className={'button is-link' + (this.state.isStarted ? ' is-loading' : '')}
                        onClick={() => this.addTest()}
                      >
                        Add
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </NavBarMenu>
          </NavBar>

          <Content className="content">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field is-grouped">
                    <p className="control">
                      <a className="button is-white">
                        Number of iterations
                      </a>
                    </p>

                    <p className="control">
                      <div className="select">
                        <select name="country" onChange={e => this.onChangeInput('iterations', e.target.value)}>
                          <option value="1">1</option>
                          <option value="10">10</option>
                          <option value="100">100</option>
                          <option value="1000">1000</option>
                          <option value="10000">10000</option>
                          <option value="100000">100000</option>
                        </select>
                      </div>
                    </p>

                    <p className="control">
                      <a
                        className={'button is-primary' + (this.state.isStarted ? ' is-loading' : '')}
                        onClick={() => this.startTest(true)}
                      >
                        Start
                      </a>
                    </p>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th width="50">#</th>
                        <th>Title</th>
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
