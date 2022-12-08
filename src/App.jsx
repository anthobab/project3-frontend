import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Conversations from './pages/Conversations';
import NavMain from './components/Nav/NavMain';
import PrivateRoute from './components/ProtectedRoute/PrivateRoute';
import LoggedOut from './components/LoggedOut/LoggedOut';
import MapZone from './components/MapZone/MapZone';
import MyServices from './pages/MyServices';
import OneConversation from './pages/OneConversation';

function App() {
  const coordinate = {
    latitude: 48.8525,
    longitude: 2.388,
  };
  const coordinates = [48.8525, 2.388];
  // console.log(coordinate);
  return (
    <div className="App">
      <NavMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapZone coordinates={coordinates} />} />
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* All routes after the PrivateRoute require the user to be loggedIn */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/myservices" element={<MyServices />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/conversations/:id" element={<OneConversation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
