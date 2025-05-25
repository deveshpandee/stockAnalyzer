import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()

proxy_host = os.getenv("PROXY_HOST")
proxy_port = os.getenv("PROXY_PORT")
proxy_user = os.getenv("PROXY_USER")
proxy_pass = os.getenv("PROXY_PASS")

def fetch_google_news_json(query="apple stock", number=10):
    if not all([proxy_host, proxy_port, proxy_user, proxy_pass]):
        raise ValueError("One or more proxy environment variables are missing.")

    proxies = {
        "http": f"http://{proxy_user}:{proxy_pass}@{proxy_host}:{proxy_port}",
        "https": f"http://{proxy_user}:{proxy_pass}@{proxy_host}:{proxy_port}",
    }

    url = f"https://www.google.com/search?q={query.replace(' ', '+')}&tbm=nws&hl=en&start=number&brd_json=1"
    response = requests.get(url, proxies=proxies, verify=False)

    if response.status_code == 200:
        data = response.json()
        titles = [article['title'] for article in data.get('news', [])]
        # print(titles)
        return titles
    else:
        raise Exception(f"Request failed with status code {response.status_code}")
    

def extract_fundamentals(ticker):
    url = f"https://finviz.com/quote.ashx?t={ticker}"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    data = {}
    table = soup.find("table", class_="snapshot-table2")
    if table:
        rows = table.find_all("tr")
        for row in rows:
            cells = row.find_all("td")
            for i in range(0, len(cells), 2):
                label = cells[i].text
                value = cells[i+1].text
                data[label] = value
    
    fundamentals = {
        "PE Ratio": data.get("P/E"),
        "EPS (ttm)": data.get("EPS (ttm)"),
        "Return on Equity": data.get("ROE"),
        "Market Cap": data.get("Market Cap"),
        "Debt/Eq": data.get("Debt/Eq"),
        "Gross Margin": data.get("Gross Margin"),
    }
    # print(fundamentals)
    return fundamentals


def fetch_news_data(stock_name):
    return fetch_google_news_json(query=f"{stock_name} stock latest news")

def fetch_technical_data(stock_name):
    return fetch_google_news_json(query=f"{stock_name} stock technical analysis site:investing.com OR site:tradingview.com")

def fetch_fundamental_data(stock_name):
    return extract_fundamentals(stock_name)

def fetch_social_data(stock_name):
    return fetch_google_news_json(query=f"{stock_name} stock site:reddit.com OR site:twitter.com")

def fetch_insider_data(stock_name):
    return fetch_google_news_json(query=f"{stock_name} insider trading OR insider transactions OR form 4 site:sec.gov")


def fetch_event_data(stock_name):
    news_headlines = []

    if not all([proxy_host, proxy_port, proxy_user, proxy_pass]):
        raise ValueError("One or more proxy environment variables are missing.")

    proxies = {
        "http": f"http://{proxy_user}:{proxy_pass}@{proxy_host}:{proxy_port}",
        "https": f"http://{proxy_user}:{proxy_pass}@{proxy_host}:{proxy_port}",
    }
    query=f"{stock_name} stock earnings OR launch OR acquisition OR event OR report"
    url = f"https://www.google.com/search?q={query.replace(' ', '+')}&tbm=nws&hl=en&start=20&brd_json=1"
    response = requests.get(url, proxies=proxies, verify=False)

    if response.status_code == 200:
        data = response.json()
        # Extracting titles and date from the JSON response
        titles = [{"title": article['title'], "date":article['date']} for article in data.get('news', [])]
        # print(titles)
        news_headlines.extend(titles)
    else:
        raise Exception(f"Request failed with status code {response.status_code}")
    # news_headlines = fetch_google_news_json(query=f"{stock_name} stock earnings OR launch OR acquisition OR event OR report", number=20)
    
    events = []
    # print(news_headlines)
    for headline in news_headlines:
        if "earnings" in headline["title"].lower():
            events.append({
                "type": "Earnings Report",
                "time": headline["date"],
                "description": headline["title"]
            })
        elif "launch" in headline["title"].lower():
            events.append({
                "type": "Product Launch",
                "time": headline["date"],
                "description": headline["title"]
            })
        elif "acquisition" in headline["title"].lower() or "merger" in headline["title"].lower():
            events.append({
                "type": "M&A Activity",
                "time": headline["date"],
                "description": headline["title"]
            })
    
    return events
