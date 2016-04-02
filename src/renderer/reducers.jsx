import act from './actions'

const initialState = {
    isWorking: true,
    start: 0,
    current: 25 * 60 * 1000,
    timer: 25 * 60 * 1000,
    countWorking: 25 * 60 * 1000,
    countInterval: 5 * 60 * 1000,
    pomodoro: 0
}

export default function todoApp(state = initialState, action) {
    switch (action.type) {
        case act.TIMER_START:
            return {
                start: action.now,
                current: state.timer,
                timer: state.timer
            }
        case act.TIMER_INTERVAL:
            if (state.start === 0) {
                return {
                    start: state.start,
                    current: state.timer,
                    timer: state.timer
                }
            } else {
                const remain = state.timer - (action.now - state.start)
                if (remain > 0) {
                    return {
                        start: state.start,
                        current: remain,
                        timer: state.timer
                    }
                } else {
                    return {
                        start: 0,
                        current: state.timer,
                        timer: state.timer
                    }
                }
            }
        default:
            return state
    }
}
