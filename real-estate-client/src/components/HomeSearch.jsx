export function HomeSearch() {
    return (
        <form>
            <label htmlFor="mls_num">MLS Number:</label><br />
            <input type="text" id="mls_num" name="mls_num" /><br />

            <label htmlFor="city">City:</label><br />
            <input type="text" id="city" name="city" /><br />

            <label htmlFor="state">State:</label><br />
            <input type="text" id="state" name="state" /><br />

            <label htmlFor="zip_code">Zip Code:</label><br />
            <input type="text" id="zip_code" name="zip_code" /><br />

            <label htmlFor="bedrooms">Bedrooms:</label><br />
            <input type="number" id="bedrooms" name="bedrooms" /><br />

            <label htmlFor="bathrooms">Bathrooms:</label><br />
            <input type="number" id="bathrooms" name="bathrooms" /><br />

            <label htmlFor="square_feet_min">Min Square Feet:</label><br />
            <input type="number" id="square_feet_min" name="square_feet_min" /><br />

            <label htmlFor="square_feet_max">Max Square Feet:</label><br />
            <input type="number" id="square_feet_max" name="square_feet_max" /><br />

            <input type="submit" value="Search" />
        </form>
    )
}