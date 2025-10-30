import './App.css';
import SearchBar from "./searchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar
          message="Rechercher une recette"
          className = "searchBar"
      />
    </div>
  );
}

export default App;
