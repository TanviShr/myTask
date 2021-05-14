import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  
      return (
        <Router>
          <div>
           <Route path="/" exact component={Signup}/>
           <Route path="/Dashboard"  component={Dashboard}/>
           </div>
        </Router>
      );

}

export default App;
