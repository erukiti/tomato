'use strict'

import React from 'react'
import { connect } from 'react-redux'

import act from './action/pomodoro_timer'
import PomodoroTimer from './component/pomodoro_timer'

class App extends React.Component {
    componentDidMount() {
        setInterval(() => {
            this.props.dispatch(act.timerInterval())
        }, 200)
    }

    render() {
        const { dispatch, pomodoroTimer } = this.props
        return <div>
            <PomodoroTimer pomodoroTimer={pomodoroTimer} onStartClick={() => dispatch(act.timerStart())} />
        </div>
    }
}

function selector(state) {
    return {
        pomodoroTimer: state
    }
}

export default connect(selector)(App)
