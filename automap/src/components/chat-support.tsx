"use client"

import { Button } from "./ui/button";
import { Send } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";

export default function ChatSupport() {
  const { setNodes, setEdges, fitView } = useReactFlow();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    onResponse(response) {
      if (response) {
        setIsGenerating(false);
      }
    },
    onError(error) {
      if (error) {
        setIsGenerating(false);
      }
    },
  });

  let messageId = 1;
  
  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    handleSubmit(e);
    submitMindmapTopic();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input) return;
      setIsGenerating(true);
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const submitMindmapTopic = async() => {
    const topic = input;
    if( topic.length === 0 ) return;
    
    await handleSubmit();
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${messageId++}`,
          role: "assistant",
          content: "Creating mind map\.\.\.",
        },
      ]);
    }, 250);

    // clear mind map
    setNodes([]);
    setEdges([]);

    // log what topic it has received
    console.log("mindmap topic: ", topic);
    try{
      const response = await fetch("http://localhost:3002/generate-mindmap", {
          method: 'POST',
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({topic})
      })
  
      const response_correct = await response.json();
      if (response_correct.nodes && response_correct.edges){
        // set nodes and edges and center mind map
        setNodes(response_correct.nodes);
        setEdges(response_correct.edges);
        fitView({ padding: 0.2 });

        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "Here is the mind map on "+topic+"!",
          },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `${messageId++}`,
              role: "assistant",
              content: "What else would you like to create a mind map of?",
            },
          ]);
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching mindmap data:", error);
    }
  };

  return (
    <ExpandableChat size="lg" position="bottom-right">
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Build A New Mind Map 🧠</h1>
        <p>Ask our AI to create a mind map on any topic!</p>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList ref={messagesRef}>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="🤖"/>
            <ChatBubbleMessage>{"Hello! 👋"}</ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="🤖"/>
            <ChatBubbleMessage>{"What would you like to create a mind map of?"}</ChatBubbleMessage>
          </ChatBubble>

          {messages &&
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                variant={message.role == "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  src=""
                  fallback={message.role == "user" ? "😊" : "🤖"}
                />
                <ChatBubbleMessage
                  variant={message.role == "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form ref={formRef} className="flex relative gap-2" onSubmit={handleSubmit}>
          <ChatInput value={input} onChange={handleInputChange} onKeyDown={onKeyDown} className="min-h-12 bg-background shadow-none "/>
          <Button type="submit" onClick={() => submitMindmapTopic()} size="icon" className="bg-black hover:bg-blue-600" disabled={isLoading || isGenerating || !input}>
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}