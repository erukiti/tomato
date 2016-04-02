'use strict'

import React from 'react'

class Timer extends React.Component {
    render() {
        const min = ` ${parseInt(this.props.time / 1000 / 60)}`.substr(-2)
        const sec = `0${parseInt(this.props.time / 1000) % 60}`.substr(-2)
        return <div className="timer">{min}:{sec}</div>
    }
}

export default Timer
