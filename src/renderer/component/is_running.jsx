'use strict'

import React from 'react'

class IsRunning extends React.Component {
    render() {
        let mode
        if (this.props.isRunning) {
            mode = this.props.isWorking ? '作業中' : '休憩中'
        } else {
            mode = ''
        }

        return <span>{mode}</span>
    }
}

export default IsRunning
