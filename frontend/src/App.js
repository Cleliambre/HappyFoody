import logo from './logo.svg';
import './App.css';
import ForgottenPassword from "./forgottenPassword/ForgottenPassword";
import Menu from "./menu/Menu";

function App() {
  return (
    <div className="App">
        <Menu/>
      <ForgottenPassword/>
    </div>
  );
}

export default App;
