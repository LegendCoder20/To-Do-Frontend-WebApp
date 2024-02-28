import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import {getGoals, reset} from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {goals, isLoading, isError, message} = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    // console.log("User object:", user);
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset()); // If you want to do Something when the Component Unmounts then you just need to return from the UseEffects
    };
  }, [user, navigate, isError, message, dispatch]); // it will take Function and Dependencies Array

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}></GoalItem>
            ))}
          </div>
        ) : (
          <h3>You have not set Any Goals </h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
