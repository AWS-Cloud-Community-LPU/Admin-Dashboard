import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../src/Context/AuthContext";
import PrivateRoute from './Pages/PrivateRoute';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Events from './Pages/Events/Events';
import Members from './Pages/Members/Members';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import AddMember from './Pages/AddMember/AddMember';
import UpdateBlog from './Pages/UpdateBlog/UpdateBlog';
import UpdateEvent from './Pages/UpdateEvent/UpdateEvent';
import UpdateMember from './Pages/UpdateMember/UpdateMember';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      
      <Router>

      <Navbar/>

      <AuthProvider>
      <Switch>

        <Route exact path="/signup">
          <Signup/>
        </Route>

        <Route exact path="/login">
          <Login/>
        </Route>

        <PrivateRoute exact path="/" component={ Home }/>
        <PrivateRoute exact path="/create/blog" component={ CreateBlog }/>
        <PrivateRoute exact path="/update/blog/:id" component={ UpdateBlog }/>

        <PrivateRoute exact path="/events" component={ Events }/>
        <PrivateRoute exact path="/create/event" component={ CreateEvent }/>
        <PrivateRoute exact path="/update/event/:id" component={ UpdateEvent }/>

        <PrivateRoute exact path="/members" component={ Members }/>
        <PrivateRoute exact path="/add/members" component={ AddMember }/>
        <PrivateRoute exact path="/update/member/:id" component={ UpdateMember }/>

      </Switch>
      </AuthProvider>
      {/* <Footer/> */}

      </Router>

    </div>
  );
}

export default App;
