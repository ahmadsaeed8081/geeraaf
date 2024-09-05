
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home';
// import Staking from './screens/Staking';

function App() {
  return (
    <div className=''>
     <Routes>
      <Route path='/'  element={<Home/>} />
      {/* <Route path='/staking'  element={<Staking/>} /> */}
     </Routes>
    </div>
  );
}

export default App;
