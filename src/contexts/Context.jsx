import { createContext, useContext, useEffect, useReducer } from "react";

const Context = createContext();

function QuizProvider({ children }) {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    timer: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataArrived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFaild":
        return { ...state, status: "error" };
      case "startQuiz":
        return {
          ...state,
          status: "active",
          timer: state.questions.length * 30,
        };
      case "answer":
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === state.questions[state.index].correctOption
              ? state.points + state.questions[state.index].points
              : state.points,
        };
      case "next":
        return { ...state, index: 1 + state.index, answer: null };
      case "end":
        return { ...state, status: "finish" };
      case "restart":
        return { ...initialState, questions: state.questions, status: "ready" };
      case "tick":
        return {
          ...state,
          timer: state.timer - 1,
          status: state.timer === 0 ? "finish" : state.status,
        };
      default: {
        throw new Error("error");
      }
    }
  }

  const [states, dispatch] = useReducer(reducer, initialState);
  const numQuestions = states.questions.length;
  const maxPoint = states.questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);
  // console.log("render")

  useEffect(() => {
    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataArrived", payload: data }))
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "dataFaild" });
      });
  }, []);

  return (
    <Context.Provider value={{ ...states, numQuestions, maxPoint, dispatch }}>
      {children}
    </Context.Provider>
  );
}
function useQuiz() {
  const context = useContext(Context);
  if (context === undefined)
    throw Error("U Try to use context outside QuizProvider");

  return context;
}
export { QuizProvider, useQuiz };
