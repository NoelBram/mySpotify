from re import I
from tokenize import Token
import sqlalchemy
import pandas as pd
from sqlalchemy.orm import sessionmaker
import requests
import json
from datetime import datetime
import datetime
import sqlite3

DATABASE_LOCATION = "sqlite:///my_played_tracks.sqlite"
USER_ID = 'Noah Bram'
TOKEN = ''