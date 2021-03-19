import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Characters from './characters';
import Locations from './locations';
import Episodes from './episodes'

function App() {
  return (
    <Router>
      <div className="d-flex justify-content-center mt-2">
        <Link to="/characters" className="btn btn-primary">
          Characters
          </Link>
        <Link to="/locations" className="btn btn-primary ml-2">
          Locations
          </Link>
        <Link to="/episodes" className="btn btn-primary ml-2">
          Episodes
        </Link>
      </div>
      <Switch>
        <Route path="/characters">
          <Characters />
        </Route>
        <Route path="/locations">
          <Locations />
        </Route>
        <Route path="/episodes">
          <Episodes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
