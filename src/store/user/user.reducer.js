import { USER_ACTION_TYPES } from "./user.types"
const INITIAL_STATE = {
    currentUser: null
}
export const userReducer = (state = INITIAL_STATE,action) => {
    // console.log('Dispatch')
    // console.log(action)
    const {type, payload} = action
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state, //give me all the same values in the previous state objects that we had and everything after comma will be the one that we will overwrite
                currentUser: payload
            }
        
        default:
            return state; //This is a case when root reducer knows that this reducer has not been changed

    }

}