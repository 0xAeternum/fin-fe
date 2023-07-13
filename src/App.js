import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Stocks from './screens/Stocks'
import Header from './components/Header'
import PageNotFound from './screens/PageNotFound';
import StockInfo from './screens/StockInfo';
import Profile from './screens/Profile';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Home />}></Route>

            <Route path='login' element={<Login />}></Route>

            <Route path='stocks' element={<Stocks />}></Route>

            <Route path='profile' element={<Profile />}></Route>

            <Route path='stocks/:stockName' element={<StockInfo />}></Route>

            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
