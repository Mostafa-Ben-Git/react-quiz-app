import { useQuiz } from "../contexts/Context";

function NextBtn() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "end" })}>
        Finish
      </button>
    );
  }
}

export default NextBtn;
