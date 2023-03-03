import React from 'react'

const Scoreinfo = ({quiz}) => {
    console.log(quiz);
  return (
    <div>
        Name : {quiz.doc_year}
            {quiz.maintopics.map((i) => (
                <div>
                    Main topic : {i.mt_name} 
                    Score : {i.mt_score}
                    <div>
                        {i.mt_suptopic.map((j) => (
                            <div>
                                Sup topic : {j.st_name}
                                Score : {j.st_score}
                                <div>
                                    {j.st_supdetail.map((k) => (
                                        <div>
                                            Sup detail : {k.sd_name}
                                            <br></br>
                                            Choice : {k.sd_choice}
                                            <br></br>
                                            Score : {k.score}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

    </div>
  )
}

export default Scoreinfo