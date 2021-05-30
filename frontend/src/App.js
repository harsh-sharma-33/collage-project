import { Route, Switch } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen"
import ResultScreen from "./screens/ResultScreen"
import UserScreen from "./screens/UserScreen"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"
import MyProfile from "./screens/MyProfile"
import ProtectedRoute from "./components/ProtectedRoute"
import "./styles/app.scss"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/results" component={ResultScreen} />
        <Route exact path="/user/:id" component={UserScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <Route path="*" component={() => <h1>not found</h1>} />
      </Switch>
    </div>
  )
}

export default App
