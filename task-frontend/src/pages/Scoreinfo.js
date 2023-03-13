import React from 'react'

const Scoreinfo = ({ quiz, mode ,score , score1 , score2}) => {
    // console.log(mode);
    if (mode !== 3) {
        return (
            <div className='score-info-body'>
                <h4>ชื่อเอกสารประประเมินครั้งที่ {quiz.doc_yeartime} : {quiz.doc_name}</h4>
                <div>
                    {quiz.maintopics.map((i, index) => (
                        <div>
                            {index + 1} . วัตถุประสงค์ : {i.mt_name}
                            คะแนนรวม : {score[index].score}
                            <div>
                                {i.mt_suptopic.map((j, indexz) => (
                                    <div className='body-child'>
                                        {index + 1}.{indexz + 1} . ตัวชี้วัดหลัก : {j.st_name}
                                        <br></br>
                                        <div className='testbocy'>
                                            คะแนนตัวชี้วัดหลัก : {score[index].st[indexz].score}
                                            <div>
                                                {j.st_supdetail.map((k, indexk) => (
                                                    <div className='body-child'>
                                                        {index + 1}.{indexz + 1}.{indexk + 1}. ตัวชี้วัดรอง : {k.sd_name}
                                                        <br></br>
                                                        <div className='testbocy'>
                                                            คำตอบ : {k.sd_choice}
                                                            <br></br>
                                                            คะแนนตัวชี้วัดรอง : {score[index].st[indexz].sd[indexk].score}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='score-info-body'>
                <div className='body-show'>
                    <h4>ชื่อเอกสารการประเมินครั้งที่ 1 : {quiz.doc_name}</h4>
                    {quiz.maintopics.map((i, index) => (
                        <div >
                            {index + 1} . วัตถุประสงค์ : {i.mt_name}
                            คะแนนรวม : {score1[index].score}
                            <div>
                                {i.mt_suptopic.map((j, indexz) => (
                                    <div className='body-child'>
                                        {index + 1}.{indexz + 1} . ตัวชี้วัดหลัก : {j.st_name}
                                        <br></br>
                                        <div className='testbocy'>
                                            คะแนนตัวชี้วัดหลัก : {score1[index].st[indexz].score}
                                            <div className='body-child'>
                                                {j.st_supdetail.map((k, indexk) => (
                                                    <div>
                                                        {index + 1}.{indexz + 1}.{indexk + 1}. ตัวชี้วัดรอง : {k.sd_name}
                                                        <br></br>
                                                        <div className='testbocy'>
                                                            คำตอบ : {k.sd_choice}
                                                            <br></br>
                                                            คะแนนตัวชี้วัดรอง : {score1[index].st[indexz].sd[indexk].score}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='body-show'>
                    <h4>ชื่อเอกสารการประเมินครั้งที่ 2 : {quiz.doc_name2}</h4>
                    {quiz.maintopics2.map((i, index) => (
                        <div>
                            {index + 1} . วัตถุประสงค์ : {i.mt_name}
                            คะแนนรวม : {score2[index].score}
                            <div>
                                {i.mt_suptopic.map((j, indexz) => (
                                    <div className='body-child'>
                                        {index + 1}.{indexz + 1} . ตัวชี้วัดหลัก : {j.st_name}
                                        <br></br>
                                        <div className='testbocy'>
                                            คะแนนตัวชี้วัดหลัก : {score2[index].st[indexz].score}
                                            <div>
                                                {j.st_supdetail.map((k, indexk) => (
                                                    <div className='body-child'>
                                                        {index + 1}.{indexz + 1}.{indexk + 1}. ตัวชี้วัดรอง : {k.sd_name}
                                                        <br></br>
                                                        <div className='testbocy'>
                                                            คำตอบ : {k.sd_choice}
                                                            <br></br>
                                                            คะแนนตัวชี้วัดรอง : {score2[index].st[indexz].sd[indexk].score}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

export default Scoreinfo