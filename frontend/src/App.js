import './App.css';
import SearchBar from "./searchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar
          message="Rechercher une recette"
          className = "searchBar"
          color="lavenderblush"
      />
    </div>
  );
}

export default App;
