import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Adddoc from '../components/Adddoc';

function CreateKpi({ assessment , hech, myid }) {
  
  const [foruser , setForuser] = useState();
  const [year , setYear] = useState();
  const [text , onAdd] = useState()

  const options_user = []
  const options_year = []

  console.log(assessment)

  useEffect(()=>{
    if(options_user.length === 0) 
    {
      hech.map((i)=>{
        let temp = {value : i.ps_id , label: i.ps_name} 
        options_user.push(temp)
      })
    }
    if(options_year.length === 0) 
    {
      assessment.map((i)=>{
        let string = i.am_year + " ครั้งที่ : " + i.am_number_of_kpi
        let temp = {value : i.am_year , label: string , value2 : i.am_number_of_kpi} 
        options_year.push(temp)
      })
    }
  })

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        FOR USER : 
        <Select
          defaultValue={foruser}
          onChange={setForuser}
          options={options_user}
        />
        Year of : 
        <Select
          defaultValue={year}
          onChange={setYear}
          options={options_year}
        />
        <Adddoc/>
      </form>
    </div>

  );
}

export default CreateKpi;
// This component uses the useState hook to manage the state of the KPI name, value, and isPublic data. The handleSubmit function is called when the form is submitted, and it can be used to perform an API call to create the KPI with the entered data. In this example,


