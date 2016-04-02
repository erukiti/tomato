'use strict'

import act from '../actions'

export default {
    timerStart: () => {
        return {
            type: act.TIMER_START,
            now: new Date().getTime()
        }
    },
    timerInterval: () => {
        return {
            type: act.TIMER_INTERVAL,
            now: new Date().getTime()
        }
    },
    timerStop: () => {
        return {
            type: act.TIMER_STOP
        }
    },
    reset: () => {
        return {
            type: act.RESET
        }
    }
}
