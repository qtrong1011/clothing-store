//our own logger to see with better state changing with Redux

const loggerMiddleware = (store) => (next) => (action) =>{
    if(!action.type){
        return next(action)
    }
    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentState: ', store.getState())

    next(action)
    console.log('next state: ',store.getState())
}

export default loggerMiddleware
