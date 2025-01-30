import requests
import json
import re

def generate_mindmap(topic):
    """
    Sends a request to the local LLM server to generate Mermaid mind map code
    """
    url = "http://localhost:1234/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    
    system_msg = """You are a mind map generator. Create Mermaid.js code for a mind map 
    based on the user's topic. Follow these rules:
    1. Use proper Mermaid mindmap syntax
    2. Start with 'mindmap' root node
    3. Use 2-space indentation for hierarchy
    4. Return ONLY the mermaid code wrapped in ```mermaid blocks
    5. Keep nodes concise (max 3-4 words)"""
    
    payload = {
        "model": "llama-3.2-3b-instruct",
        "messages": [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": f"Topic: {topic}"}
        ],
        "temperature": 0.7,
        "max_tokens": -1
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        content = response.json()['choices'][0]['message']['content']
        
        # Extract mermaid code from markdown blocks
        code_match = re.search(r'```mermaid(.*?)```', content, re.DOTALL)
        return code_match.group(1).strip() if code_match else content
    except requests.exceptions.RequestException as e:
        return f"Error connecting to API: {e}"

def main():
    print("=== Mind Map Generator ===")
    topic = input("Enter your main topic: ").strip()
    
    if not topic:
        print("Topic cannot be empty!")
        return
    
    print("\nGenerating mind map...\n")
    mermaid_code = generate_mindmap(topic)
    
    print("=== Mermaid Code ===")
    print(mermaid_code)
    print("\nYou can visualize this code at: https://mermaid.live/")

if __name__ == "__main__":
    main()