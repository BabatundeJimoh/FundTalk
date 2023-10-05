import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routing from "./Routing";
import axios from "axios";

axios.defaults.baseURL = "https://fundtalk.onrender.com";
// axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {
  // const setBaseURL = () => {
  //   if (process.env.NODE_ENV === 'production') {
  //     axios.defaults.baseURL = 'https://fundtalk.onrender.com';
  //   } else {
  //     axios.defaults.baseURL = 'http://localhost:4000';
  //   }
  // };

  // setBaseURL()

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
