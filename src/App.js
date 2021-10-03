import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Events from './Pages/Events/Events';
import Members from './Pages/Members/Members';

function App() {
  return (
    <div className="App">
      
      <Router>

      <Navbar/>
      <Switch>

        {/* <Route to="/">
          <Redirect to="/blogs" />
        </Route> */}

        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/events">
          <Events/>
        </Route>

        <Route exact path="/members">
          <Members/>
        </Route>

      </Switch>
      {/* <Footer/> */}

      </Router>

    </div>
  );
}

export default App;
