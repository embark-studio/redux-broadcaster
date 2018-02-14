# Redux Broadcaster
### Local and Remote Dispatching
This library is designed to allow developers to dispatch actions automatically dispatching locally then also dispatch a remote action using pusher, firebase, rails sockets, phoenix sockets, or any other type of pub sub infrastructure.

### Remote Broadcast Filtering
The tool further allows you to dispatch all actions from any pub sub network broadcast and automatically filter out actions that have already been dispatched locally.


### Using Redux Broadcaster
```
import Broadcaster from 'broadcaster'
import yourStore from './yourStore'
import yourPubSub from './yourPubSubLib'

const store = Broadcaster(
  createStore(yourStore),
  (action)=>{
    yourPubSub.emit("action", action)
  }
)

yourPubSub.on("action", (action)=>{
  store.dispatch(action)
})
```
