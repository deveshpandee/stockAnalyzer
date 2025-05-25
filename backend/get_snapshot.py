import requests

url = "https://api.brightdata.com/datasets/v3/snapshot/s_mb39pc7f1blbuqzv52"
headers = {
	"Authorization": "Bearer 0238d3a832ec41516747082a6d325b3d64c9701019e538b756507c4cd683ee8a",
}
params = {
	"format": "json",
}

response = requests.get(url, headers=headers, params=params)
print(response.json())