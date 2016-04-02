'use strict'

import React from 'react'
import { connect } from 'react-redux'

import act from '../action/pomodoro_timer'
import PomodoroTimer from './pomodoro_timer'

class App extends React.Component {
    componentDidMount() {
        setInterval(() => {
            this.props.onInterval()
        }, 200)
    }

    render() {
        const { onStart, pomodoroTimer } = this.props
        return <div>
            <PomodoroTimer />
        </div>
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        onInterval: () => {
            dispatch(act.timerInterval())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
