from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import asyncio

app = FastAPI()

class GenerateCustomersRequest(BaseModel):
    context: str
    locale: str
    sendTxns: bool
    enableLogging: bool

@app.post("/generate-customers")
async def generate_customers(request: GenerateCustomersRequest):
    cmd = [
        "python3", "generate-customers.py",
        "--context", request.context,
        "--locale", request.locale,
        "--sendTxns" if request.sendTxns else "",
        "--enableLogging" if request.enableLogging else ""
    ]

    try:
        # Remove empty strings from cmd list
        cmd = [arg for arg in cmd if arg]

        # Run the script as a subprocess
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Script error: {stderr.decode()}")

        return {"message": "Script executed successfully", "output": stdout.decode()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
