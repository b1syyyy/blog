'use client'; // 必须放在文件最顶部
// require('dotenv').config(); // 引入组件样式
const port  = process.env.PORT || 3000; // 设置端口号
const AI_API_URL =
  process.env.NEXT_PUBLIC_AI_API_URL ||
  'https://ark.cn-beijing.volces.com/api/v3' // 替换成你的Vercel AI接口地址
import { useState, useRef, useEffect } from 'react';

// 悬浮AI对话框组件（TSX版）
const AIchat = () => {
  // 状态管理：对话框显隐、输入内容、对话列表
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string }>>([]);
  const [loading, setLoading] = useState(false);
  
  // 对话区域滚动到底部
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 替换成你的Vercel AI接口地址
  //const AI_API_URL = 'https://ark.cn-beijing.volces.com/api/v3'
  const AI_API_URL =
  process.env.NEXT_PUBLIC_AI_API_URL;

  // 发送消息逻辑
  const sendMessage = async () => {
    const prompt = inputValue.trim();
    if (!prompt || loading) return;

    // 添加用户消息
    const newUserMsg = { type: 'user', content: prompt };
    setMessages(oldList => [...(oldList || []), { type: 'user' as const, content: prompt }]);
    setInputValue('');
    setLoading(true);

    try {
      // 调用Vercel AI接口
      //const res = await fetch(process.env.NEXT_PUBLIC_AI_API_URL, {
       const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
if (!apiUrl) {
  throw new Error('环境变量 NEXT_PUBLIC_AI_API_URL 未设置');
}
      const res=await fetch(apiUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json();

//const text = await res.text();
//console.log("原始响应",text);
//let data;
//try{
//  data=JSON.parse(text)
//}catch(e){
//  console.error(e) ;
//    console.error("JSON解析失败",e);
//    setMessages(prev => [...prev,{type: 'ai', content: "服务器返回无效格式"}]);
//  return
//}

      // 添加AI回复
//      let aiContent = '';
//      if (data.code == 0) {
//        aiContent = data.answer;
//      } else {
//        aiContent = data.msg || '出错了，请重试';
//      }
//      setMessages(prev => [...prev, { type: 'ai', content: aiContent }]);
//
      const aiContent = data.reply || '无回复';
      setMessages(prev => [...prev, { type: 'ai', content: aiContent }]);
    } catch (err) {
      setMessages(prev => [...prev, { type: 'ai', content: '网络错误，请重试' }]);
    } finally {
      setLoading(false);
    }
  };

  // 回车发送
  console.log('API URL:',process.env.NEXT_PUBLIC_AI_API_URL);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  // 点击外部关闭对话框
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ai-chat-plugin') && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // 对话区域自动滚动到底部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="ai-chat-plugin">
      {/* 悬浮按钮 */}
      <button 
        className="ai-chat-btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        AI
      </button>

      {/* 对话框（根据isOpen控制显隐） */}
      <div className="ai-chat-box" style={{ display: isOpen ? 'flex' : 'none' }}>
        {/* 对话内容区域 */}
        <div className="ai-chat-content" ref={contentRef}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`ai-msg ${msg.type === 'user' ? 'user-msg' : 'ai-msg'}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="loading">正在思考...</div>}
        </div>

        {/* 输入区域 */}
        <div className="ai-chat-input-area">
          <input
            type="text"
            className="ai-chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="问我点什么..."
            disabled={loading}
          />
          <button 
            className="ai-chat-send" 
            onClick={sendMessage}
            disabled={loading}
          >
            发送
          </button>
        </div>
      </div>

      {/* 组件内联样式（避免单独建CSS文件，插件式更方便） */}
      <style jsx>{`
        .ai-chat-plugin {
          position: fixed;
          right: 30px;
          bottom: 30px;
          z-index: 9999;
        }
        .ai-chat-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #5c5c5c;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .ai-chat-box {
          width: 320px;
          height: 400px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .ai-chat-content {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #fafafa;
        }
        .ai-chat-input-area {
          padding: 10px;
          border-top: 1px solid #eee;
          display: flex;
          gap: 8px;
        }
        .ai-chat-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
        }
        .ai-chat-send {
          padding: 8px 16px;
          border: none;
          background: #b4b7ba;
          color: white;
          border-radius: 20px;
          cursor: pointer;
        }
        .ai-msg {
          margin: 8px 0;
          padding: 8px 12px;
          border-radius: 12px;
          max-width: 80%;
        }
        .user-msg {
          background: #409eff;
          color: white;
          margin-left: auto;
        }
        .ai-msg {
          background: white;
          border: 1px solid #eee;
        }
        .loading {
          color: #999;
          text-align: center;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default AIchat