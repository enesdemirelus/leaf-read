import requests
import json

url = "https://www.googleapis.com/books/v1/volumes?q=project+hail+mary"

response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    title = author = data["items"][0]["volumeInfo"]["title"]
    author = data["items"][0]["volumeInfo"]["authors"][0]
    isbn = data["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"]

else:
    print(f"error fetching data: {response.status_code}")
    
image_url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
print(image_url)