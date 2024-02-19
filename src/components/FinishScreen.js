import { useQuiz } from "../contexts/Context";

function FinishScreen() {
  const { maxPoint, points, dispatch } = useQuiz();
  return (
    <>
      <div className="result">
        You Sccored {points} out of {maxPoint} ({" "}
        {Math.ceil((points / maxPoint) * 100)} %)
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
