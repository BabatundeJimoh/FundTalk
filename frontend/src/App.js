import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routing from "./Routing";
import axios from 'axios'



axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Routing />
    </>
  );
}
export default App;
