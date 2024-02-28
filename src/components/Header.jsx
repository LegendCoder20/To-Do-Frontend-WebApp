import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"; // fa FONT AWESOME Library
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout, reset} from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {user} = useSelector((state) => state.auth);

  // Either Write Like Below Code or Write like Above Code [ mostly for one statement Above Code is Preffered ]

  const {user} = useSelector((state) => {
    return state.auth;
  });

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">GoalSetter</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt></FaSignOutAlt>Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt></FaSignInAlt>Login
                </Link>
              </li>

              <li>
                <Link to="/register">
                  <FaUser></FaUser>Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
