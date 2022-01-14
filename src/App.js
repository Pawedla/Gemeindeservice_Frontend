
import 'bootstrap/dist/css/bootstrap.css';
//import '@fortawesome/fontawesome-free/js/all.js';
import Header from './Header';
import Overview from './Overview';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EmployeeRouter from './EmployeeRouter';
import MeetingRouter from './MeetingRouter';
import DecisionRouter from './DecisionRouter';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="employees/*" element={<EmployeeRouter />} />
          <Route path="meetings/*" element={<MeetingRouter />} />
          <Route path="decisions/*" element={<DecisionRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
