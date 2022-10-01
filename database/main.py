from contextlib import nullcontext
import copy
import sqlite3
from textwrap import indent
from xml.etree.ElementTree import tostring
# from flask import Flask
# import sqlalchemy
import pandas as pd 
# from sqlalchemy.orm import sessionmaker
import requests
import json
from datetime import datetime
import datetime
# from keyvalue_sqlite import KeyValueSqlite
import base64

CLIENT_ID = "7ece4bb7979f433ab4a0a604bc2f97b5"
CLIENT_SECRET = "3e59cc5912dc4a47b39f7fc2db529366"

DATABASE_LOCATION = "sqlite:///my_playlists.sqlite"
USER_ID = "22io3oxgaphrgsxto4naqh4ai"

# Get New ID here -> https://developer.spotify.com/console/get-playlists/
USER_PLAYLISTS_TOKEN = "BQAWqVMfKv6t5oPjLJRcBkcXbNx2Eqgd9GJlcYi0UD1f9eLif3oFgawJ5E3XK6lrfTuW9W_tsCwZasDlcZVnlKUfRcQylEaEstfXRfYrR4JLJuzOXV3kr8KEimW74L-JjtnNZ3xjltV0_8SPOgemq29ifuGZMmw1DI05KDXmmGqvSwIOvNYnlgizMmT7RYdyFA2BD_lDe9OjiEAQLvU" # your Spotify API token

# Get New ID here -> https://developer.spotify.com/console/get-playlist/
PLAYLIST_TOKEN = "BQBlgOJSB5SiEZkmM79XiWdl46ZIIHC6y8KHhk8L8azplAkS0bEFFNsELbtilqjISIIYdtuEGekk230D_8DWWiK-QD1fyGp_CrhvZarXFdpmRhpLcuzFUrUHofOftRcrtCfgKunAVgqW8vHvZjF5N6RIvIJyaPCAFZCR4MeUjsEmJGAr8bWWaSXDJHMfvANnn0s"

def getAccessToken(clientID, clientSecret):
    message = f"{clientID}:{clientSecret}" # secret.py에 사용자 정보 불러오기
    message_bytes= message.encode('ascii') # 메세지 ascii code로 인코딩
    base64_bytes = base64.b64encode(message_bytes)  
    base64_message = base64_bytes.decode('ascii')

    # print(base64_message) 
    # curl -X "POST" -H "Autorization: Basic Zj....Y0NDQ=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
    # 반드시 Basic 뒤에 한칸 뛰어야 합니다.
    endpoint = "https://accounts.spotify.com/api/token"
    headers = {
        "Accept" : "application/json",
        "Authorization" : "Bearer {token}".format(token=base64_message),
        "Content-Type" : "application/json",
    }
    data = {
         "grant_type" : "client_credentials",
    }
    user_playlists_request = requests.get(endpoint, headers = headers, data = data)

    # print(user_playlists_request) # <Response [200]> 
    # responseObject = user_playlists_request.json() # json 
    # accessToken = responseObject['access_token']

    return user_playlists_request

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
        "Authorization" : "Bearer {token}".format(token=token),
        "Content-Type" : "application/json"
    }
    user_playlists_request = requests.get(endpoint, headers = headers)

    user_playlists = user_playlists_request.json()

    return user_playlists

#  TODO: need to find away to access user Liked Songs playlist
def getLikedSongs():
    endpoint = "https://api.spotify.com/v1/{user_id}/tracks".format(user_id = USER_ID)
    headers = {
        "Accept" : "application/json",
        "Authorization" : "Bearer {token}".format(token=USER_PLAYLISTS_TOKEN),
        "Content-Type" : "application/json"
    }
    user_playlists_request = requests.get(endpoint, headers = headers)

    user_playlists = user_playlists_request.json()

    return user_playlists

def getUserPlaylis(token, id):
    endpoint = "https://api.spotify.com/v1/users/{user_id}/playlists".format(user_id = id)
    headers = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=token)
    }

    user_playlists_request = requests.get(endpoint, headers = headers)
    user_playlists = user_playlists_request.json()

    mixtape_choices = ["Daily Mix 1", "Daily Mix 2", "Daily Mix 3", "Daily Mix 4", "Daily Mix 5", "Daily Mix 6", "Discover Weekly", "Release Radar"]
    playlist_titles = {}
    for title in range(0, len(user_playlists['items'])) : 
        if user_playlists['items'][title]["name"] in mixtape_choices:
            playlist_titles[user_playlists['items'][title]["id"]] = user_playlists['items'][title]["name"]
    return playlist_titles




if __name__ == "__main__":
    # Extract part of the ETL process
    playlist_titles = getUserPlaylis(USER_PLAYLISTS_TOKEN, USER_ID)
    playlist_dict = {}
    playlist_data = {}
    for playlist in range(0, len(playlist_titles)) :
        playlist_data = getPlaylist(PLAYLIST_TOKEN, list(playlist_titles.keys())[playlist])  # get songs with ids
        tracks = {}
        for track in range(0, len(playlist_data)):
            tracks.update({playlist_data['tracks']['items'][track]['track']["name"] : playlist_data['tracks']['items'][track]['track']["id"]})
        playlist_dict[list(playlist_titles.keys())[playlist]] = {list(playlist_titles.values())[playlist] : tracks}
        
    # print(playlist_titles)
    print(json.dumps(playlist_dict, indent = 4))
    # songs = getLikedSongs()
    # print(songs)
    # print(getAccessToken(CLIENT_ID, CLIENT_SECRET))
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
    # print(df.head)
    
    # Job scheduling 
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


