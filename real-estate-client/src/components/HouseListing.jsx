export function HouseListing(props) {

    const { houseData } = props

    return (
        <div>
            {houseData.mls_num}
            {houseData.street1}
            {houseData.street2}
            {houseData.city}
            {houseData.state}
            {houseData.zip_code}
            {houseData.neighborhood}
            {houseData.sales_price}
            {houseData.date_listed}
            {houseData.bedrooms}
            {houseData.photos}
            {houseData.bathrooms}
            {houseData.garage_size}
            {houseData.square_feet}
            {houseData.lot_size}
            {houseData.description}
        </div>
    )
}