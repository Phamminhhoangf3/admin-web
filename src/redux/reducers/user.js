import { ACTION } from 'consts'
import { isExpired, decodeToken } from 'react-jwt'

const initialState = {}

var user = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.LOGIN: {
            const myDecodedToken = decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
            // const data = jwt_decode(action.data.token)
            // localStorage.setItem('accessToken', action.data.token)
            console.log('action.data.token', action.data.token);
            console.log('myDecodedToken', myDecodedToken);
            return state
        }
        default:
            return state
    }
}

export default user