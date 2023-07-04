import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route/>
        </Switch>
      </Router>
    </Provider>
    </>
  )
}

export default App
