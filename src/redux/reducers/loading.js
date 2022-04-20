import { ACTION } from 'consts'

const initialState = false

var loading = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.LOADING: {
            return action.data
        }
        default:
            return state
    }
}

export default loading