from fastapi import FastAPI,Request,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import json
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, Request
import httpx
import os
from volcenginesdkarkruntime import Ark

app = FastAPI()

#ku==跨域配置  这个middleware相当于小区门禁 所有数据从这里通过
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://b1syyyy.vercel.app/","http://localhost:3001","http://localhost:3000","https://b1syyyy.online","http://www.b1syyyy.online","https://localhost:8000/api/chat"],#允许访问的域名（前端地址）
    allow_credentials=True,
    allow_methods=["*"],#允许所有方式的请求
    allow_headers=["*"],#允许所有请求头
)

#替换自己的火山方舟密钥
load_dotenv()
ACCESS_KEY=os.getenv("ACCESS_KEY")
SECRET_KEY=os.getenv("SECRET_KEY")
AI_API_URL=os.getenv("ARK_API_URL")
MODEL_ID=os.getenv("MODEL_ID")
#AI对话接口


@app.post("/api/chat")
async def chat_with_ai(request: Request):
    try:
        data = await request.json()
        user_message = data.get("prompt") or data.get("nromnt")  # 兼容两种字段名
        if not user_message:
            raise HTTPException(status_code=400, detail="请输入内容")

        headers = {
            "Authorization": f"Bearer {ACCESS_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model":os.getenv("MODEL_ID"),
            "messages": [{"role": "user", "content": user_message}]
        }

        async with httpx.AsyncClient() as client:
            resp = await client.post(AI_API_URL, json=payload, headers=headers, timeout=30)
            print("响应状态码",resp.status_code)
            print("响应文本",resp.text)
            result = resp.json()

        # 提取 AI 回复
        ai_reply = result.get("choices", [{}])[0].get("message", {}).get("content", "无回复")
        return {"reply": ai_reply}  # 与前端约定的字段名

    except HTTPException as e:
        return {"code": e.status_code, "msg": e.detail}
    except Exception as e:
        print("后端错误:", str(e))  # 打印到终端
        return {"code": 500, "msg": f"服务器错误: {str(e)}"}

