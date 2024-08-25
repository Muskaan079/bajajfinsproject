import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://<your-backend-url>/bfhl', { data: JSON.parse(inputValue) });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or server error.');
      setResponse(null);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions.map(option => option.value));
  };

  const filterResponse = () => {
    if (!response) return {};

    const filters = {
      'Alphabets': response.alphabets,
      'Numbers': response.numbers,
      'Highest lowercase alphabet': response.highest_lowercase_alphabet
    };

    const filteredResponse = {};
    selectedFilters.forEach(filter => {
      filteredResponse[filter] = filters[filter] || [];
    });

    return filteredResponse;
  };

  const filterOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div className="App">
      <h1>API Data Filter</h1>
      <textarea
        rows="4"
        cols="50"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Enter JSON here, e.g., {"data":["A","B","1"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <Select
            isMulti
            options={filterOptions}
            onChange={handleFilterChange}
          />
          <div>
            <h2>Filtered Response:</h2>
            <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
