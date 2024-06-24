import './App.css';
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const STORAGE_KEY = 'markdown-content'; // Key for local storage

const useLocalStorage = (initialValue) => {
  // Get from local storage then parse stored json or return initial value
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error parsing JSON, return initial value
      return initialValue;
    }
  });

  // useEffect to store changes in local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const [code, setCode] = useLocalStorage('## Hello');
  const [compiled, setCompiled] = useState(marked.parse(code));
  const [hide, hidePreview] = useState(true);

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={() => hidePreview(true)} className="btn">
            MarkDown
          </button>
          <button onClick={() => hidePreview(false)} className="btn">
            Preview
          </button>

          <button disabled className="btn">Docs (API integration coming soon)</button>

        </div>
        {hide ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : (
          <div>
            <textarea value={compiled} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;