import { Routes, Route } from 'react-router-dom';
import NavMain from './components/Nav/NavMain';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/ProtectedRoute/PrivateRoute';
import LoggedOut from './components/LoggedOut/LoggedOut';
import MapZone from './components/MapZone/MapZone';
import 'leaflet/dist/leaflet.css';
import MyServices from './pages/MyServices';
import Conversations from './pages/Conversations/Conversations';

function App() {
  const coordinate = {
    latitude: 48.8525,
    longitude: 2.388,
  };
  console.log(coordinate);
  return (
    <div className="App">
      <NavMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapZone coordinate={coordinate} />} />
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* All routes after the PrivateRoute require the user to be loggedIn */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/myservices" element={<MyServices />} />
          <Route path="/conversations" element={<Conversations />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
