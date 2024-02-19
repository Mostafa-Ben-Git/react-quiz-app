import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import FinishScreen from "./FinishScreen";
import NextBtn from "./NextBtn";
import Timer from "./Timer";
import { useQuiz } from "../contexts/Context";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Question></Question>
            <NextBtn />
            <Timer></Timer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
