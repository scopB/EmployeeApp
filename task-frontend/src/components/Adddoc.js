import React, { useState } from 'react';

function AddDataForm() {
    const [topics, setTopics] = useState([{ mainTopic: '', weight: '', subTopics: [{ subTopic: '', weight: '' }] }]);
    const [data, setData] = useState('');
  
    const handleSubmit = event => {
      event.preventDefault();
      // Perform API call to add data with topics and data
      console.log(`Adding data: ${data} with topics: ${JSON.stringify(topics)}`);
    };
  
    const handleMainTopicChange = (index, key, value) => {
      const newTopics = [...topics];
      newTopics[index][key] = value;
      setTopics(newTopics);
    };
  
    const handleSubTopicChange = (mainIndex, subIndex, key, value) => {
      const newTopics = [...topics];
      newTopics[mainIndex].subTopics[subIndex][key] = value;
      setTopics(newTopics);
    };
  
    const handleAddMainTopic = () => {
      const newTopics = [...topics, { mainTopic: '', weight: '', subTopics: [{ subTopic: '', weight: '' }] }];
      setTopics(newTopics);
    };
  
    const handleRemoveMainTopic = index => {
      const newTopics = [...topics];
      newTopics.splice(index, 1);
      setTopics(newTopics);
    };
  
    const handleAddSubTopic = mainIndex => {
      const newTopics = [...topics];
      newTopics[mainIndex].subTopics.push({ subTopic: '', weight: '' });
      setTopics(newTopics);
    };
  
    const handleRemoveSubTopic = (mainIndex, subIndex) => {
      const newTopics = [...topics];
      newTopics[mainIndex].subTopics.splice(subIndex, 1);
      setTopics(newTopics);
    };
  

  return (
    <form onSubmit={handleSubmit}>
      {topics.map((topic, mainIndex) => (
        <div key={mainIndex}>
          <div>
            <label htmlFor={`mainTopic${mainIndex}`}>Main Topic:</label>
            <input
              type="text"
              id={`mainTopic${mainIndex}`}
              value={topic.mainTopic}
              onChange={event => handleMainTopicChange(mainIndex, event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`mainTopicWeight${mainIndex}`}>maintopic Weight:</label>
            <input
              type="text"
              id={`mainTopicWeight${mainIndex}`}
              value={topic.weight}
              onChange={event => handleMainTopicChange(mainIndex, 'weight', event.target.value)}
            />
          </div>

          {topic.subTopics.map((subTopic, subIndex) => (
            <div key={`${mainIndex}-${subIndex}`}>
              <div>
                <label htmlFor={`subTopic${mainIndex}-${subIndex}`}>Sub Topic:</label>
                <input
                  type="text"
                  id={`subTopic${mainIndex}-${subIndex}`}
                  value={subTopic.subTopic}
                  onChange={event => handleSubTopicChange(mainIndex, subIndex, 'subTopic', event.target.value)}
                />
              </div>
              <div>
                <label htmlFor={`subTopicWeight${mainIndex}-${subIndex}`}>Suptopic Weight:</label>
                <input
                  type="text"
                  id={`subTopicWeight${mainIndex}-${subIndex}`}
                  value={subTopic.weight}
                  onChange={event => handleSubTopicChange(mainIndex, subIndex, 'weight', event.target.value)}
                />
              </div>
              {subIndex > 0 && (
                <button type="button" onClick={() => handleRemoveSubTopic(mainIndex, subIndex)}>
                  Remove Sub Topic
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => handleAddSubTopic(mainIndex)}>
            Add Sub Topic
          </button>
          {topics.length > 1 && (
        <button type="button" onClick={() => handleRemoveMainTopic(mainIndex)}>
          Remove Main Topic
        </button>
      )}
    </div>
  ))}
  <button type="button" onClick={handleAddMainTopic}>
    Add Main Topic
  </button>
  <div>
    <label htmlFor="data">Data:</label>
    <textarea id="data" value={data} onChange={event => setData(event.target.value)} />
  </div>
  <button type="submit">Add Data</button>
</form>
);
}

export default AddDataForm;
