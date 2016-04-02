'use strict'

import React from 'react'

class Times extends React.Component {
    render() {
        return <div>
        {(() => {
            let s = []
            for (let i = 0; i < this.props.times; i++) {
                s.push(<img src="../icon.png" width="24px" height="24px" />)
            }
            if (this.props.times > 4) {
                s.push(<span>そろそろ休憩はいかが？</span>)
            }
            return s
        })()}
        </div>

    }
}

export default Times
