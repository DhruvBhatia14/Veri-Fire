import requests
from bs4 import BeautifulSoup
from WebScraping import scrape_and_summarize

def BBC(url, keyword):
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
                if keyword in title.lower():
                    update[title] = full_link
                    # print(f"Headline: {title}")
                    # print(f"Link: {full_link}\n")

    # print("Scraping complete. If no results were shown, no wildfire-related headlines were found.")
    for head in update.keys():
        print(head, end="") 
        print("=>", update[head])
        print(scrape_and_summarize(update[head]))

def NYT(url, keyword):
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
                full_link = f"https://www.nytimes.com{link['href']}"
                if keyword in title.lower():
                    update[title] = full_link
                    # print(f"Headline: {title}")
                    # print(f"Link: {full_link}\n")

    # print("Scraping complete. If no results were shown, no wildfire-related headlines were found.")
    for head in update.keys():
        print(head, end="") 
        print("=>", update[head])
        print(scrape_and_summarize(update[head]))

BBC('https://www.bbc.com/news/us-canada', "jasper")
NYT('https://www.nytimes.com/section/world/canada', "jasper")
