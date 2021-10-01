# Tripin Service using OData and o.js

The project using odata library https://www.npmjs.com/package/odata to fetch and process data from the
OData reference services.

The project is not UI focussed so dont care about the stylings and UI/UX layout. The Idea is to
showcase how we can easily consume OData services via a browser or nodejs app using an isomorphic OData library.

## Project setup

In the project directory, you can run:

```
npm install
```

After successfull installation, you can run:

```
npm start
```

It should start the react-app in http://localhost:3000

## Project setup

1. **Get All People:** Home Page does a GET request to fetch all people for a defined entity key and displays them On click of each person, their information is displayed on the right

2. **Delete Person** : The Delete Button under each person info, will do a DELETE request to delete the resource on the service.

3. **Edit Person** : Edit Button undr each person info, will route the app to a update page, which will allow the user to update the FirstName, LastName, MiddleName, Age and Email address of the user, and the app will do a Patch request to update the resource on the OData Service

4. **Add New Person** : Clicking on Add on the Navigation Bar, will route the app to a Add page, which will allow the user to create a new person with all the details and their address. It will do a POST request to the OData service to create a new resource

5. **Search/Filter** : Clicking on Search/Filter on the Navigation Bar, will route the app to a page, which will allow the user to search for a spercific user with userName, firstname or lastName, or fetch all Users based on Gender or Age. It will do a filtered GET query on the OData service.

To know more about the OData Reference Services and their basic usages, please refer https://www.odata.org/odata-services/
