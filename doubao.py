
import os
from volcenginesdkarkruntime import Ark
from dotenv import load_dotenv
load_dotenv()

# 从环境变量中获取您的API KEY，配置方法见：https://www.volcengine.com/docs/82379/1399008
api_key = os.getenv('SECRET_KEY')
print("SECRET_KEY=",os.getenv("SECRET_KEY"))
print("API_KEY=",os.getenv("API_KEY"))
print(api_key)
client = Ark(
    base_url='https://ark.cn-beijing.volces.com/api/v3',
    api_key=api_key,
)

response = client.responses.create(
    model="doubao-seed-2-0-mini-260215",
#    input=[
#        {
#            "role": "user",
#            "content": [
#
#                {
#                    "type": "input_image",
#                    "image_url": "https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png"
#                },
#                {
#                    "type": "input_text",
#                    "text": "你看见了什么？"
#                },
#            ],
#        }
#    ]
#)
    input="hello",)
print(response)

