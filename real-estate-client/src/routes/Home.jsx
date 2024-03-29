import { HouseListing } from "../components/HouseListing"
import { HomeSearch } from "../components/HomeSearch"
import { useState, useEffect } from "react"


export function Home() {
    const [homesData, setHomesData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/homes')
          .then(response => response.json())
          .then(data => setHomesData(data))
      }, [])


    return (
        <>
            <h3>Search for Homes:</h3>
            <HomeSearch />

            {homesData.map((house) => {
                return <HouseListing key={house.mls_num} houseData={house} homesData={homesData} setHomesData={setHomesData} />
            })}
        </>
    )
}