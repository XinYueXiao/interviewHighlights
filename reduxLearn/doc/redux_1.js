const initState = {
    title: {
        color: 'red',
        text: '标题'
    },
    content: {
        color: 'pink',
        text: '内容'
    }
}
const TITLE_COLOR = 'TITLE_COLOR'
const TITLE_TEXT = 'TITLE_TEXT'
const CONTENT_COLOR = 'CONTENT_COLOR'
const CONTENT_TEXT = 'CONTENT_TEXT'

function reducer(state = initState, action) {
    switch (action.type) {
        case TITLE_COLOR:
            return { ...state, title: { ...state.title, color: action.color } }
        case TITLE_TEXT:
            state.title.text = action.text
            return { ...state, title: { ...state.title, text: action.text } }
        case CONTENT_COLOR:
            state.content.color = action.color
            return { ...state, content: { ...state.content, color: action.color } }
        case CONTENT_TEXT:
            return { ...state, content: { ...state.content, text: action.text } }
        default:
            return state
    }
}

function createStore(reducer) {
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
let store = createStore(reducer)
function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}
function renderTitle(title) {
    let titleEle = document.getElementById('title')
    titleEle.innerHTML = title.text
    titleEle.style.color = title.color
}
function renderContent(content) {
    let contentEle = document.getElementById('content')
    contentEle.innerHTML = content.text
    contentEle.style.color = content.color
}
function render() {
    renderApp(store.getState())
}
render()
store.subscribe(render)

setTimeout(() => {
    store.dispatch({ type: TITLE_COLOR, color: 'blue' })
    store.subscribe(render)()//取消订阅
    store.dispatch({ type: TITLE_TEXT, text: '修改标题了' })
}, 1000);

