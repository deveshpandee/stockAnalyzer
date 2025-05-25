from google import genai
import os
import re
from dotenv import load_dotenv
from fetchers import extract_fundamentals

def analyze_fundamental(stock_name):
    load_dotenv()
    api_key = os.getenv('api_key')
    if not api_key:
        raise ValueError("API key not found in environment.")

    client = genai.Client(api_key=api_key)

    fundamentals = extract_fundamentals(stock_name)
    if not fundamentals or all(v is None for v in fundamentals.values()):
        return {
            "stock": stock_name,
            "decision": "Uncertain",
            "confidence_level": "Low",
            "reason": "No fundamental data available."
        }

    formatted_fundamentals = "\n".join([f"- {key}: {value}" for key, value in fundamentals.items() if value])

    prompt = f"""
You are a financial analysis assistant.

You will be given some fundamental data for a specific stock. Based on this information, assess whether it's a good time to invest in the stock.

Please provide your response strictly in the following format:
Decision: Yes / No / Uncertain  
Confidence: High / Medium / Low  
Reason: Provide a clear, concise explanation in 2–3 sentences. Write as if advising an investor directly.

Here are the insider activity updates for {stock_name}:
{formatted_fundamentals}
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
