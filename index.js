module.exports = (_store, _reDispatcher)=>{
  const actionIDs = [];
  const store = _store;
  const reDispatcher = _reDispatcher;
  const uuid = (a)=>{
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)
  }

  const dispatch = (action)=>{
    if(!action.id){
      action.id = uuid()
    }
  
    if(!actionIDs.includes(action.id)){
      actionIDs.push(action.id)
      store.dispatch(action)
      reDispatcher(action)
    }
  }

  let exp = {
    dispatch
  }

  Object.keys(store).forEach((key)=>{
    if(typeof store[key] === "function" && key !== "dispatch"){
      exp[key] = function(){
        return store[key](arguments)
      }
    }
  })

  return exp;
}
