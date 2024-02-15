export function HomeSearch() {
    return (
        <>
            <form>
                <label htmlFor="mls_num">MLS Number: </label>
                <input type="text" id="mls_num" name="mls_num" />

                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" />

                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" />

                <label htmlFor="zip_code">Zip Code:</label>
                <input type="text" id="zip_code" name="zip_code" />

                <label htmlFor="bedrooms">Bedrooms:</label>
                <input type="number" id="bedrooms" name="bedrooms" />

                <label htmlFor="bathrooms">Bathrooms:</label>
                <input type="number" id="bathrooms" name="bathrooms" />

                <label htmlFor="square_feet_min">Min Square Feet:</label>
                <input type="text" id="square_feet_min" name="square_feet_min" />

                <label htmlFor="square_feet_max">Max Square Feet:</label>
                <input type="text" id="square_feet_max" name="square_feet_max" />

                <p><input type="submit" value="Search" /></p>
            </form>
        </>
        
    )
}