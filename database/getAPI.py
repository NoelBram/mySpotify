import json
import requests
import base64
from secrets import *

from requests.api import head

authUrl = "https://accounts.spotify.com/api/token"
authHeader = {}
authData = {}

def getAccessToken(clientID, clientSecret):
    message = f"{clientID}:{clientSecret}" # secret.py에 사용자 정보 불러오기
    message_bytes= message.encode('ascii') # 메세지 ascii code로 인코딩
    base64_bytes = base64.b64encode(message_bytes)  
    base64_message = base64_bytes.decode('ascii')

    # print(base64_message) 
    # curl -X "POST" -H "Autorization: Basic Zj....Y0NDQ=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

    authHeader['Authorization'] = "Basic " + base64_message
    authData['grant_type'] = "client_credentials"

    res = requests.post(authUrl, headers=authHeader, data=authData)

    print(res) # <Response [200]> 

    responseObject = res.json() # json 파일화 시키기
    # print(json.dumps(responseObject, indent=2))  # indent 옵션 : JSON 문자열을 읽기 편하게 할 필요가 있을 경우

    # 토큰을 받았으면, 아래와 같이 토큰을 가져올 수 있습니다.

    accessToken = responseObject['access_token']

    return accessToken

token = getAccessToken(clientID, clientSecret)

# print(token)
# access_token = ??

"""
## Find Tracks Audio Functions
Link  : https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

"""

# def getTrackFunctions(token, id):
#     endpoint = f"http://api.spotify.com/v1/audio-features/{id}"

#     getHeader = {
#         "Authorization" : "Bearer " + token
#     }
#     res = requests.get(endpoint, headers=getHeader)

#     trackinfo = res.json()

#     return trackinfo

# id = "2g0LdZQce9xlcHb1mBJyuz"
# trackInfo = getTrackFunctions(token, id)

# with open('trackinfo.json','w') as f: #json 파일로 저장
#     json.dump(trackInfo, f)


# -------------------------------------

user_id = ""

def getUserPlaylist(token, user_id): 
    endpoint = f"https://api.spotify.com/v1/users/{user_id}/playlists"
    getHeader = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=token)
    }
       
    
    res_users = requests.get(endpoint, headers=getHeader)
    users_plists = res_users.json()

    plist_titles = []
    for plist_title in range(0, len(users_plists['items'])) : 
        plist_titles.append(users_plists['items'][plist_title]["name"])

    plist_dict = {}
    for i in range(0, len(plist_titles)) :
        plist_dict[f'{plist_titles[i]}'] = users_plists['items'][i]["id"]

    del plist_dict['saturday morning baking <33']
    del plist_dict['riot grrrl ']
    del plist_dict['happy brain chemicals go brrr ']
    del plist_dict['armin\'s playlist']

    return plist_dict, users_plists

plist_dicts, users_plists  = getUserPlaylist(token, user_id)

with open(f'./json_data/MBTI_plist1.json','w') as f:
    json.dump(plist_dicts, f)


def getPlaylistTracks(token, playlist_id):
    endpoint = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    getHeader = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=token)
    }

    res = requests.get(endpoint, headers=getHeader)
    playlist_track = res.json()

    return playlist_track


pli_track = {}
track_dic = {}

for i in range(0, len(list(plist_dicts.values()))):
    tracks = getPlaylistTracks(token, list(plist_dicts.values())[i])
    for j in range(0, len(tracks['items'])):
        track_dic[f'{j}'] = tracks['items'][j]['track']['id']
    # with open(f'./json_data/mbti_track/{list(plist_dicts.keys())[i].split()[0]}.json','w') as f:
    #     json.dump(track_dic, f)
    pli_track[f"{list(plist_dicts.keys())[i].split()[0]}"] = track_dic


# with open(f'./json_data/mbti_track/mbti_tracks.json','w') as f:
#    json.dump(pli_track, f)

def gettrackAudioFeatures(token, ids):
    endpoint = "https://api.spotify.com/v1/audio-features?ids={ids}"
    getHeader = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=token)
    }

    res = requests.get(endpoint, headers=getHeader)
    track_features = res.json()
    
    return track_features