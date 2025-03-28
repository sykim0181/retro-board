import { Provider } from "react-redux";
import Board from "../components/Board";
import store from "@/lib/boardStore";

const BoardPage = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col p-[2rem] min-h-dvh">
        <h1>Board</h1>
        <Board />
      </div>
    </Provider>
  )
}

export default BoardPage;
