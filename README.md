# Real Estate Website

A basic real estate website.

## Dependencies
```
Node v21.5.0
SQLite3
```

## Running the Front End

```
cd real-estate-client
npm install
npm run dev
```

## Deploying the Front End

```
cd real-estate-client
npm run build
cp -r dist/ <production_directory>
```

## Running the Back End

```
cd real-estate-server
npm install
nodemon app.js #if developing
node app.js #if production
```

## Architecture Overview

- Back end
    - Serves JSON through API endpoints
    - Stores data in SQLite3 Database
        - realestate.db for user data
        - sessions.db for authenticated session data
- React front end
    - Makes fetch requests from back end and renders data

## TODO

- [ ] Connect search function to backend
- [ ] Add form validation to "add home", login, and search forms
- [ ] Complete implementation of login functionality
- [ ] Secure APIs that should only be accessible once a user is logged in
- [ ] Stylize website
- [ ] Test front end
- [ ] Test back end
- [ ] Create .env file to hold API endpoint instead of having that hardcoded
- [ ] Refactor and clean up code

## API Description

```yaml
/homes
    method: get
    parameters: none
/homes
    method: post
    parameters:
        mls_num
        city
        state
        zip_code
        bedrooms
        bathrooms
        square_feet_min
        square_feet_max
/home
    method: post
    parameters:
        mls_num
        street1
        street2
        city
        state
        zip_code
        neighborhood
        sales_price
        date_listed
        bedrooms
        photos
        bathrooms
        garage_size
        square_feet
        lot_size
        description
/home/{mls_num}
    method: patch
    parameters:
        mls_num
        street1
        street2
        city
        state
        zip_code
        neighborhood
        sales_price
        date_listed
        bedrooms
        photos
        bathrooms
        garage_size
        square_feet
        lot_size
        description
/home/{mls_num}
    method: delete
    parameters:
        mls_num
/login/password
    method: post
    parameters:
        username
        password
```