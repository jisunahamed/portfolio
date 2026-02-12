import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { usePortfolioDataReadOnly } from "@/hooks/usePortfolioData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatWidget = () => {
  const { data, isLoaded } = usePortfolioDataReadOnly();
  const { chatSettings, hero } = data;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message when data is loaded
  useEffect(() => {
    if (isLoaded && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: chatSettings.welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isLoaded, chatSettings.welcomeMessage, messages.length]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate unique session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("chat_session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      sessionStorage.setItem("chat_session_id", sessionId);
    }
    return sessionId;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Check if webhook URL is configured
    if (chatSettings.webhookUrl) {
      try {
        const response = await fetch(chatSettings.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input.trim(),
            sessionId: getSessionId(),
            timestamp: new Date().toISOString(),
          }),
        });

        const data = await response.json();
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || data.response || data.message || "I received your message!",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again or contact directly via email.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } else {
      // Demo responses when no webhook is configured
      const responses = [
        `I'd be happy to help with that! ${hero.name} specializes in AI automation and workflow solutions. Would you like to schedule a consultation?`,
        `Great question! Our automation solutions can save your business 20+ hours per week. Let me connect you with ${hero.name} to discuss your specific needs.`,
        `That's exactly the kind of project ${hero.name} excels at! He's built similar solutions for many clients. Want to learn more?`,
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
      return;
    }

    setIsLoading(false);
  };

  if (!isLoaded || !chatSettings.enabled) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              key="chat-button"
              data-chat-trigger
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open chat assistant"
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/30 flex items-center justify-center group active:scale-95 transition-transform"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" aria-hidden="true" />
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" aria-hidden="true" />

              {/* Notification dot */}
              <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-accent rounded-full border-2 border-background flex items-center justify-center" aria-hidden="true">
                <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-accent-foreground" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] sm:max-w-[calc(100vw-48px)] bg-background sm:rounded-2xl border-0 sm:border sm:border-border/50 shadow-2xl flex flex-col overflow-hidden"
            style={{
              height: '100dvh',
              maxHeight: '100dvh',
            }}
          >
            {/* Header - Mobile optimized */}
            <div className="flex items-center justify-between px-4 py-3 sm:p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 via-background to-secondary/10 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                {/* Back button for mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden h-10 w-10 -ml-2 text-foreground"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <div className="relative">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>

                <div>
                  <h3 className="font-semibold text-base">{chatSettings.botName}</h3>
                  <p className="text-xs text-muted-foreground">
                    Usually replies instantly
                  </p>
                </div>
              </div>

              {/* Close button - Desktop only */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hidden sm:flex text-muted-foreground hover:text-foreground h-10 w-10 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 py-4 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-background via-background to-muted/20">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index === messages.length - 1 ? 0.1 : 0
                  }}
                  className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[75%] ${message.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 shadow-lg shadow-primary/20"
                        : "bg-muted/80 backdrop-blur-sm text-foreground rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-border/30"
                      }`}
                  >
                    <p className="text-sm sm:text-[15px] leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] sm:text-xs mt-1.5 ${message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 sm:gap-3 items-end"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="bg-muted/80 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-border/30">
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area Group */}
            <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl">
              {/* Quick Replies - Integrated above input */}
              {messages.length <= 1 && (
                <div className="px-3 sm:px-4 pt-3 pb-1 overflow-x-auto no-scrollbar">
                  <div className="flex gap-2 whitespace-nowrap">
                    {["Services", "Pricing", "Contact"].map((quick) => (
                      <motion.button
                        key={quick}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setInput(`Tell me about your ${quick.toLowerCase()}`);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-full transition-colors"
                      >
                        {quick}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Field */}
              <div className="p-3 sm:p-4">
                <div className="relative flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 bg-muted/40 border-0 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 focus:bg-muted/60 transition-all placeholder:text-muted-foreground/50"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 shrink-0"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-muted-foreground/40 font-medium tracking-wider uppercase">
                    Powered by AI Assistant
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
