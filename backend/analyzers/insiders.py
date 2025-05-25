from google import genai
import os
import re
from dotenv import load_dotenv
from fetchers import fetch_insider_data

def analyze_insider(stock_name):
    load_dotenv()
    api_key = os.getenv('api_key')
    if not api_key:
        raise ValueError("API key not found in environment.")

    client = genai.Client(api_key=api_key)

    headlines = fetch_insider_data(stock_name)
    if not headlines:
        return {"stock": stock_name, "decision": "Uncertain", "confidence_level": "Low", "reason": "No insider activity data found."}

    formatted = "\n".join([f"- {h}" for h in headlines[:10]])

    prompt = f"""
You are a financial analysis assistant.

You will be given up to 10 recent updates about insider activity for a specific stock. Your task is to determine whether this activity suggests it is a good time to invest.

Please respond **strictly** in the following format:
Decision: Yes / No / Uncertain  
Confidence: High / Medium / Low  
Reason: Provide a clear and concise explanation in 2–3 sentences. If there is no meaningful or recent insider activity found in public sources, say: "At this time, there is no publicly visible insider activity available to support an investment decision." Do not speculate or refer to document links or sources like EDGAR. Write as if directly advising an investor.
    
Here are the recent insider activity updates for {stock_name}:
{formatted}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"role": "user", "parts": [{"text": prompt}]}]
        )

        if not response or not response.text:
            return {
                "stock": stock_name,
                "decision": "Uncertain",
                "confidence_level": "Low",
                "reason": "Try checking stock name or try again later."
            }

        raw = response.text.strip()
        decision = re.search(r"Decision:\s*(Yes|No|Uncertain)", raw, re.IGNORECASE)
        confidence = re.search(r"Confidence:\s*(High|Medium|Low)", raw, re.IGNORECASE)
        reason = re.search(r"Reason:\s*(.*)", raw, re.IGNORECASE | re.DOTALL)

        return {
            "stock": stock_name,
            "decision": decision.group(1).capitalize() if decision else "Uncertain",
            "confidence_level": confidence.group(1).capitalize() if confidence else "Low",
            "reason": reason.group(1).strip() if reason else raw
        }

    except Exception as e:
        return {
            "stock": stock_name,
            "decision": "Uncertain",
            "confidence_level": "Low",
            "reason": str(e)
        }
