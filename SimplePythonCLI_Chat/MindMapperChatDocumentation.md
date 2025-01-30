# Mind Map Generator Documentation

A CLI tool that generates Mermaid.js mind maps using local LLMs via LMStudio.

## Overview
This tool creates structured mind maps based on user input topics by leveraging the llama-3.2-3b-instruct model through a local LLM server. The generated output is valid Mermaid.js code that can be visualized using online editors or documentation tools.

## Prerequisites
- Python 3.6+
- `requests` package installed
- LMStudio running locally with:
  - llama-3.2-3b-instruct model loaded
  - Server active at `http://localhost:1234`
 
  **Setup**:  
1. Install LM Studio → [lmstudio.ai](https://lmstudio.ai)  
2. Download `llama-3.2-3b-instruct` directly on lmstudio  
3. In LM Studio:  
   - Load model  
   - Go to **Server** tab → Start (port 1234)  


## Components

### 1. Model Information
- **Model**: `llama-3.2-3b-instruct`
- **Type**: 3.2B parameter instruct-tuned LLM
- **Publisher**: Meta
- **Capabilities**: Good at structured output generation and following formatting instructions

### 2. Code Structure
mindmap_generator.py
├── generate_mindmap(topic)
│ └── Sends API request to LMStudio
│ - Creates system prompt with formatting rules
│ - Handles API communication
│ - Extracts Mermaid code from response
└── main()
└── CLI interface
- Collects user input
- Displays results
- Provides visualization suggestion

Copy

## How It Works

### Step 1: System Prompt Setup
The script sends a structured prompt with:
- Mermaid syntax requirements
- Hierarchy rules (2-space indentation)
- Output formatting instructions
- Node length restrictions

### Step 2: API Communication
- Connects to LMStudio's local API endpoint
- Sends JSON payload with:
  - Model specification
  - Temperature setting (0.7 for balance)
  - Conversation history

### Step 3: Response Processing
1. Extracts generated content from JSON response
2. Uses regex to parse Mermaid code blocks
3. Returns clean output ready for visualization

## Setup & Usage

### Installation
```bash
pip install requests
Running the Tool

Start LMStudio and load the model
Start local server in LMStudio (port 1234)
Run script:
bash
Copy
python mindmap_generator.py
Workflow

Enter your main topic when prompted
Script sends query to local LLM
Returns formatted Mermaid code
Copy-paste code to Mermaid Live Editor
Example Output

Copy
=== Mind Map Generator ===
Enter your main topic: Renewable Energy

Generating mind map...

=== Mermaid Code ===
mindmap
  Renewable Energy
    Solar Power
      Photovoltaic Cells
      Solar Farms
    Wind Energy
      Offshore Turbines
      Land-Based Turbines
    Hydropower
      Dams
      Tidal Energy
    Challenges
      Storage Solutions
      Grid Integration
Customization Options

Adjust temperature in code (0.0-1.0)
Higher = more creative, Lower = more focused
Modify system_msg for:
Different node structures
Alternative formatting rules
Specialized terminology
Limitations

Requires local model server running
Output quality depends on model capabilities
Complex topics may require manual refinement
Maximum response length constrained by model context
