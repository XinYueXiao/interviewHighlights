import { createStore } from './redux'
let counterVal = document.getElementById('counterVal')
let addBtn = document.getElementById('addBtn')
let minusBtn = document.getElementById('minusBtn')
const ADD_BTN = 'ADD_BTN'
const MINUS_BTN = 'MINUS_BTN'

function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case ADD_BTN:
            return { number: state.number + 1 }
        case MINUS_BTN:
            return { number: state.number - 1 }
        default:
            return state

    }
}
let store = createStore(reducer)
function render() {
    counterVal.innerHTML = store.getState().number
}
store.subscribe(render)
addBtn.addEventListener('click', () => store.dispatch({
    type: ADD_BTN
}))
minusBtn.addEventListener('click', () => store.dispatch({
    type: MINUS_BTN
}))