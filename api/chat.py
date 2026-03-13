from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = FastAPI()

# 允许跨域（你的前端域名）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://b1syyyy.vercel.app/","http://localhost:3001","http://localhost:3000","https://b1syyyy.online","http://www.b1syyyy.online","https://localhost:8000/api/chat"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")   # 注意路径要写全，因为最终访问的是 /api/chat
async def chat_with_ai(request: Request):
    # 你的处理逻辑，和之前一样
    data = await request.json()
    user_message = data.get("prompt")
    # ... 调用火山方舟 ...
    return {"reply": "prompt received: " + user_message}  # 这里替换成实际的AI回复

# 不需要 if __name__ == "__main__"