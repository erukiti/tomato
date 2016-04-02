'use strict'

import React from 'react'

import Timer from './timer'
import act from '../action/pomodoro_timer'

class PomodoroTimer extends React.Component {
    render() {
        return <div>
            <Timer time={this.props.pomodoroTimer.current} />
            <button onClick={e => this.props.onStartClick(e)}>Start</button>
        </div>
    }
}

export default PomodoroTimer
