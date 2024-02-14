export function AddHome() {
    return(
        <form>
        <label htmlFor="mls_num">MLS Number:</label><br />
        <input type="text" id="mls_num" name="mls_num" /><br />
  
        <label htmlFor="street1">Street 1:</label><br />
        <input type="text" id="street1" name="street1" /><br />
  
        <label htmlFor="street2">Street 2:</label><br />
        <input type="text" id="street2" name="street2" /><br />
  
        <label htmlFor="city">City:</label><br />
        <input type="text" id="city" name="city" /><br />
  
        <label htmlFor="state">State:</label><br />
        <input type="text" id="state" name="state" /><br />
  
        <label htmlFor="zip_code">Zip Code:</label><br />
        <input type="text" id="zip_code" name="zip_code" /><br />
  
        <label htmlFor="neighborhood">Neighborhood:</label><br />
        <input type="text" id="neighborhood" name="neighborhood" /><br />
  
        <label htmlFor="sales_price">Sales Price:</label><br />
        <input type="number" id="sales_price" name="sales_price" /><br />
  
        <label htmlFor="date_listed">Date Listed:</label><br />
        <input type="date" id="date_listed" name="date_listed" /><br />
  
        <label htmlFor="bedrooms">Bedrooms:</label><br />
        <input type="number" id="bedrooms" name="bedrooms" /><br />
  
        <label htmlFor="photos">Photos:</label><br />
        <input type="file" id="photos" name="photos" multiple /><br />
  
        <label htmlFor="bathrooms">Bathrooms:</label><br />
        <input type="number" id="bathrooms" name="bathrooms" /><br />
  
        <label htmlFor="garage_size">Garage Size:</label><br />
        <input type="number" id="garage_size" name="garage_size" /><br />
  
        <label htmlFor="square_feet">Square Feet:</label><br />
        <input type="number" id="square_feet" name="square_feet" /><br />
  
        <label htmlFor="lot_size">Lot Size:</label><br />
        <input type="number" id="lot_size" name="lot_size" /><br />
  
        <label htmlFor="description">Description:</label><br />
        <textarea id="description" name="description" /><br />
  
        <input type="submit" value="Submit" />
      </form>
    )
}