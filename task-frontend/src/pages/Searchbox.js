import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './showsty.css'
import { linkUrl } from '../urlBackend';
import Select from 'react-select';
import Showscorer from './Showscorer';

const Searchbox = ({ setData }) => {

    function add(arr, year) {
        const found = arr.some(el => el.value === year);
        if (!found) arr.push({ value: year, label: year });
    }

    useEffect(() => {
        axios.get(`${linkUrl.LinkToBackend}/show_assessment`).then((res_year) => {
            // console.log(res_year);
            res_year.data.map((i) => {
                add(options_year, i.am_number_of_year)
            })
        })//i.am_number_of_year
        axios.get(`${linkUrl.LinkToBackend}/get_all_user`).then((res_user) => {
            res_user.data.map((i) => {
                const user = localStorage.getItem("user_code")
                if (i.ps_id !== Number(user)) {
                    let temp = { value: i.ps_id, label: i.ps_name }
                    options_user.push(temp)
                }
            })
        })//i.ps_id and i.ps_name
        axios.get(`${linkUrl.LinkToBackend}/get_all_ore`).then((res_ore) => {
            res_ore.data.map((i) => {
                let temp = { value: i.ore_id, label: i.ore_shortname }
                options_ore.push(temp)
            })
        })//i.ore_id and i.ore_shortname 
    })


    const [year, setYear] = useState('')
    const [user, setUser] = useState('')
    const [ore, setOre] = useState('')
    const [name, setName] = useState('ค้นหาจากพนักงาน')
    const [mode, setMode] = useState(false)
    const [body, setBody] = useState([])

    var options_year = []
    var options_user = []
    var options_ore = []

    const mergeAndSumScoresWithMode = (list_input) => { // edit function //insert body
        // console.log(list_input);
        let temp = list_input
        const mergedScores = {};
        temp.forEach(score => {
            // console.log(score);
            if (mergedScores[score.doc_foruserid]) {
                if (score.doc_yeartime === 1 && mergedScores[score.doc_foruserid].doc_yeartime !== 2) {
                    mergedScores[score.doc_foruserid].doc_yeartime = 1;
                }
                else if (score.doc_yeartime === 2 && mergedScores[score.doc_foruserid].doc_yeartime !== 1) {
                    mergedScores[score.doc_foruserid].doc_yeartime = 2;
                }
                else {
                    mergedScores[score.doc_foruserid].doc_score_sum = mergedScores[score.doc_foruserid].doc_score + score.doc_score;
                    mergedScores[score.doc_foruserid].doc_score_sum = mergedScores[score.doc_foruserid].doc_score_sum / 2
                    mergedScores[score.doc_foruserid].doc_score2 = score.doc_score
                    mergedScores[score.doc_foruserid].doc_id2 = score.doc_id
                    mergedScores[score.doc_foruserid].maintopics2 = score.maintopics
                    mergedScores[score.doc_foruserid].doc_name2 = score.doc_name
                    let temp_year = score.doc_year.split('-')
                    mergedScores[score.doc_foruserid].doc_year = temp_year[0]
                    mergedScores[score.doc_foruserid].doc_yeartime = 3;
                }
            }
            else {
                mergedScores[score.doc_foruserid] = {
                    doc_createbyid: score.doc_createbyid,
                    doc_score: score.doc_score, doc_foruserid: score.doc_foruserid,
                    doc_id: score.doc_id, doc_mode_id: score.doc_mode_id,
                    doc_name: score.doc_name, doc_year: score.doc_year,
                    doc_yeartime: score.doc_yeartime, maintopics: score.maintopics
                };
            }
        });
        // console.log(Object.values(mergedScores));
        return Object.values(mergedScores);
    }


    const get_data = (input1, input2) => {
        // console.log(input1);
        axios.post(`${linkUrl.LinkToBackend}/search_score`, input1).then((res) => {
            // console.log(res.data);
            var temp_res = res.data
            // console.log(temp_res);
            axios.post(`${linkUrl.LinkToBackend}/search_score`, input2).then((res1) => {
                temp_res = [...temp_res, ...res1.data]
                // console.log(temp_res);
                let list = []
                temp_res.map((i) => {
                    if (i.doc_id !== "" && i.doc_mode_id === 112) {
                        list.push(i)
                    }
                })
                // console.log(list);
                let temp = mergeAndSumScoresWithMode(list)
                // console.log(temp);
                setList(temp)
            })
        })
    }

    async function setList(list) {
        console.log(list);
        let result_list = []
        
        for (var i in list) {
            // 
            if (list[i].doc_yeartime !== 3) {
                let score_ = check_score(list[i].maintopics)
                var color = ""
                if (list[i].doc_score >= 80) {
                    color = 'green'
                }
                else if (list[i].doc_score >= 70 && list[i].doc_score < 80) {
                    color = 'lightgreen'
                }
                else if (list[i].doc_score >= 60 && list[i].doc_score < 70) {
                    color = 'yellow'
                }
                else if (list[i].doc_score >= 50 && list[i].doc_score < 60) {
                    color = 'orange'
                }
                else {
                    color = 'red'
                }
                let res = await axios.get(`${linkUrl.LinkToBackend}/find_user/${list[i].doc_foruserid}`)
                let temp = { ps: res.data, body: list[i], color: color , mode : 0 , score : score_}
                // console.log(temp);
                result_list.push(temp)
            }
            else
            {
                let score_1 = check_score(list[i].maintopics)
                let score_2 = check_score(list[i].maintopics2)
                var color = ""
                if (list[i].doc_score_sum >= 80) {
                    color = 'green'
                }
                else if (list[i].doc_score_sum >= 70 && list[i].doc_score_sum < 80) {
                    color = 'lightgreen'
                }
                else if (list[i].doc_score_sum >= 60 && list[i].doc_score_sum < 70) {
                    color = 'yellow'
                }
                else if (list[i].doc_score_sum >= 50 && list[i].doc_score_sum < 60) {
                    color = 'orange'
                }
                else {
                    color = 'red'
                }
                let res = await axios.get(`${linkUrl.LinkToBackend}/find_user/${list[i].doc_foruserid}`)
                let temp = { ps: res.data, body: list[i], color: color , mode : 3 , score1 : score_1 , score2 : score_2}
                result_list.push(temp)
            }
        }
        // console.log(result_list);
        setBody(result_list)
    }

    function check_score(json) {
        let list = []
        let result_weight = check_all_weight(json)
        json.map((i, indexx) => {
          let new_score = i.mt_score * i.mt_weight / result_weight.weight
          let full_score_mt = 100 * i.mt_weight / result_weight.weight
          let list_temp = []
          i.mt_suptopic.map((j, indexj) => {
            let new_scorej = j.st_score * j.st_weight / result_weight.sub[indexx].indexi.weight / 100 * full_score_mt
            let full_score_st = full_score_mt * j.st_weight / result_weight.sub[indexx].indexi.weight
            let list_tempk = []
            j.st_supdetail.map((k) => {
              let new_scorek = k.score * k.weight / result_weight.sub[indexx].indexi.sub[indexj].indexj / 100 * full_score_st
              if (new_scorek % 1 >= 0.5) {
                new_scorek = Math.floor(new_scorek)
              }
              else {
                new_scorek = Math.ceil(new_scorek)
              }
              let temp = { name: k.sd_name, score: new_scorek }
              list_tempk.push(temp)
            })
            if (new_scorej % 1 >= 0.5) {
              new_scorej = Math.floor(new_scorej)
            }
            else {
              new_scorej = Math.ceil(new_scorej)
            }
            let temp = { name: j.st_name, score: new_scorej, sd: list_tempk }
            list_temp.push(temp)
          })
          if (new_score % 1 >= 0.5) {
            new_score = Math.floor(new_score)
          }
          else {
            new_score = Math.ceil(new_score)
          }
          let temp = { name: i.mt_name, score: new_score, st: list_temp }
          list.push(temp)
        })
        return list;
      }
    
    
    
      function check_all_weight(json) {
        let all_mt = 0
        let list = []
        json.map((i, indexi) => {
          all_mt = all_mt + i.mt_weight
          let all_st = 0
          let st_list = []
          i.mt_suptopic.map((j, indexj) => {
            all_st = all_st + j.st_weight
            let all_sd = 0
            j.st_supdetail.map((k, indexk) => {
              all_sd = all_sd + k.weight
            })
            let temp_st = { indexj: all_sd }
            st_list.push(temp_st)
          })
          let temp = { indexi: { weight: all_st, sub: st_list } }
          list.push(temp)
        })
    
        let result = { weight: all_mt, sub: list }
        return result;
      }

    const handleSearch = () => {
        if (year === '') {
            alert('Input year')
        }
        else if (ore === '') {
            let temp1 = { year: year.value + "-1", mode: 1, search_input: user.value }
            let temp2 = { year: year.value + "-2", mode: 1, search_input: user.value }
            // console.log(temp);
            get_data(temp1, temp2)
        }
        else if (user === '') {
            let temp1 = { year: year.value + "-1", mode: 0, search_input: ore.value }
            let temp2 = { year: year.value + "-2", mode: 0, search_input: ore.value }
            // console.log(temp);
            get_data(temp1, temp2)
        }
    }
    const handleMode = () => {
        setMode(!mode)
        // console.log(mode);
        if (mode === true) {
            setName("ค้นหาจากพนักงาน")
            setOre('')
        }
        else {
            setName("ค้นหาจากหน่วยงาน")
            setUser('')
        }
    }


    return (
        <div >
            <button onClick={handleMode}>{name}</button>
            <div>
                การประเมินประจำปี :
                <Select
                    defaultValue={year}
                    onChange={setYear}
                    options={options_year}
                />

                {mode === false &&
                    <div>
                        เลือกผู้ใช้งาน :
                        <Select
                            defaultValue={user}
                            onChange={setUser}
                            options={options_user} />
                    </div>}
                {mode === true &&
                    <div>
                        เลือกหน่วยงาน :
                        <Select
                            defaultValue={ore}
                            onChange={setOre}
                            options={options_ore} />
                    </div>}
            </div>
            <button className='w-2-buttom' onClick={handleSearch}>ค้นหา</button>
            {body.map((e) => (
                <Showscorer data_body={e} />
            ))}
        </div>
    )
}

export default Searchbox