import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [categories, setCategories] = React.useState(null);

  React.useEffect(() => {
    axios.get("/api/categories/").then(response => {
      setCategories(response.data);
    });
  }, []);

  return (
    categories && (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ul>
            {categories.map(category => (
              <li>{category.name}</li>
            ))}
          </ul>
        </header>
      </div>
    )
  );
}

export default App;
