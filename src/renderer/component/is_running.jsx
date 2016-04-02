'use strict'

import React from 'react'

class IsRunning extends React.Component {
    render() {
        return <div>
        {this.props.isRunning ? '動作中': 'ストップ中'}
        </div>
    }
}

export default IsRunning
