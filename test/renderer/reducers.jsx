import todoApp from '../../src/renderer/reducers'
import act from '../../src/renderer/actions'

describe('reducers', function() {
    it('TIMER_START', function() {
        const initState = {
            start: 0,
            current: 1,
            timer: 2
        }
        const obj = Object.assign({}, initState)
        const newState = todoApp(obj, { type: act.TIMER_START, now: 10 })
        assert.deepEqual(initState, obj)
        assert(newState.start === 10)
        assert(newState.current === 2)
        assert(newState.timer === 2)
    })

    it('TIMER_INTERVAL not started', function() {
        const initState = {
            start: 0,
            current: 1,
            timer: 2
        }
        const obj = Object.assign({}, initState)
        const newState = todoApp(obj, { type: act.TIMER_INTERVAL, now: 10 })
        assert.deepEqual(initState, obj)
        assert(newState.start === 0)
        assert(newState.current === 2)
        assert(newState.timer === 2)
    })

    it('TIMER_INTERVAL started', function() {
        const initState = {
            start: 9,
            current: 1,
            timer: 2
        }
        const obj = Object.assign({}, initState)
        const newState = todoApp(obj, { type: act.TIMER_INTERVAL, now: 10 })
        assert.deepEqual(initState, obj)
        assert(newState.start === 9)
        assert(newState.current === 1)
        assert(newState.timer === 2)
    })

    it('TIMER_INTERVAL over', function() {
        const initState = {
            start: 8,
            current: 1,
            timer: 2
        }
        const obj = Object.assign({}, initState)
        const newState = todoApp(obj, { type: act.TIMER_INTERVAL, now: 10 })
        assert.deepEqual(initState, obj)
        assert(newState.start === 8)
        assert(newState.current === 0)
        assert(newState.timer === 2)

    })

})
