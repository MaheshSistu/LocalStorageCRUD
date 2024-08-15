import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const storedItms = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItms);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (inputValue.trim()) {
      if (isEditing && currentIndex !== null) {
        const updateItems = items.map((item, index) =>
          index === currentIndex ? inputValue.trim() : item
        );
        setItems(updateItems);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setItems([...items, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const editItem = (index, newValue) => {
    setInputValue(items[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };
  return (
    <div className="App">
      <h2>Local Storage CRUD</h2>
      <input
        type="input"
        placeholder="add new item"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button type="button" onClick={addItem}>
        {isEditing ? "update Item" : "Add Item"}
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => editItem(index)}>Edit</button>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
