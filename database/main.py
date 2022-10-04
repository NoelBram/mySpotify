from contextlib import nullcontext
import copy
from distutils.log import error
from pyexpat.model import XML_CTYPE_ANY
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
USER_PLAYLISTS_TOKEN = "BQBkjR6NT3Stt-8SxTmWs_-86SAnegsLlLpEytdJhK4SjxyY5r8s5RPr9qhlDA3ONG8HyXACdhEdWyFzY6NiuFkMzLu9wzMBVaLYe53LgJLiqTT8_5lFtf7LhCkMzBkiZ0cQDw8P5UTP3sG3jtxr6ioPnOvz4jIXIHt711Smx51ZctObCf4jCJVaMnfwpndneHLOWh5JRkDb_ukH_2c"

# Get New ID here -> https://developer.spotify.com/console/get-playlist-tracks/
PLAYLISTS_TOKEN = "BQD-X2c9Lob2zOuha2mJ_e1SXHe1CKaFpQ9DuM20QyRsccUwfXn4L8URLlaaO351jJdVfDYX2I2OGuVmsG-n8eBsCFm9TVuf_ksEDuQeTrSd3X9siWLDDiciXlYWXTvNr9PNq2oFCgHNJzw2Uu9pga2FI3rohOzDx0hzNqhT65MTJ5xzZGdjWaS_DLEbGeK5erYr8Owq014qaYq3"

# Get New ID here -> https://developer.spotify.com/console/get-playlist-tracks/
PLAYLIST_ITEMS_TOKEN = ""

