import { HouseListing } from "../components/HouseListing"
import { HomeSearch } from "../components/HomeSearch"

export function Home(props) {
    const { homesData } = props;
    console.log(homesData)
    return (
        <>
            <HomeSearch />
            <HouseListing houseData = {homesData[0]} />
        </>
    )
}