import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"; // useSelector is used to Select Something from the State so if we want to bring in User or is Loading is Error we use Error ////////// If we want to Dispatch a function like Register a async thunk Function  or the reset in our Reducer  We wwould use this Dispatch
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FaUser} from "react-icons/fa";
import {register, reset} from "../features/auth/authSlice"; //  This is Gonna Come in from the Slice Itself
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Destructuring
  const {name, email, number, password, cpassword} = formData;
  // We are going to Destructure the Form Data

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
  }, [user, isError, isSuccess, message, navigate, dispatch]); // It will take a Bunch of dependencies   // It will Fireoff User Effect if any of this Changes

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })); // We are setting the Form Data to the Object
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== cpassword) {
      toast.error("Password do not Match");
    } else {
      // Now Remember Register takes the User Data
      const userData = {
        name,
        number,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser></FaUser>Register
        </h1>
        <p>Please Create a Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name} // Value is gonna be the name from our State Remember We Destructured it
              placeholder="Enter your Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              value={number} // Value is gonna be the name from our State Remember We Destructured it
              placeholder="Enter your Number"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={cpassword} // Value is gonna be the name from our State Remember We Destructured it
              placeholder="Confirm Password"
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

export default Register;
