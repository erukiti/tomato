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

    it('TIMER_INTERVAL over (Working)', function() {
        const initState = {
            isWorking: true,
            start: 300,
            current: 499,
            timer: 200,
            countWorking: 200,
            countInterval: 50,
            pomodoro: 0
        }
        const obj = Object.assign({}, initState)
        const newState = todoApp(obj, { type: act.TIMER_INTERVAL, now: 500 })
        assert.deepEqual(initState, obj)
        assert(newState.isWorking === false)
        assert(newState.start === 0)
        assert(newState.current === 50)
        assert(newState.timer === 50)
        assert(newState.pomodoro === 0)
    })

    it('TIMER_INTERVAL over (Interval)', function() {
        const initState = {
            isWorking: false,
            start: 500,
            current: 549,
            timer: 50,
            countWorking: 200,
            countInterval: 50,
            pomodoro: 0
        }
        const obj = Object.assign({}, initState)
        const newState = todoApp(obj, { type: act.TIMER_INTERVAL, now: 550 })
        assert.deepEqual(initState, obj)
        assert(newState.isWorking === true)
        assert(newState.start === 0)
        assert(newState.current === 200)
        assert(newState.timer === 200)
        assert(newState.pomodoro === 1)
    })

})
