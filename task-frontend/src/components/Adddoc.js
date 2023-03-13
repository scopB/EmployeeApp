import React, { useState } from 'react';
import './Adddo.css'

function AddDataForm({ topics, setTopics }) {

  const handleMainTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index].mt_name = value;
    setTopics(newTopics);
  };

  const handleMainWeightChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index].mt_weight = value;
    setTopics(newTopics);
  };

  const handleSubTopicChange = (mainIndex, subIndex, key, value) => {
    const newTopics = [...topics];
    newTopics[mainIndex].mt_suptopic[subIndex][key] = value;
    setTopics(newTopics);
  };

  const handleSupDetailChange = (mainIndex, subIndex, supIndex, key, value) => {
    const newTopics = [...topics];
    newTopics[mainIndex].mt_suptopic[subIndex].st_supdetail[supIndex][key] = value;
    setTopics(newTopics);
  };

  const handleAddMainTopic = () => {
    const newTopics = [...topics, { mainTopic: '', mainWeight: '', mt_suptopic: [{ subTopic: '', weight: '', st_supdetail: [{ supDetail: '', weight: '', sd_detail: '', choise1: '', choise2: '', choise3: '', choise4: '', choise5: '' }] }] }];
    setTopics(newTopics);
  };

  const handleRemoveMainTopic = index => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  const handleAddSubTopic = mainIndex => {
    const newTopics = [...topics];
    newTopics[mainIndex].mt_suptopic.push({ st_name: '', st_weight: '', st_supdetail: [{ sd_name: '', weight: '', sd_detail: '', sd_choice01: '', sd_choice02: '', sd_choice03: '', sd_choice04: '', sd_choice05: '' }] });
    setTopics(newTopics);
  };

  const handleRemoveSubTopic = (mainIndex, subIndex) => {
    const newTopics = [...topics];
    newTopics[mainIndex].mt_suptopic.splice(subIndex, 1);
    setTopics(newTopics);
  };

  const handleAddSupDetail = (mainIndex, subIndex) => {
    const newTopics = [...topics];
    newTopics[mainIndex].mt_suptopic[subIndex].st_supdetail.push({ sd_name: '', weight: '', sd_detail: '', sd_choice01: '', sd_choice02: '', sd_choice03: '', sd_choice04: '', sd_choice05: '' });
    setTopics(newTopics);
  };

  const handleRemoveSupDetail = (mainIndex, subIndex, supIndex) => {
    const newTopics = [...topics];
    newTopics[mainIndex].mt_suptopic[subIndex].st_supdetail.splice(supIndex, 1);
    setTopics(newTopics);
  };


  return (
    <form >
      {topics.map((topic, mainIndex) => (
        <div>
          <div key={mainIndex} className="dov_body">
            <div className='dov-body-in'>
              {/* {mainIndex + 1 + ". "} */}
              <div className='dov-body-in2'>
                <div className='col-doc-btn-mar'>
                  {mainIndex + 1 + ". "}
                </div>
                <label htmlFor={`mainTopic${mainIndex}`}>วัตถุประสงค์ :</label>
                <div className='main-box-name'>
                  <input
                    type="text"
                    id={`mainTopic${mainIndex}`}
                    value={topic.mt_name}
                    onChange={event => handleMainTopicChange(mainIndex, event.target.value)}
                  />
                </div>
                <label htmlFor={`mainTopicWeight${mainIndex}`}>น้ำหนักวัตถุประสงค์ :</label>
                <div>
                  <input
                    type="text"
                    id={`mainTopicWeight${mainIndex}`}
                    value={topic.mt_weight}
                    onChange={event => handleMainWeightChange(mainIndex, event.target.value)}
                  />
                </div>
              </div>
            </div>
            {topic.mt_suptopic.map((subTopic, subIndex) => (
              <div>
                <div key={`${mainIndex}-${subIndex}`} className='dov_body-child1'>
                  <div className='dov_body-child1-body'>
                    <div className='dov-body-in2'>
                      <div className='col-doc-btn-mar'>
                        {mainIndex + 1 + "."}{subIndex + 1 + ". "}
                      </div>
                      <label htmlFor={`subTopic${mainIndex}-${subIndex}`}> ตัวชี้วัดหลัก :</label>
                      <div className='main-box-name'>
                        <input
                          type="text"
                          id={`subTopic${mainIndex}-${subIndex}`}
                          value={subTopic.st_name}
                          onChange={event => handleSubTopicChange(mainIndex, subIndex, 'st_name', event.target.value)}
                        />
                      </div>

                      <label htmlFor={`subTopicWeight${mainIndex}-${subIndex}`}>น้ำหนักตัวชี้วัดหลัก : </label>
                      <div>
                        <input
                          type="text"
                          id={`subTopicWeight${mainIndex}-${subIndex}`}
                          value={subTopic.st_weight}
                          onChange={event => handleSubTopicChange(mainIndex, subIndex, 'st_weight', event.target.value)}
                        />
                      </div>
                      <br></br>
                      <br></br>
                    </div>


                    {subTopic.st_supdetail.map((supDetail, supIndex) => (
                      <div key={`${mainIndex}-${subIndex}-${supIndex}`} className="dov_body-child2">
                        <div className='dov_body-child22'>
                          <div className='dov-body-in2'>
                            <div className='col-doc-btn-mar'>
                              {mainIndex + 1 + "."}{subIndex + 1 + "."}{supIndex + 1 + ". "}
                            </div>
                            <label htmlFor={`supDetail${mainIndex}-${subIndex}-${supIndex}`}>ตัวชี้วัดรอง :</label>
                            <div className='main-box-name'>
                              <input
                                type="text"
                                id={`supDetail${mainIndex}-${subIndex}-${supIndex}`}
                                value={supDetail.sd_name}
                                onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_name', event.target.value)}
                              />
                            </div>
                            <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>น้ำหนักตัวชี้วัดรอง:</label>
                            <div className='main-box-name-w'>
                              <input
                                type="text"
                                id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                                value={supDetail.weight}
                                onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'weight', event.target.value)}
                              />
                            </div>

                          </div>

                          <label htmlFor={`supDetailDetail${mainIndex}-${subIndex}-${supIndex}`}>คำอธิบายตัวชี้วัดรอง :</label>
                          <input
                            type="text"
                            id={`supDetailDetail${mainIndex}-${subIndex}-${supIndex}`}
                            value={supDetail.sd_detail}
                            onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_detail', event.target.value)}
                          />
                          <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>เกณฑ์ที่ 1 สำหรับ 1 คะแนน :</label>
                          <input
                            type="text"
                            id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                            value={supDetail.sd_choice01}
                            onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_choice01', event.target.value)}
                          />
                          <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>เกณฑ์ที่ 2 สำหรับ 2 คะแนน :</label>
                          <input
                            type="text"
                            id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                            value={supDetail.sd_choice02}
                            onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_choice02', event.target.value)}
                          />
                          <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>เกณฑ์ที่ 3 สำหรับ 3 คะแนน :</label>
                          <input
                            type="text"
                            id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                            value={supDetail.sd_choice03}
                            onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_choice03', event.target.value)}
                          />
                          <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>เกณฑ์ที่ 4 สำหรับ 4 คะแนน :</label>
                          <input
                            type="text"
                            id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                            value={supDetail.sd_choice04}
                            onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_choice04', event.target.value)}
                          />
                          <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>เกณฑ์ที่ 5 สำหรับ 5 คะแนน :</label>
                          <input
                            type="text"
                            id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                            value={supDetail.sd_choice05}
                            onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_choice05', event.target.value)}
                          />
                        </div>
                        <div className='sb-add'>
                          <div className='col2'>
                            <button type="button" onClick={() => handleAddSupDetail(mainIndex, subIndex)}>
                              <i className='material-icons'>add</i>
                            </button>
                          </div>
                          <div className='col2'>
                            {supIndex >= 0 && (
                              <button type="button" onClick={() => handleRemoveSupDetail(mainIndex, subIndex, supIndex)}>
                                <i className='material-icons'>delete</i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className='col2'>
                    <button type="button" onClick={() => handleAddSupDetail(mainIndex, subIndex)}>
                      <i className='material-icons'>add</i>
                    </button>
                  </div> */}
                </div>
                <div className='col2'>
                  <div className='col-doc-btn'>
                    <div className='col-doc-btn-mar'>
                      <button type="button" onClick={() => handleAddSubTopic(mainIndex)}>
                        <i className='material-icons'>add</i>
                      </button>
                    </div>

                    {subIndex >= 0 && (
                      <button type="button" onClick={() => handleRemoveSubTopic(mainIndex, subIndex)}>
                        <i className='material-icons'>delete</i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {topic.mt_suptopic.length === 0 &&
              <div className='col-doc-btn'>
                <div className='col-doc-btn-mar'>
                  <button type="button" onClick={() => handleAddSubTopic(mainIndex)}>
                    <i className='material-icons'>add</i>
                  </button>
                </div>
              </div>}
          </div>
          <div className='button-b-quiz'>
            <div className='col-doc-btn'>
              <div className='col-doc-btn-mar'>
                <button type="button" onClick={handleAddMainTopic}>
                  <i className='material-icons'>add</i>
                </button>
              </div>
              {mainIndex >= 0 && (
                <button type="button" onClick={() => handleRemoveMainTopic(mainIndex)}>
                  <i className='material-icons'>delete</i>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {topics.length === 0 && <div className='button-b-quiz'>
        <button type="button" onClick={handleAddMainTopic}>
          <i className='material-icons'>add</i>
        </button>
      </div>}
      {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
    </form>
  );
}

export default AddDataForm;
