import act from './actions'

const initialState = {
    isWorking: true,
    start: 0,
    current: 25 * 1000,
    timer: 25 * 1000,
    countWorking: 25 * 1000,
    countInterval: 5 * 1000,
    pomodoro: 0
}

export default function todoApp(state = initialState, action) {
    switch (action.type) {
        case act.TIMER_START:
            {
                const newState = Object.assign({}, state)
                newState.start = action.now
                newState.current = state.timer
                return newState
            }
        case act.TIMER_INTERVAL:
            {
                const newState = Object.assign({}, state)
                if (state.start === 0) {
                    newState.current = state.timer
                    return newState
                }

                const remain = state.timer - (action.now - state.start)
                if (remain > 0) {
                    newState.current = remain
                    return newState
                }

                if (state.isWorking) {
                    newState.isWorking = false
                    newState.start = 0
                    newState.current = state.countInterval
                    newState.timer = state.countInterval
                    return newState
                } else {
                    newState.isWorking = true
                    newState.start = 0
                    newState.current = state.countWorking
                    newState.timer = state.countWorking
                    newState.pomodoro = state.pomodoro + 1
                    return newState
                }
            }
        case act.TIMER_STOP:
            {
                const newState = Object.assign({}, state)
                newState.start = 0
                newState.timer = newState.current
                return newState
            }
        case act.RESET:
            {
                return initialState
            }

        default:
            return state
    }
}
