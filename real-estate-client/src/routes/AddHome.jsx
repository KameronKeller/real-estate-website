import { useState } from 'react'

export function AddHome() {

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    mls_num: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip_code: '',
    neighborhood: '',
    sales_price: '',
    date_listed: '',
    bedrooms: '',
    photos: '',
    bathrooms: '',
    garage_size: '',
    square_feet: '',
    lot_size: '',
    description: '',
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:3000/home', {
      mode: 'cors',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ formData })
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="mls_num">MLS Number:</label>
      <input type="text" id="mls_num" name="mls_num" value={formData.mls_num} onChange={handleChange} />

      <label htmlFor="street1">Street 1:</label>
      <input type="text" id="street1" name="street1" value={formData.street1} onChange={handleChange} />

      <label htmlFor="street2">Street 2:</label>
      <input type="text" id="street2" name="street2" value={formData.street2} onChange={handleChange} />

      <label htmlFor="city">City:</label>
      <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />

      <label htmlFor="state">State:</label>
      <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />

      <label htmlFor="zip_code">Zip Code:</label>
      <input type="text" id="zip_code" name="zip_code" value={formData.zip_code} onChange={handleChange} />

      <label htmlFor="neighborhood">Neighborhood:</label>
      <input type="text" id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />

      <label htmlFor="sales_price">Sales Price:</label>
      <input type="number" id="sales_price" name="sales_price" value={formData.sales_price} onChange={handleChange} />

      <label htmlFor="date_listed">Date Listed:</label>
      <input type="date" id="date_listed" name="date_listed" value={formData.date_listed} onChange={handleChange} />

      <label htmlFor="bedrooms">Bedrooms:</label>
      <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />

      <label htmlFor="photos">Photos:</label>
      <input type="file" id="photos" name="photos" value={formData.photos} multiple onChange={handleChange} />

      <label htmlFor="bathrooms">Bathrooms:</label>
      <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />

      <label htmlFor="garage_size">Garage Size:</label>
      <input type="number" id="garage_size" name="garage_size" value={formData.garage_size} onChange={handleChange} />

      <label htmlFor="square_feet">Square Feet:</label>
      <input type="number" id="square_feet" name="square_feet" value={formData.square_feet} onChange={handleChange} />

      <label htmlFor="lot_size">Lot Size:</label>
      <input type="number" id="lot_size" name="lot_size" value={formData.lot_size} onChange={handleChange} />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange} />

      <input type="submit" value="Submit" />
    </form>
    {isSubmitted && <p>Form Submitted!</p>}
    </>
  )
}