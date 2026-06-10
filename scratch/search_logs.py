import os
import json

log_path = "/Users/piotrjuskowiak/.gemini/antigravity-ide/brain/0980e094-ecf7-4bd2-8b3e-243e698df3c3/.system_generated/logs/transcript.jsonl"
if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                step = data.get("step_index", 0)
                if step == 362 or step == 363:
                    print(f"--- Step {step} ---")
                    print(f"Type: {data.get('type')}")
                    output = data.get("content", "")
                    if output:
                        print(f"Content:\n{output}")
            except Exception as e:
                pass
else:
    print("Log file does not exist")
