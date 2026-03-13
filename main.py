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
    allow_origins=["https://b1syyyy.vercel.app/","http://localhost:3001","http://localhost:3000","http://b1syyyy.online","http://www.b1syyyy.online","https://localhost:8000/api/chat"],#允许访问的域名（前端地址）
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
#@app.post("/api/chat")
#async def chat_with_ai(request: Request):#贴标签 告诉程序需要传Request类型的变量
#    try:
#        data=await request.json()#接收用户发来的json字典
#        prompt=data.get("prompt")#从字典中取出prompt
#
#        if not prompt or len(prompt)==0:
#            raise HTTPException(status_code=400,detail="请输入内容")
#
#        headers={
#            "Content-Type": "application/json",
#            #"AccessKey": ACCESS_KEY,
#            #"SecretKey": SECRET_KEY,
#            "Authorization": f"Bearer {ACCESS_KEY}"
#        }
#        client=Ark(
#    base_url='https://ark.cn-beijing.volces.com/api/v3',
#    api_key=ACCESS_KEY,
#)
#
#
#        body={
#        "model":"doubao-seed-2-0-mini-260215",
#            "massages":[{"role":"user","input":prompt}],
#           # "temperature":0.7,
#            "max_tokens":1000
#        }
#        response = requests.post(
#            AI_API_URL,
#            headers=headers,
#            data=json.dumps(body),
#            timeout=30
#        )# 超时时间，避免服务器卡壳
#
#        response.raise_for_status()
#        ai_data = client.response.json()
#        # 提取回答
#        answer = ai_data["choices"][0]["message"]["content"]
#        return {"code":0,"msg":"success","answer":answer}
#    except HTTPException as e:
#        #主动抛出的参数错误
#        return {"code":e.status_code,"msg":e.detail}
#    except Exception as e:
#        #其他异常
#        return {"code":0,"msg":"服务正在正常运行"}
#@app.get("/api/health")#当客户端访问health的时候返回值会自动转换为json格式
#async def health_check():
#    return {"code":0,"msg":"ok"}


# 本地允许 服务器启动配置（关键！让服务可外网访问）
# host="0.0.0.0"：允许服务器外网访问（不是仅本地127.0.0.1）
# port=8000：服务端口（可自定义，如80/3000）
# reload=False：生产环境关闭热重载（更稳定）

#if __name__ == "__main__":

#     uvicorn.run(app="main:app",host="0.0.0.0",port=8000,reload=False)

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



print("所有环境变量",os.environ)