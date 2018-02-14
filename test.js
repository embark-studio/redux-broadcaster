const Broadcaster = require("./index")

const mockStore = {
  actions: [],
  dispatch: function(action){
    this.actions.push(action)
  }
}
let redispatchedActions = []
const mockReactor = (action)=>{
  redispatchedActions.push(action)
  store.dispatch(action)
}
const store = Broadcaster(mockStore, mockReactor)

store.dispatch({
  type: "SAY",
  payload: "HELLO"
})

store.dispatch({
  type: "SAY",
  payload: "GOODBYE"
})

let errors = []
test = "Broadcaster should send local actions to store"
if(mockStore.actions.length < 2){
  errors.push(test)
  console.log(`${test} - failed`)
}else{
  console.log(`${test} - passed`)
}

test = "Broadcaster should properly filter actions that have previously dispatched on store"
if(mockStore.actions.length > 2){
  errors.push(test)
  console.log(`${test} - failed`)
}else{
  console.log(`${test} - passed`)
}

test = "Broadcaster should redispatch actions to remote dispatcher (generally socket broadcast)"
if(redispatchedActions.length !== 2){
  errors.push(test)
  console.log(`${test} - failed`)
}else{
  console.log(`${test} - passed`)
}

if(errors.length !== 0){
  throw errors.join(". ")
}else{
  console.log("ALL TESTS PASSED")
}