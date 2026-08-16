# CS 340 Project Two README

## Grazioso Salvare Animal Rescue Dashboard

### Bruno Manuel

## About the Project

This project was created for Grazioso Salvare, a rescue-animal training organization. The purpose of this project is to create an interactive dashboard that allows users to search, filter, and visualize Austin Animal Center shelter outcome data. The dashboard helps Grazioso Salvare identify dogs that may be good candidates for rescue training.

The dashboard connects to a MongoDB database named `aac` and uses the `animals` collection. A reusable Python CRUD module is used to retrieve data from MongoDB and support the dashboard’s filtering functionality.

## Required Functionality

The dashboard provides a user-friendly interface that allows Grazioso Salvare users to filter shelter animals by rescue type. The required rescue filters are:

* Water Rescue
* Mountain or Wilderness Rescue
* Disaster or Individual Tracking
* Reset

The dashboard includes the following required components:

* Grazioso Salvare logo
* Unique identifier with my name
* Interactive rescue-type filter options
* Interactive data table
* Geolocation map
* Pie chart showing breed distribution
* Dynamic updates when users select different filters

## Tools and Technologies Used

The project was completed using the following tools and technologies:

* Python
* MongoDB
* PyMongo
* Dash
* JupyterDash
* Plotly
* Dash Leaflet
* Pandas
* Jupyter Notebook
* Codio

MongoDB was used as the model component because it stores data in flexible JSON-like documents and works well with Python through the PyMongo driver. PyMongo allows the Python application to connect to MongoDB and perform create, read, update, and delete operations.

Dash was used to create the dashboard because it supports interactive web application components such as radio buttons, data tables, charts, and callbacks. Dash provides the view and controller structure for the application. The dashboard widgets serve as the view, while the callback functions act as the controller by updating the data table, chart, and map when users select filter options.

Plotly was used to create the pie chart, and Dash Leaflet was used to create the geolocation map.

## Database Information

* Database name: `aac`
* Collection name: `animals`
* User account: `aacuser`
* Password used for this project: `SNHU1234`
* Permission: `readWrite` access to the `aac` database

## CRUD Module

The dashboard imports and uses the `AnimalShelter` class from the `animal_shelter.py` file. This CRUD module connects to MongoDB and provides reusable database methods.

The main method used in the dashboard is the `read()` method. This method accepts a MongoDB query dictionary and returns matching animal records from the `animals` collection.

Example:

```python
from animal_shelter import AnimalShelter

db = AnimalShelter("aacuser", "SNHU1234")
records = db.read({})
```

## Rescue Filters

The dashboard uses the following rescue-type filters.

### Water Rescue

Water Rescue filters for dogs that match the following criteria:

* Animal type: Dog
* Breeds: Labrador Retriever Mix, Chesapeake Bay Retriever, Newfoundland
* Sex: Intact Female
* Age: 26 to 156 weeks

### Mountain or Wilderness Rescue

Mountain or Wilderness Rescue filters for dogs that match the following criteria:

* Animal type: Dog
* Breeds: German Shepherd, Alaskan Malamute, Old English Sheepdog, Siberian Husky, Rottweiler
* Sex: Intact Male
* Age: 26 to 156 weeks

### Disaster or Individual Tracking

Disaster or Individual Tracking filters for dogs that match the following criteria:

* Animal type: Dog
* Breeds: Doberman Pinscher, German Shepherd, Golden Retriever, Bloodhound, Rottweiler
* Sex: Intact Male
* Age: 20 to 300 weeks

### Reset

The Reset option returns the dashboard to the original unfiltered view.

## Steps Taken to Complete the Project

First, I reviewed the CS 340 Project Two Dashboard Specifications Document to identify the required dashboard widgets and filter requirements. I confirmed that the dashboard needed to include the Grazioso Salvare logo, a unique identifier, rescue filter options, an interactive data table, a geolocation chart, and a second chart.

Next, I configured MongoDB and created the `aacuser` account with read and write access to the `aac` database. I connected the dashboard to MongoDB using the CRUD Python module created in Project One.

Then, I created the dashboard layout in `ProjectTwoDashboard.ipynb`. The layout includes the Grazioso Salvare logo, dashboard title, my unique identifier, radio button filter options, an interactive data table, a pie chart, and a geolocation map.

After creating the layout, I added callback functions. These callbacks allow the data table, chart, and map to update dynamically when a user selects Water Rescue, Mountain or Wilderness Rescue, Disaster or Individual Tracking, or Reset.

Finally, I tested the dashboard by running the notebook and applying each filter. I confirmed that the data table, pie chart, and map updated correctly for each rescue type. I also captured screenshots to document the dashboard functionality.

## Challenges and Solutions

One challenge was setting up the MongoDB username and password correctly. The dashboard could not connect until the `aacuser` password was reset and tested successfully. I solved this by updating the user password in MongoDB and confirming the connection through `mongosh`.

Another challenge was completing the Dash callback functions. The starter code contained several FIXME sections, so I added the MongoDB filter queries, connected the radio buttons to the data table, and created callbacks for the pie chart and geolocation map.

A third challenge was displaying the map correctly. The map required valid `location_lat` and `location_long` fields. I solved this by checking for those fields and using them to place markers on the map.

## Screenshots

The following screenshots demonstrate that the dashboard works correctly.

### Starting Dashboard / Reset

Insert screenshot here.

### Water Rescue Filter

Insert screenshot here.

### Mountain or Wilderness Rescue Filter

Insert screenshot here.

### Disaster or Individual Tracking Filter

Insert screenshot here.

### Reset Filter

Insert screenshot here.

## How to Run the Project

To run the project, open the `ProjectTwoDashboard.ipynb` file in Codio. Make sure MongoDB is running and that the Austin Animal Center Outcomes data has been loaded into the `aac` database and `animals` collection.

The required files should be in the same workspace folder:

* `ProjectTwoDashboard.ipynb`
* `animal_shelter.py`
* `Grazioso Salvare Logo.png`

Run the notebook cell. The dashboard will load inside the notebook. Use the rescue-type radio buttons to filter the data. The data table, pie chart, and map will update based on the selected filter.

## What to Submit

The final submission should include a zipped folder containing:

* `ProjectTwoDashboard.ipynb`
* `animal_shelter.py`
* `Grazioso Salvare Logo.png`
* README Word document with screenshots
