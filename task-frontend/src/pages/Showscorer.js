import React from 'react'

const Showscorer = ({ data_body }) => {
    return (
        <div>
            {data_body.map((e) => {
                return (
                    <div>
                        <h2>{e.username}</h2>
                        {e.result.map((a) =>{
                            return(
                                <div>
                                    {a.number_quiz} : {a.score}
                                </div>
                            )
                        })}
                    </div>
                )

            })}
        </div>
    )
}

export default Showscorer