def getAccessToken(clientID, clientSecret):
    client_id_and_secret = '{client_id}:{client_secret}'.format(client_id=clientID, client_secret=clientSecret)
    client_data = base64.urlsafe_b64encode(client_id_and_secret.encode()).decode()

    endpoint = "https://accounts.spotify.com/api/token"
    headers = {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': 'Basic {}'.format(client_data)}
    payload = {'grant_type': 'client_credentials'}
    access_token_request = requests.post(endpoint, headers=headers, data=payload)

    responseObject = access_token_request.json()
    access_token = responseObject['access_token']

    return access_token

# def apiGetSpotify(ep):
#     access_token = getAccessToken(CLIENT_ID, CLIENT_SECRET)
#     if ep.startswith("https://"):
#         endpoint = ep
#     else:
#         endpoint = 'https://api.spotify.com/v1/' + ep

#     headers = {'Authorization': 'Bearer ' + access_token}

#     try:
#         response = requests.get(endpoint, headers=headers, verify=False)
#     except Exception as ex:
#         print("err - common.py - apiGetSpotify3 --> " + str(type(ex)) + " - " + str(ex.args) + " - " + str(ex))
#         return ''
#     return response.json()

# def check_if_valid_data(df: pd.DataFrame) -> bool:
#     # Check if dataframe is empty
#     if df.empty:
#         print("No playlists downloaded. Finishing execution")
#         return False 

#     # Primary Key Check
#     if pd.Series(df['played_at']).is_unique:
#         pass
#     else:
#         raise Exception("Primary Key check is violated")

#     # Check for nulls
#     if df.isnull().values.any():
#         raise Exception("Null values found")

#     # # Check that all timestamps are of yesterday's date
#     # yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
#     # yesterday = yesterday.replace(hour=0, minute=0, second=0, microsecond=0)

#     # timestamps = df["timestamp"].tolist()
#     # for timestamp in timestamps:
#     #     if datetime.datetime.strptime(timestamp, '%Y-%m-%d') != yesterday:
#     #         raise Exception("At least one of the returned playlists does not have a yesterday's timestamp")
#     return True

def getLikedTracks(token, id):
    offset = 0
    tracks = {}
    while offset < 10000:
        endpoint = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks?offset={offset}&limit=10".format(playlist_id = id, offset = offset)
        headers = {
            "Accept" : "application/json",
            "Authorization" : "Bearer {token}".format(token=token),
            "Content-Type" : "application/json"}

        user_playlists_request = requests.get(endpoint, headers = headers)
        user_playlists = user_playlists_request.json()
        for track in range(0, len(user_playlists)):
            try:
                tracks.update({user_playlists['items'][track]['track']["id"] : user_playlists['items'][track]['track']["name"]})  # TRACK_NAME : TRACK_ID
            except IndexError: break
            else: continue
        offset += 10
    return tracks

LIKED_TRACKS = getLikedTracks(PLAYLISTS_TOKEN, "2OoFqFk4QYnb6DFwifnqlG") 

def getTracks(token, id):
    offset = 0
    tracks = {}
    while offset < 100:
        endpoint = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks?offset={offset}&limit=10".format(playlist_id = id, offset = offset)
        headers = {
            "Accept" : "application/json",
            "Authorization" : "Bearer {token}".format(token=token),
            "Content-Type" : "application/json"}

        user_playlists_request = requests.get(endpoint, headers = headers)
        user_playlists = user_playlists_request.json()
        for track in range(0, len(user_playlists)):
            try:
                if user_playlists['items'][track]['track']["id"] not in LIKED_TRACKS.keys():
                    tracks.update({user_playlists['items'][track]['track']["id"] : user_playlists['items'][track]['track']["name"]})  # TRACK_NAME : TRACK_ID
            except IndexError: break
            else: continue
        offset += 10
    return tracks


#  TODO: need to find away to access user Liked Songs playlist
# def getPlaylistItems(id):
#     endpoint = "https://api.spotify.com/v1/{playlist_id}/tracks?offset=0&limit=50".format(playlist_id = id)
#     headers = {
#         "Accept" : "application/json",
#         "Authorization" : "Bearer {token}".format(token=token),
#         "Content-Type" : "application/json"
#     }
#     user_playlists_request = requests.get(endpoint, headers = headers)

#     user_playlists = user_playlists_request.json()

#     return user_playlists

# def getTracksFromLikedList():
#     print("msg - common.py - getTracksFromLikedList --> requesting tracks from liked list.") 
#     liked_tracks = apiGetSpotify("me/tracks?offset=0&limit=50")

    
#     '''--> check response before continuing'''
#     if liked_tracks == '':
#         print("err - common.py - getTracksFromLikedList2 --> empty api response for liked tracks!")
#         return ''


#     try:
#         '''--> check pagination - fill resultlist'''
#         resultList = []
#         total = liked_tracks["total"]
#         limit = liked_tracks["limit"]
#         offset = liked_tracks["offset"]

#         while offset < total:
#             for track in liked_tracks["items"]:
#                 if track["track"]["id"]: #check if valid item
#                     resultList.append(track["track"]["id"]) #add track ID to resultList
#             offset = offset + limit
#             if offset < total: #new request
#                 liked_tracks = apiGetSpotify("me/tracks?offset=" + str(offset) + "&limit=" + str(limit))
#                 if liked_tracks == '': #invalid api response
#                     print("err - common.py - getTracksFromLikedList3 --> empty api response for liked tracks!")
#                     return ''
#                 continue

#         print("msg - common.py - getTracksFromLikedList4 --> Succesfully returned list of " + str(len(resultList)) + " tracks from liked list.")
#         return resultList

#     except Exception as ex:
#         print("err - common.py - getTracksFromLikedList5 --> " + str(type(ex)) + " - " + str(ex.args) + " - " + str(ex))
#         return ''

def getUserPlaylists(token, id):
    endpoint = "https://api.spotify.com/v1/users/{user_id}/playlists/".format(user_id = id)
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
            playlist_titles.update({user_playlists['items'][title]["id"] : user_playlists['items'][title]["name"]})  # PLAYLIST_ID : PLAYLIST_NAME
    playlist_dict = {}
    for playlist in range(0, len(playlist_titles)) :
        tracks = getTracks(PLAYLISTS_TOKEN, list(playlist_titles.keys())[playlist])  
        playlist_dict.update({playlist : {"id":list(playlist_titles.keys())[playlist], "name":list(playlist_titles.values())[playlist], "tracks":tracks}}) 
        # INDEX : {
        #     TRACK_ID :  
        #     TRACK_NAME :
        #     TRACK_TRACKS : {Track_ID : track_title}}
 
    return json.dumps(playlist_dict, indent = 4)


if __name__ == "__main__":
    print(getUserPlaylists(USER_PLAYLISTS_TOKEN, USER_ID))
    # print(getTracks(PLAYLISTS_TOKEN, "2OoFqFk4QYnb6DFwifnqlG"))
    # print(getTracksFromLikedList())
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