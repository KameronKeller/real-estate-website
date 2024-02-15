export function HouseListing(props) {

    const { houseData, homesData, setHomesData } = props

    async function handleDelete() {
        const response = await fetch(`http://localhost:3000/home/${houseData.mls_num}`, {
            mode: 'cors',
            method: 'DELETE',

        })

        if (response.ok) {
            const newHomesData = homesData.filter((house) => {
                return house.mls_num !== houseData.mls_num
            })
            setHomesData(newHomesData)
        }
    }


    return (
        <div>
            <hr></hr>
            <h2>Available Homes: </h2>
            <h3>{houseData.street1} {houseData.street2}</h3>
            <p>{houseData.city}, {houseData.state} {houseData.zip_code}</p>
            <ul>
                <li><strong>Photos: </strong> {houseData.photos}</li>
                <li><strong>neighborhood: </strong>{houseData.neighborhood}</li>
                <li><strong>Sales Price: </strong>${houseData.sales_price}</li>
                <li><strong>Date Listed: </strong>{houseData.date_listed}</li>
                <li><strong>Bedrooms: </strong>{houseData.bedrooms}</li>
                <li><strong>Bathrooms: </strong>{houseData.bathrooms}</li>
                <li><strong>Garage Size: </strong>{houseData.garage_size}</li>
                <li><strong>Square Feet: </strong>{houseData.square_feet}</li>
                <li><strong>Lot Size (Acres): </strong>{houseData.lot_size}</li>
                <li><strong>description: </strong>{houseData.description}</li>
                <li><strong>MLS#: </strong> {houseData.mls_num}</li>
            </ul>
            
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}