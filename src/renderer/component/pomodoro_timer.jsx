'use strict'

import React from 'react'
import { connect } from 'react-redux'

import Timer from './timer'
import IsRunning from './is_running'
import act from '../action/pomodoro_timer'

class PomodoroTimer extends React.Component {
    render() {
        return <div>
            <Timer time={this.props.time} />
            <IsRunning isRunning={this.props.isRunning} />
            <button onClick={e => this.props.onStart(e)}>Start</button>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        time: state.current,
        isRunning: state.start !== 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => {
            dispatch(act.timerStart())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PomodoroTimer)
