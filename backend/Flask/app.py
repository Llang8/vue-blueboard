from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
from config import Config
import os

# Initialize App
app = Flask(__name__)

# Setup config from import
app.config.from_object(Config)

# Initialize db
db = SQLAlchemy(app)

from routes import *

# Run Server
if __name__ == "__main__":
    # Set debug to false in production
    app.run(debug=True)