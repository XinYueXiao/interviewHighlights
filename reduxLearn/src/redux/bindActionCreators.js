export default function bindActionCreators(actionCreator, dispatch) {
    //函数actionCreator=>> let add = () => {   return { type: ADD_BTN } }
    if (typeof actionCreator == 'function') {
        return bindActionCreator(actionCreator, dispatch)
    }
    //actionCreator=对象action时,依次处理对象抛出处理后的对象
    let boundActionCreators = {}
    for (let key in actionCreator) {
        boundActionCreators[key] = bindActionCreator(actionCreator[key], dispatch)
    }
    return boundActionCreators
}
//统一处理store.dispatch({type:'ADD_BTN'})
function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args))
}