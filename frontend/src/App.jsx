import LandingBody from './components/landingPage/LandingBody'
import HomeBody from './components/homePage/HomeBody'
import ZoomedMain from './components/zoomedPage/ZoomedMain'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import { ForgottenPassword,forgottenUsername } from './components/authentication/Forgotten';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingBody/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/forgottenPassword' element={<ForgottenPassword/>}/>
        <Route path='/forgottenUsername' element={<forgottenUsername/>}/>
        <Route exact path='/Home' element={<HomeBody/>}/>
        <Route exact path='/ZoomedMain' element={<ZoomedMain/>}/>
      </Routes>
    </div> 
  )
}

export default App
