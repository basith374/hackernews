import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Item from "./Components/Item";
import News from "./Components/News";
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user/:id">
          <Profile />
        </Route>
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/">
          <News />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
