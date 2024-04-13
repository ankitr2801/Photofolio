
// react toasts
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import AlbumList from "./Components/AlbumList/AlbumList";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        < Navbar />
        <div className="Albums">
          <AlbumList />
        </div>
      </div>

    </>
  )
}

export default App;
