import React, { useState } from 'react';

function CreateKpi() {
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    // Perform API call to create the KPI with name, value, and isPublic data
    console.log(`Creating KPI: ${name} - ${value} - ${isPublic}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="public">Public:</label>
        <input
          type="checkbox"
          id="public"
          checked={isPublic}
          onChange={event => setIsPublic(event.target.checked)}
        />
      </div>
      <button type="submit">Create KPI</button>
    </form>
  );
}

export default CreateKpi;
// This component uses the useState hook to manage the state of the KPI name, value, and isPublic data. The handleSubmit function is called when the form is submitted, and it can be used to perform an API call to create the KPI with the entered data. In this example,


