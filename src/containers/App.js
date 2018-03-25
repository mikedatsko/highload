import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../node_modules/bulma/css/bulma.css'
import '../icons.css'
import '../fireworks.css'
import '../index.css'

import { setVisibilityFilter } from '../actions'

import {
  Footer,
  FooterContainer,
  PreviewFrame,
  Content,
  ParticipantList
} from '../components'

import NavBar from './NavBar'

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

class App extends Component {
  constructor(props) {
    super(props)

    // ${hostUrl ? "?host_url=${hostUrl}" : ''}

    this.state = {
      isFirstClick: true,
      isFinished: false,
      isStarted: false,
      previewFrameSrc: '',
      iterations: 1,
      iteration: 1,
      add_url: '',
      add_title: '',
      participantList: []
    }

    window.addEventListener('message', event => {
      const message = event.data

      if (message === 'FRAME_LOADED') {
        const result = new Date().getTime() - timer.start
        const participantList = this.state.participantList

        for (let i = 0; i < participantList.length; i++) {
          const participant = participantList[i]

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

              const participantNext = participantList[i + 1]

              if (participantNext) {
                participantNext.isSelected = true
              }

              this.setState({participantList: participantList, iteration: 1})

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
      const participantList = this.state
        .participantList
        .map(participant => {
          participant.time = 0
          return participant
        })
        .sort((a, b) => a.order > b.order)

      participantList[0].isSelected = true
      this.setState({participantList: participantList, isFinished: false})
    }

    timer.start = new Date().getTime()

    const participantSelected = this.state.participantList.filter(participant => participant.isSelected)[0]

    if (!participantSelected) {
      this.finishTest()
      return
    }

    this.setState({
      isStarted: true,
      previewFrameSrc: participantSelected.url
    })

    sendMessage()
  }

  finishTest() {
    const participantList = this.state
      .participantList
      .map(participant => {
        participant.isSelected = false
        return participant
      })
      .sort((a, b) => a.time > b.time)

    this.setState({
      participantList: participantList,
      isStarted: false,
      isFinished: true,
      previewFrameSrc: ''
    })
  }

  onChangeInput(propName, value) {
    this.setState({[propName]: value})
  }

  addTest() {
    const participantList = this.state.participantList
    const orderLast = Math.max.apply(Math, participantList.map(participant => participant.order))
    participantList.push({
      title: this.state.add_title,
      url: `${this.state.add_url}${hostUrl ? `?host_url=${hostUrl}` : ''}`,
      progress: 0,
      time: 0,
      times: [],
      isSelected: false,
      order: orderLast + 1
    })

    this.setState({
      participantList: participantList,
      add_title: '',
      add_url: ''
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <NavBar
            add_title={this.state.add_title}
            add_url={this.state.add_url}
            isStarted={this.state.isStarted}
            onChangeInput={(propName, value) => this.onChangeInput(propName, value)}
            addTest={() => this.addTest()}
          />

          <Content className="content">
            <div className="field is-grouped">
              <div className="control">
                <a className="button is-white">
                  Number of iterations
                </a>
              </div>

              <div className="control">
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
              </div>

              <div className="control">
                <a
                  className={'button is-link' + (this.state.isStarted ? ' is-loading' : '')}
                  onClick={() => this.startTest(true)}
                >
                  Start
                </a>
              </div>
            </div>

            {this.state.isStarted
              ? <PreviewFrame
                id="preview_frame"
                title="previewFrame"
                src={this.state.previewFrameSrc}
                frameBorder="0"
              >
              </PreviewFrame>
              : ''
            }

            <table className="table">
              <thead>
              <tr>
                <th width="50">#</th>
                <th>Title</th>
                <th width="100">Time, ms</th>
              </tr>
              </thead>
              <ParticipantList participantList={this.state.participantList} />
            </table>
          </Content>
        </div>

        <Footer className="footer">
          <FooterContainer className="container">
            <div className="columns">
              <div className="column">

              </div>
              <div className="column">

              </div>
              <div className="column">

              </div>
              <div className="column">
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

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
