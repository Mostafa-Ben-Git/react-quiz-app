import { useQuiz } from "../contexts/Context";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcom to The Quiz !!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "startQuiz" });
        }}
      >
        Let's get Started
      </button>
    </div>
  );
}

export default StartScreen;
