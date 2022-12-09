import { NavLink } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import './NavMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faMap, faUserAstronaut, faSquarePlus, faUser, faComments } from '@fortawesome/free-solid-svg-icons';

const NavMain = () => {
  const { isLoggedIn } = useAuth();

  let activeStyle = {
    color: '#D62828',
  };

  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <FontAwesomeIcon icon={faBolt} style />
      </NavLink>
      <NavLink to="/map" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <FontAwesomeIcon icon={faMap} />
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/services/myServices" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </NavLink>
          <NavLink to="/conversations" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <FontAwesomeIcon icon={faComments} />
          </NavLink>
          <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <FontAwesomeIcon icon={faUserAstronaut} />
          </NavLink>
          {/* <NavLink onClick={removeUser}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </NavLink> */}
          {/* <button onClick={removeUser}>Log-Out</button> */}
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signin" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          {/* <NavLink to="/signin">Log in</NavLink>
          <NavLink to="/signup">Sign Up</NavLink> */}
        </>
      )}
    </nav>
  );
};

export default NavMain;
