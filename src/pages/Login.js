import {useState, useEffect} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux"; // useSelector is used to Select Something from the State so if we want to bring in User or is Loading is Error we use Error ////////// If we want to Dispatch a function like Register a async thunk Function  or the reset in our Reducer  We wwould use this Dispatch
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {login, reset} from "../features/auth/authSlice"; //  This is Gonna Come in from the Slice Itself
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  // Destructuring
  const {email, password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      console.log("Navigating to /");
      navigate("/");
    }
    dispatch(reset()); // Its in the auth.Slice // Its Exported from there
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })); // We are setting the Form Data to the Object
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      // Here we will make Object with no Name just A Object
      email,
      password,
    };
    // And then we dispatch the Login Function
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt></FaSignInAlt>Login
        </h1>
        <p>Login and Start Setting Goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email} // Value is gonna be the name from our State Remember We Destructured it
              placeholder="Enter your E-mail"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password} // Value is gonna be the name from our State Remember We Destructured it
              placeholder="Enter Password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
