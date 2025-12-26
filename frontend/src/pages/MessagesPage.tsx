import { useState } from 'react';
import {
  Search,
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
} from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  read: boolean;
}

const mockChats: Chat[] = [
  { id: '1', name: 'John Doe', lastMessage: 'Привет! Как дела?', time: '12:30', unread: 2, online: true },
  { id: '2', name: 'Jane Smith', lastMessage: 'Отлично, спасибо!', time: '11:45', unread: 0, online: true },
  { id: '3', name: 'Alex Johnson', lastMessage: 'Увидимся завтра', time: 'Вчера', unread: 0, online: false },
  { id: '4', name: 'Maria Garcia', lastMessage: 'Фото отправлено', time: 'Вчера', unread: 0, online: false },
  { id: '5', name: 'Team Chat', lastMessage: 'Mike: Всем привет!', time: '2 дня', unread: 5, online: false },
];

const mockMessages: Message[] = [
  { id: '1', senderId: 'other', text: 'Привет! 👋', time: '12:25', read: true },
  { id: '2', senderId: 'me', text: 'Привет! Как твои дела?', time: '12:26', read: true },
  { id: '3', senderId: 'other', text: 'Отлично! Работаю над новым проектом. А ты?', time: '12:28', read: true },
  { id: '4', senderId: 'me', text: 'Тоже хорошо! Изучаю новые технологии 🚀', time: '12:29', read: true },
  { id: '5', senderId: 'other', text: 'Круто! Какие именно?', time: '12:30', read: false },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-border flex flex-col bg-surface">
        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 bg-surface-2 rounded-lg px-3 py-2">
            <Search size={18} className="text-text-muted" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-text-primary placeholder-text-muted w-full text-sm"
            />
          </div>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-surface-2 transition ${
                selectedChat?.id === chat.id ? 'bg-accent/10' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-semibold">{chat.name[0]}</span>
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-surface" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-text-primary truncate">{chat.name}</p>
                  <span className="text-xs text-text-muted">{chat.time}</span>
                </div>
                <p className="text-sm text-text-muted truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-semibold">{selectedChat.name[0]}</span>
                </div>
                {selectedChat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface" />
                )}
              </div>
              <div>
                <p className="font-medium text-text-primary">{selectedChat.name}</p>
                <p className="text-xs text-text-muted">
                  {selectedChat.online ? 'В сети' : 'Не в сети'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
                <Phone size={18} />
              </button>
              <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
                <Video size={18} />
              </button>
              <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
                <Info size={18} />
              </button>
              <button className="p-2 hover:bg-surface-2 rounded-lg text-text-secondary transition">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                    msg.senderId === 'me'
                      ? 'bg-accent text-white rounded-br-md'
                      : 'bg-surface-2 text-text-primary rounded-bl-md'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 ${
                    msg.senderId === 'me' ? 'justify-end' : ''
                  }`}>
                    <span className={`text-xs ${
                      msg.senderId === 'me' ? 'text-white/70' : 'text-text-muted'
                    }`}>
                      {msg.time}
                    </span>
                    {msg.senderId === 'me' && (
                      msg.read ? (
                        <CheckCheck size={14} className="text-white/70" />
                      ) : (
                        <Check size={14} className="text-white/70" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 bg-surface-2 rounded-xl px-4 py-2">
              <button className="p-2 hover:bg-surface rounded-lg text-text-secondary transition">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Написать сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-muted"
              />
              <button className="p-2 hover:bg-surface rounded-lg text-text-secondary transition">
                <Smile size={20} />
              </button>
              <button
                onClick={sendMessage}
                className="p-2 bg-accent hover:bg-accent-hover rounded-lg text-white transition"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-text-muted" />
            </div>
            <p className="text-text-primary font-medium">Выберите чат</p>
            <p className="text-text-muted text-sm">Выберите диалог из списка слева</p>
          </div>
        </div>
      )}
    </div>
  );
}

