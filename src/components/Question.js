import { useQuiz } from "../contexts/Context";

function Question() {
  const { index, numQuestions, questions, dispatch, answer, points, maxPoint } =
    useQuiz();
  return (
    <div>
      <progress max={numQuestions} value={index} />

      <div className="progress">
        <h3>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </h3>
        <h3>
          {points} / {maxPoint}
        </h3>
      </div>

      <h4>{questions[index].question}</h4>
      <div className="options">
        {questions[index].options.map((q, i) => {
          return (
            <button
              className={`btn btn-option ${answer === i && "answer"} ${
                answer === null
                  ? ""
                  : questions[index].correctOption === i
                  ? "correct"
                  : "wrong"
              }`}
              onClick={() => dispatch({ type: "answer", payload: i })}
              disabled={answer !== null}
              key={q}
            >
              {q}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
