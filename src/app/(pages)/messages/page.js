'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

function getStoredConversations() {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('conversations');
  return saved ? JSON.parse(saved) : [];
}

function saveConversations(conversations) {
  localStorage.setItem('conversations', JSON.stringify(conversations));
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(getStoredConversations);
  const [activeConv, setActiveConv] = useState(null);
  const [message, setMessage] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeConv);

  const sendMessage = () => {
    if (!message.trim() || !activeConv) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: 'me',
      senderName: user?.name || 'Moi',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
    };

    const updated = conversations.map((conv) => {
      if (conv.id === activeConv) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message.trim(),
          lastTime: newMessage.timestamp,
        };
      }
      return conv;
    });

    setConversations(updated);
    saveConversations(updated);
    setMessage('');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-sm text-gray-500 mb-4">Connectez-vous pour accéder à vos messages.</p>
        <Link href="/login" className="bg-[#B5533E] text-white text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#333] border border-gray-200 rounded-full px-4 py-2 w-fit hover:border-[#B5533E] transition">
        <Image src="/images/Back.svg" alt="" width={16} height={16} />
        Retour
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold text-[#333]">Messages</h1>

      <div className="flex flex-col md:flex-row gap-4 min-h-[500px]">
        {/* Liste des conversations */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">Aucune conversation</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition cursor-pointer ${
                  activeConv === conv.id ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                  {conv.picture && (
                    <Image src={conv.picture} alt={conv.name} fill className="object-cover" sizes="40px" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#333] truncate">{conv.name}</span>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{conv.lastTime}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread && (
                  <div className="w-2.5 h-2.5 bg-[#B5533E] rounded-full shrink-0" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Zone de conversation */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col">
          {activeConversation ? (
            <>
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4">
                {activeConversation.messages.map((msg, index) => {
                  const showDate = index === 0 || activeConversation.messages[index - 1]?.date !== msg.date;
                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="flex items-center gap-3 my-4">
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-xs text-gray-400">{msg.date}</span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      )}
                      <div className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender !== 'me' && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-200">
                            {activeConversation.picture && (
                              <Image src={activeConversation.picture} alt={activeConversation.name} fill className="object-cover" sizes="32px" />
                            )}
                          </div>
                        )}
                        <div className={`max-w-xs sm:max-w-sm ${msg.sender === 'me' ? 'order-first' : ''}`}>
                          <div className={`flex items-center gap-2 mb-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                            <span className="text-xs text-gray-500">{msg.senderName}</span>
                            <span className="text-xs text-gray-400">• {msg.timestamp}</span>
                          </div>
                          <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                            msg.sender === 'me'
                              ? 'bg-[#B5533E] text-white rounded-br-sm'
                              : 'bg-gray-100 text-[#333] rounded-bl-sm'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                        {msg.sender === 'me' && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-200">
                            {user?.picture && (
                              <Image src={user.picture} alt="Moi" fill className="object-cover" sizes="32px" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex items-end gap-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Envoyer un message"
                    rows={2}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition resize-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-10 h-10 bg-[#B5533E] text-white rounded-full flex items-center justify-center hover:opacity-90 transition cursor-pointer shrink-0"
                  >
                    <Image src="/images/Send.svg" alt="Envoyer" width={18} height={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400">Sélectionnez une conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}