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
        <div key={mainIndex}>
          <div>
            <div>
              {mainIndex + 1 + ". "}
            </div>
            <label htmlFor={`mainTopic${mainIndex}`}>กำหนดหัวข้อดัชนีตัวชี้วัด :</label>
            <input
              type="text"
              id={`mainTopic${mainIndex}`}
              value={topic.mt_name}
              onChange={event => handleMainTopicChange(mainIndex, event.target.value)}
            />
            <label htmlFor={`mainTopicWeight${mainIndex}`}>กำหนดน้ำหนัก หัวข้อดัชนีตัวชี้วัดหลัก :</label>
            <input
              type="text"
              id={`mainTopicWeight${mainIndex}`}
              value={topic.mt_weight}
              onChange={event => handleMainWeightChange(mainIndex, event.target.value)}
            />
          </div>
          {topic.mt_suptopic.map((subTopic, subIndex) => (
            <div key={`${mainIndex}-${subIndex}`}>
              <div>
                <div>
                  {mainIndex + 1 + "."}{subIndex + 1 + ". "}
                </div>
                <label htmlFor={`subTopic${mainIndex}-${subIndex}`}> กำหนด ดัชนีตัวชี้วัดหลัก :</label>
                <input
                  type="text"
                  id={`subTopic${mainIndex}-${subIndex}`}
                  value={subTopic.st_name}
                  onChange={event => handleSubTopicChange(mainIndex, subIndex, 'st_name', event.target.value)}
                />
                <label htmlFor={`subTopicWeight${mainIndex}-${subIndex}`}>กำหนดน้ำหนัก ดัชนีตัวชี้วัดหลัก : </label>
                <input
                  type="text"
                  id={`subTopicWeight${mainIndex}-${subIndex}`}
                  value={subTopic.st_weight}
                  onChange={event => handleSubTopicChange(mainIndex, subIndex, 'st_weight', event.target.value)}
                />
              </div>
              {subTopic.st_supdetail.map((supDetail, supIndex) => (
                <div key={`${mainIndex}-${subIndex}-${supIndex}`}>
                  <div>
                    <div>
                      {mainIndex + 1 + "."}{subIndex + 1 + "."}{supIndex + 1 + ". "}
                    </div>
                    <label htmlFor={`supDetail${mainIndex}-${subIndex}-${supIndex}`}>กำหนด ดัชนีตัวชี้วัดย่อย :</label>
                    <input
                      type="text"
                      id={`supDetail${mainIndex}-${subIndex}-${supIndex}`}
                      value={supDetail.sd_name}
                      onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'sd_name', event.target.value)}
                    />
                    <label htmlFor={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}>กำหนด น้ำหนักดัชนีตัวชี้วัดย่อย:</label>
                    <input
                      type="text"
                      id={`supDetailWeight${mainIndex}-${subIndex}-${supIndex}`}
                      value={supDetail.weight}
                      onChange={event => handleSupDetailChange(mainIndex, subIndex, supIndex, 'weight', event.target.value)}
                    />
                    <label htmlFor={`supDetailDetail${mainIndex}-${subIndex}-${supIndex}`}>กำหนด คำอธิบายดัชนีตัวชี้วัดย่อย:</label>
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
                  {supIndex >= 0 && (
                    <button type="button" onClick={() => handleRemoveSupDetail(mainIndex, subIndex, supIndex)}>
                      ลบดัชนีตัวชีวัดย่อย
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => handleAddSupDetail(mainIndex, subIndex)}>
                เพิ่มดัชนีตัวชี้วัดย่อย
              </button>
              {subIndex >= 0 && (
                <button type="button" onClick={() => handleRemoveSubTopic(mainIndex, subIndex)}>
                  ลบดัชนีตัวชี้วัดหลัก
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => handleAddSubTopic(mainIndex)}>
            เพิ่มดัชนีตัวชี้วัดหลัก
          </button>
          {mainIndex >= 0 && (
            <button type="button" onClick={() => handleRemoveMainTopic(mainIndex)}>
              ลบหัวข้อดัชนีตัวชี้วัด
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddMainTopic}>
        เพิ่มหัวข้อดัชนีตัวชี้วัด
      </button>
      {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
    </form>
  );
}

export default AddDataForm;
