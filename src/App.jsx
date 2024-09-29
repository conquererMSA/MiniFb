import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import PrivateRoute from './Common/PrivateRoute';
// import Header from './Common/Header';

function App() {

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute/>}>
        {/* <Route element={<Header/>}/> */}
        <Route element={<HomePage />} path="/" exact />
        <Route element={<ProfilePage />} path="/me" />
        </Route>
        
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  )
}

export default App
