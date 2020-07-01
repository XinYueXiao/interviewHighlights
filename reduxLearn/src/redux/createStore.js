export default function createStore(reducer) {
    let state;
    let listeners = []
    //派发
    function dispatch(action) {
        state = reducer(state, action)
        //订阅
        listeners.forEach(l => l())
    }
    //订阅，返回一个取消订阅的方法
    function subscribe(listener) {
        listeners.push(listener)
        return function () {
            listeners = listeners.filter(item => item != listener)
        }

    }
    //获取状态
    function getState() {
        return state
    }
    dispatch({ type: "@@TYPE_INIT_STATE" })
    return {
        dispatch,
        getState,
        subscribe
    }
}