import { useState } from "react";
import io from "socket.io-client";
const App = () => {
  const socket = io("http://localhost:3001");

  const [messages, setMessages] = useState([]);
  const [sendingMessage, setsendingMessage] = useState("");
  let sendMessage = (sendingMessage) => {
    socket.emit("sendMessage", { data: sendingMessage });
    setMessages(renderMessage(sendingMessage));
  };
  let renderMessage = (msg) => {
    return (
      <>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{msg}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      </>
    );
  };

  return (
    <div className="container h-screen mx-auto  px-5 border-4 border-indigo-200 border-x-indigo-500 flex flex-col justify-between overflow-y-auto">
      <h2 className="font-mono text-indigo-200 font-bold text-xl p-3 underline">
        Private Chatter App<span className="text-sm"> (Oneday made)</span>
      </h2>
      <div>{messages}</div>
      <div className="">
        <input
          type="text"
          placeholder="Send Messages"
          className="input input-bordered input-primary my-5 p-5 w-full"
          value={sendingMessage}
          onChange={(e) => {
            setsendingMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              sendMessage(sendingMessage);
            }
          }}
        />
      </div>
    </div>
  );
};

export default App;
