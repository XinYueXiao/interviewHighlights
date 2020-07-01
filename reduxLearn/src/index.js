import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators } from './redux'
const ADD_BTN = 'ADD_BTN'
const MINUS_BTN = 'MINUS_BTN'

function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case ADD_BTN:
            return { number: state.number + action.payload }
        case MINUS_BTN:
            return { number: state.number - 1 }
        default:
            return state

    }
}
let store = createStore(reducer)
let add = () => { return { type: ADD_BTN } }
let minus = () => { return { type: MINUS_BTN } }
let actions = {
    add(number) {
        return { type: ADD_BTN, payload: number };
    },
    minus() {
        return { type: MINUS_BTN };
    }
}
actions = bindActionCreators(actions, store.dispatch)
let minusFunc = bindActionCreators(minus, store.dispatch)
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: store.getState().number
        };
    }
    componentDidMount() {
        //每次this.state改变会重新渲染
        this.unsubscribe = store.subscribe(() => this.setState({ number: store.getState().number }))
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => actions.add(5)}> + </button>
                <button onClick={minusFunc}> - </button>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById('root'))
