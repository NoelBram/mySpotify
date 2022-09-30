from contextlib import nullcontext
import copy
import sqlite3
from xml.etree.ElementTree import tostring
# from flask import Flask
# import sqlalchemy
import pandas as pd 
# from sqlalchemy.orm import sessionmaker
import requests
# import json
from datetime import datetime
import datetime
# from keyvalue_sqlite import KeyValueSqlite

DATABASE_LOCATION = "sqlite:///my_playlists.sqlite"
USER_ID = "22io3oxgaphrgsxto4naqh4ai"
TOKEN = "BQAp2QHWJBYsnJLRgWyfY5VIDqWlKeQN2TQYC9kV_tdqPk1rOjB6DD6aHSZ2YrB5S-ozYQORyXqQcu9I8tY5A042nkNuw3Pkfn3OVDWz6KrSacPYehcpfRoX-y5AfK3CzQbpS54VG6I2AFuWCwtOwSKG6_pN8BLHHrjsoOkkW9uwYefxUOn-Rve2tPnlrL2iVYKEBfa4461naTD_fQ0" # your Spotify API token

playlistToken = "BQB04wwbyexluap3DSuDO2mRCxoi1bpVr2hiSw3_0fyy360_P2d6Ukp0cFDj3sT6eY44jfpqSCrwCBX0cgGAAAWrPWPps8uo1tnVWG-LmfgC8iVZgVW-1S8antfNoTN32ZWlW3Lad0UluGNMD_vW78D6sJJT2gkM7e3tDr7mWfRM4Smo-SHqRX9GqDQTrVIp9r0"

# Generate your token here:  https://developer.spotify.com/console/get-recently-played/
# Note: You need a Spotify account (can be easily created for free)
# to avoid the garbage in -> garbage out in the data validation step
def check_if_valid_data(df: pd.DataFrame) -> bool:
    # Check if dataframe is empty
    if df.empty:
        print("No playlists downloaded. Finishing execution")
        return False 

    # Primary Key Check
    if pd.Series(df['played_at']).is_unique:
        pass
    else:
        raise Exception("Primary Key check is violated")

    # Check for nulls
    if df.isnull().values.any():
        raise Exception("Null values found")

    # # Check that all timestamps are of yesterday's date
    # yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
    # yesterday = yesterday.replace(hour=0, minute=0, second=0, microsecond=0)

    # timestamps = df["timestamp"].tolist()
    # for timestamp in timestamps:
    #     if datetime.datetime.strptime(timestamp, '%Y-%m-%d') != yesterday:
    #         raise Exception("At least one of the returned playlists does not have a yesterday's timestamp")
            

    return True


def getPlaylist(token, id):
    endpoint = "https://api.spotify.com/v1/playlists/{playlist_id}".format(playlist_id = id)
    headers = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=token)
    }
    user_playlists_request = requests.get(endpoint, headers = headers)

    user_playlists = user_playlists_request.json()

    return user_playlists

if __name__ == "__main__":

    # Extract part of the ETL process
    endpoint = "https://api.spotify.com/v1/users/{user_id}/playlists".format(user_id = USER_ID)
    headers = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=TOKEN)
    }
    
    # # Convert time to Unix timestamp in miliseconds      
    # today = datetime.datetime.now()
    # yesterday = today - datetime.timedelta(days=60)
    # yesterday_unix_timestamp = int(yesterday.timestamp()) * 1000

    # Download all playlists you've listened to "after yesterday", which means in the last 24 hours      
    # r = requests.get(endpoint, headers = headers)
    user_playlists_request = requests.get(endpoint, headers = headers)

    user_playlists = user_playlists_request.json()

    mixtape_choices = ["Daily Mix 1", "Daily Mix 2", "Daily Mix 3", "Daily Mix 4", "Daily Mix 5", "Daily Mix 6", "Discover Weekly", "Release Radar"]
    playlist_titles = {}
    for title in range(0, len(user_playlists['items'])) : 
        if user_playlists['items'][title]["name"] in mixtape_choices:
            playlist_titles[user_playlists['items'][title]["id"]] = user_playlists['items'][title]["name"]
    
    # playlist_dict = {}
    # playlist_data = {}
    # for playlist in range(0, len(playlist_titles)) :
    #     playlist_data = getPlaylist(playlistToken, user_playlists['items'][playlist]["id"])
    #     playlist_dict[playlist] = {user_playlists['items'][playlist]["id"] : {f'{playlist_titles[playlist]}'}} # [INDEX] -> ID : Name
    #     for track in range(0, len(playlist_data)):
    #         playlist_dict[playlist][playlist_titles[playlist]] = {playlist_data['tracks']['items'][track]['track']["name"] : playlist_data['tracks']['items'][track]['track']["id"]}
    
    print(playlist_titles)
    # print(playlist_dict)
    # playlist_url = []
    

    # # Extracting only the relevant bits of data from the json object      
    # for playlist in data:
    #     playlist_id.append(playlist["items"]["id"])
    #     playlist_names.append(playlist["items"][0]["name"])
    #     playlist_url.append(playlist["items"][0]["external_urls"]["spotify"])
    #     tracks[playlist].append(playlist["items"][0]["tracks"]["name"])
        
        
    # # Prepare a dictionary in order to turn it into a pandas dataframe below       
    # playlist_dict = {
    #     "playlist_id" : playlist_id,
    #     "playlist_name" : playlist_names,
    #     "playlist_url" : playlist_url,
    #     "tracks": tracks
    # }

    # playlist_df = pd.DataFrame(playlist_dict, columns = ["playlist_id", "playlist_name", "playlist_url", "tracks"])
    
    # print(playlist_df)

    # # Validate
    # if check_if_valid_data(playlist_df):
    #     print("Data valid, proceed to Load stage")

    # # engine = sqlalchemy.create_engine(DATABASE_LOCATION)
    # conn = sqlite3.connect('my_playlists.sqlite')
    # # cursor = conn.cursor()

    # # sql_query = """
    # # CREATE TABLE IF NOT EXISTS my_playlists(
    # #     playlist_name VARCHAR(200),
    # #     artist_name VARCHAR(200),
    # #     played_at VARCHAR(200),
    # #     timestamp VARCHAR(200),
    # #     CONSTRAINT primary_key_constraint PRIMARY KEY (played_at)
    # # )
    # # """

    # # sql_query_two = """insert or replace into my_playlists (playlist_name,artist_name,played_at,timestamp) values (?,?,?)"""

    # # cursor.execute(sql_query)
    # # cursor.execute(sql_query_two)

    # print("Opened database successfully")

    # try:
    #     playlist_df.to_sql("my_playlists", conn, index=False, if_exists='replace')
    # except:
    #     print("Data already exists in the database")

    # # df = pd.read_sql_query('SELECT * FROM my_playlists', conn, parse_dates=["playlist_name"])

    # conn.close()
    # print("Close database successfully")
    # # print(df.head)
    
    # # Job scheduling 
# def gettrackAudioFeatures(token, ids):
#     endpoint = "https://api.spotify.com/v1/audio-features?ids={ids}"
#     getHeader = {
#         "Accept" : "application/json",
#         "Content-Type" : "application/json",
#         "Authorization" : "Bearer {token}".format(token=token)
#     }

#     res = requests.get(endpoint, headers=getHeader)
#     track_features = res.json()
    
#     return track_features


