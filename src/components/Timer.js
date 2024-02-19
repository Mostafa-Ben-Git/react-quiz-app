import { useEffect } from "react";
import { useQuiz } from "../contexts/Context";

function Timer() {
  const { timer, dispatch } = useQuiz();
  const min = Math.round(timer / 60);
  const sec = timer % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
