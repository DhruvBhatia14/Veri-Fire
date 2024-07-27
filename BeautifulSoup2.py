import requests
from bs4 import BeautifulSoup

url = 'https://www.bbc.com/news/us-canada'

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find all article headlines
headlines = soup.find_all(['h3', 'h2', 'h1'])

update = {}

for headline in headlines:
    title = headline.text.strip()
    if 'wildfire' in title.lower():
        link = headline.find_parent('a')
        if link:
            full_link = f"https://www.bbc.com{link['href']}"
            if "jasper" in title.lower():
                update[title] = full_link
                # print(f"Headline: {title}")
                # print(f"Link: {full_link}\n")

print("Scraping complete. If no results were shown, no wildfire-related headlines were found.")
# print(update)

for head in update.keys():
    print(head, end="") 
    print("=>", update[head])