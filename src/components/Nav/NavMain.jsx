import { NavLink } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import './NavMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faMap, faUser, faBellConcierge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavMain = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/">
        <FontAwesomeIcon icon={faBolt} style />
      </NavLink>
      <NavLink to="/map">
        <FontAwesomeIcon icon={faMap} />
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/myservices">
            <FontAwesomeIcon icon={faBellConcierge} />
          </NavLink>
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          {/* <NavLink onClick={removeUser}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </NavLink> */}
          {/* <button onClick={removeUser}>Log-Out</button> */}
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signin">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </NavLink>
          {/* <NavLink to="/signin">Log in</NavLink>
          <NavLink to="/signup">Sign Up</NavLink> */}
        </>
      )}
    </nav>
  );
};

export default NavMain;
