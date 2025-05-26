from fastapi import APIRouter
from analyzers.news import analyze_news
from analyzers.technical import analyze_technical
from analyzers.fundamental import analyze_fundamental
from analyzers.social import analyze_social
from analyzers.insiders import analyze_insider
from fetchers import fetch_event_data
from fastapi import HTTPException

router = APIRouter()

@router.get("/analyze/news/{stock_name}")
async def analyze_news_route(stock_name: str):
    return analyze_news(stock_name)

@router.get("/analyze/technical/{stock_name}")
async def analyze_technical_route(stock_name: str):
    return analyze_technical(stock_name)

@router.get("/analyze/fundamental/{stock_name}")
async def analyze_fundamental_route(stock_name: str):
    return analyze_fundamental(stock_name)

@router.get("/analyze/social/{stock_name}")
async def analyze_social_route(stock_name: str):
    return analyze_social(stock_name)

@router.get("/analyze/insider/{stock_name}")
async def analyze_insider_route(stock_name: str):
    return analyze_insider(stock_name)

@router.get("/events/{stock_symbol}")
async def get_events(stock_symbol: str):
    try:
        events = fetch_event_data(stock_symbol)
        if events: 
            return {"stock": stock_symbol.upper(), "events": events}
    except Exception as e:
        raise HTTPException(status_code=404, detail="No events found for this stock.")