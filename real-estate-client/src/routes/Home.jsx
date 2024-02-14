import { HouseListing } from "../components/HouseListing"

export function Home(props) {
    const { homesData } = props;
    console.log(homesData)
    return (
        <HouseListing houseData = {homesData[0]} />
    )
}