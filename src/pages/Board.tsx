import { Provider } from "react-redux";
import Board from "../components/Board";
import store from "@/lib/boardStore";

const BoardPage = () => {
  return (
    <Provider store={store}>
      <div className="p-[2rem]">
        <h1>Board</h1>
        <Board />
      </div>
    </Provider>
  )
}

export default BoardPage;
