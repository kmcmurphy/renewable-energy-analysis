import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, func, text, select
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
import json

from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/energy.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Geography = Base.classes.geography
Totals = Base.classes.totalconsumption
Hydrochange = Base.classes.hydrochange
Hydrogen = Base.classes.hydrogeneration
Windchange = Base.classes.windchange
Windgen = Base.classes.windgeneration
Solarchange = Base.classes.solarchange
Solargen = Base.classes.solargeneration

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

CORS(app, support_credentials=True)   # to prevent CORS errors
#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"<a href=\'/api/v1.0/energy/totalenergy\'>http://127.0.0.1:5000/api/v1.0/energy/totalenergy</a><br/>"
        f"<a href=\'/api/v1.0/energy/hydrochange\'>http://127.0.0.1:5000/api/v1.0/energy/hydrochange</a><br/>"
        f"<a href=\'/api/v1.0/energy/hydrogen\'>http://127.0.0.1:5000/api/v1.0/energy/hydrogen</a><br/>"
        f"<a href=\'/api/v1.0/energy/windchange\'>http://127.0.0.1:5000/api/v1.0/energy/windchange</a><br/>"
        f"<a href=\'/api/v1.0/energy/windgen\'>http://127.0.0.1:5000/api/v1.0/energy/windgen</a><br/>"
        f"<a href=\'/api/v1.0/energy/solarchange\'>http://127.0.0.1:5000/api/v1.0/energy/solarchange</a><br/>"
        f"<a href=\'/api/v1.0/energy/solargen\'>http://127.0.0.1:5000/api/v1.0/energy/solargen</a><br/>"
    )


@app.route("/api/v1.0/energy/<table>")
@cross_origin(supports_credentials=True)
def energydata(table):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Get the right table based on the URL
    if table == 'totalenergy':
        SelTable = Totals
    elif table == 'hydrochange':
        SelTable = Hydrochange
    elif table == 'hydrogen':
        SelTable = Hydrogen
    elif table == 'windchange':
        SelTable = Windchange
    elif table == 'windgen':
        SelTable = Windgen
    elif table == 'solarchange':
        SelTable = Solarchange
    elif table == 'solargen':
        SelTable = Solargen


    # Query and join
    results = session.query(SelTable.alpha3, SelTable.year, SelTable.quantity, Geography.region, Geography.subregion)\
                            .join(Geography, SelTable.alpha3 == Geography.alpha3).all()


    # Create dictionary
    totals_with_geo = []
    for row in results:
        geography_dict = {}
        geography_dict["alpha3"] = row[0]
        geography_dict["year"] = row[1]
        geography_dict["quantity"] = row[2]
        geography_dict["region"] = row[3]
        geography_dict["subregion"] = row[4]
        totals_with_geo.append(geography_dict)

    session.close()


    return jsonify(totals_with_geo)
     


if __name__ == '__main__':
    app.run(debug=True)