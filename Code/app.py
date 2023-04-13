import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///../energy.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Geography = Base.classes.geography
Totals = Base.classes.totalconsumption

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/geography<br/>"
    )


@app.route("/api/v1.0/geography")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Geography.name, Geography.alpha3, Geography.region, Geography.subregion).all()

    session.close()

    all_geographies = []
    for name, alpha3, region, subregion, in results:
        geography_dict = {}
        geography_dict["name"] = name
        geography_dict["alpha3"] = alpha3
        geography_dict["region"] = region
        geography_dict["subregion"] = subregion
        all_geographies.append(geography_dict)

    

    # Convert list of tuples into normal list
    #all_names = list(np.ravel(results))

    return jsonify(all_geographies)



if __name__ == '__main__':
    app.run(debug=True)
