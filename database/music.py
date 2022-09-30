# import json
# import requests
# import base64
# import pandas as pd
# from secrets import *

# from requests.api import head

# authUrl = "https://accounts.spotify.com/api/token"
# authHeader = {}
# authData = {}

# clientID = ""
# clientSecret = ""

# def getAccessToken(clientID, clientSecret):
#     message = f"{clientID}:{clientSecret}" 
#     message_bytes= message.encode('ascii') 
#     base64_bytes = base64.b64encode(message_bytes)  
#     base64_message = base64_bytes.decode('ascii')

#     # curl -X "POST" -H "Autorization: Basic Zj....Y0NDQ=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

#     authHeader['Authorization'] = "Basic " + base64_message
#     authData['grant_type'] = "client_credentials"

#     res = requests.post(authUrl, headers=authHeader, data=authData)

#     print(res) 

#     responseObject = res.json() 

#     accessToken = responseObject['access_token']

#     return accessToken

# token = getAccessToken(clientID, clientSecret)

# def getTrackFeatures(token, data):
#     import pandas as pd
#     import numpy as np

#     # 음악 쿼리를 링크로 변환하는 API (Search)
#     data = data.replace(' ', '%20')
#     endpoint = f"	https://api.spotify.com/v1/search?q={data}&type=track&market=KR&limit=1"

#     getHeader = {
#         "Authorization" : "Bearer " + token
#     }

#     res_q = requests.get(endpoint, headers=getHeader)
#     track = res_q.json()
#     track = track["tracks"]["items"][0]["external_urls"]["spotify"]

#     # 음악 링크 -> 데이터로 바꿔주는 API (Tracks)
#     data = track.split("track/")[1].split("?")[0]
#     endpoint_f = f"	https://api.spotify.com/v1/audio-features/{data}"
#     endpoint_i = f"	https://api.spotify.com/v1/tracks/{data}?market=US"



#     res_f = requests.get(endpoint_f, headers=getHeader)
#     res_i = requests.get(endpoint_i, headers=getHeader)

#     dict_data = {}
#     dict_info = {}
#     track_features = res_f.json()
#     track_info = res_i.json()

#     dict_data['danceability'] = track_features['danceability']
#     dict_data['acousticness'] = track_features['acousticness']
#     dict_data['energy'] = track_features['energy']
#     dict_data['key'] = track_features['key']
#     dict_data['liveness'] = track_features['liveness']
#     dict_data['loudness'] = track_features['loudness']+60
#     dict_data['mode'] = track_features['mode']
#     dict_data['speechiness'] = track_features['speechiness']
#     dict_data['tempo'] = track_features['tempo']
#     dict_data['valence'] = track_features['valence']
#     dict_data['popularity'] = track_info['popularity']
#     df_data = pd.DataFrame([dict_data])


#     # dict_info['artist']  = track_info
#     dict_info['artist'] = track_info['artists'][0]['name']
#     dict_info['image_url'] = track_info['album']['images'][1]['url']
#     dict_info['song'] = track_info['name']
#     return dict_info, df_data

