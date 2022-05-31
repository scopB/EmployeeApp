import React, { useState } from 'react'
import Select from 'react-select';

const Q3 = ({changeState,addquizs}) => {
  const onSubmit = () => {
    addquizs()
    changeState()
  }

  const options = [
    { value: 'choice', label: 'choice' },
    { value: 'input', label: 'Input text' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <Select 
        // isMulti
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        />
      <button onClick={onSubmit} style={{ backgroundColor: 'green'}} className='btn'>Submit form</button>
    </div>
  )
}

export default Q3