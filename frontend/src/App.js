import './App.css';
import ForgottenPassword from "./forgottenPassword/ForgottenPassword";
import Menu from "./menu/Menu";

import CardList from "./card_list/CardList";

function App() {
  return (
    <div className="App">
        <Menu/>
      <ForgottenPassword/>
    </div>
  );
}

export default App;
