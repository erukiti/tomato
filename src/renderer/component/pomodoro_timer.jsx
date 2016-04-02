'use strict'

import React from 'react'
import { connect } from 'react-redux'

import Timer from './timer'
import Times from './times'
import IsRunning from './is_running'
import act from '../action/pomodoro_timer'

class PomodoroTimer extends React.Component {
    render() {
        return <div>
            <Times times={this.props.times} />
            <Timer time={this.props.time} />
            <IsRunning isRunning={this.props.isRunning} isWorking={this.props.isWorking} />
            <button onClick={e => this.props.onStart(e)}>スタート</button>
            <button onClick={e => this.props.onStop(e)}>一時停止</button>
            <button onClick={e => this.props.onReset(e)}>リセット</button>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        times: state.pomodoro,
        time: state.current,
        isRunning: state.start !== 0,
        isWorking: state.isWorking
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => {
            dispatch(act.timerStart())
        },
        onStop: () => {
            dispatch(act.timerStop())
        },
        onReset: () => {
            dispatch(act.reset())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PomodoroTimer)
