import './App.css';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import './components/ListEmployeeComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <div className='App'>
      <HeaderComponent />
      <div className='container'>
        <Routes>
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/add-employee" element={<AddEmployeeComponent />}></Route>
          <Route path="/edit-employee/:id" element={<AddEmployeeComponent />}></Route>
        </Routes>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
