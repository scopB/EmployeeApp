import React from "react"

const Home = ({hech}) => {

  return (
    <div>
      {hech.length > 0 ? hech.map((i)=>(
        i.ps_name
      )):
      <img className="pig-home" src='https://asv-ptgenergy-backoffice-api-prod.azurewebsites.net/images/item1-cover_1.jpg'></img>
      }
    </div>
  )
}

export default Home