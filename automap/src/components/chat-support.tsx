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
import { layout } from "./layout";

enum Options {
  ALL,
  CREATE,
  CHANGE,
  INVALID,
}

enum Status {
  OPTIONS,
  NEW,
  UPDATE,
  GENERATING,
}
let chatStatus: Status = Status.NEW;
let currentTopic: string = "";

export default function ChatSupport() {
  const { setNodes, setEdges, getNodes, getEdges, fitView } = useReactFlow();
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
    processUserInput();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input || chatStatus == Status.GENERATING) return;
      setIsGenerating(true);
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const sendOptions = (option: Options) => {
    if(option == Options.CREATE) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "What would you like to create a mind map of?",
          },
        ]);
      }, 500);
    } else if(option == Options.CHANGE) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "What would you like to change?",
          },
        ]);
      }, 500);
    } else if(option == Options.ALL) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "Would you like to create a new mind map or change something about your current mind map?",
          },
        ]);
      }, 500);
    } else if(option == Options.INVALID) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "I'm sorry, I don't seem to understand\.\.\. ",
          },
        ]);
      }, 500);
      sendOptions(Options.ALL);
    }
  }

  const processUserInput = () => {
    if(chatStatus == Status.NEW) {
      submitMindmapTopic();
    } else if(chatStatus == Status.UPDATE) {
      submitMindmapUpdate();
    } else if(chatStatus == Status.OPTIONS) {
      processOptions();
    }
  }

  const processOptions = () => {
    const request = input.toLowerCase();
    if(request.includes("change")) {
      sendOptions(Options.CHANGE);
      chatStatus = Status.UPDATE;
    } else if(request.includes("create")) {
      console.log(request);
      console.log(request.includes("create"));
      sendOptions(Options.CREATE);
      chatStatus = Status.NEW;
    } else {
      sendOptions(Options.INVALID);
    }
  }

  const submitMindmapTopic = async() => {
    const topic = input;
    if( topic.length === 0 ) return;
    currentTopic = topic;

    chatStatus = Status.GENERATING;
    await handleSubmit();
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${messageId++}`,
          role: "assistant",
          content: "Creating mind map\.\.\. ✏️",
        },
      ]);
    }, 250);

    setNodes([]);
    setEdges([]);

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
        setNodes(response_correct.nodes);
        setEdges(response_correct.edges);
        setTimeout(() => layout(getEdges, setNodes, fitView), 0);
        
        chatStatus = Status.OPTIONS;
        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "Here is the mind map on "+topic+"!",
          },
        ]);
        sendOptions(Options.ALL);
      }
    } catch (error) {
      console.error("Error fetching mindmap data:", error);
    }
  };

  const submitMindmapUpdate = async() => {
    let need = input;
    if( need.length === 0 ) return;

    chatStatus = Status.GENERATING;
    await handleSubmit();
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${messageId++}`,
          role: "assistant",
          content: "Updating mind map\.\.\. 🔨",
        },
      ]);
    }, 250);

    try{
      let response = await fetch("http://localhost:3002/update-mindmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          need: need,
          nodes: getNodes(),
          edges: getEdges(),
          topic: currentTopic,
        })

      });

      const response_correct = await response.json();
        if (response_correct.nodes && response_correct.edges) {
        let newnodes = response_correct.nodes;
        let newedges = response_correct.edges;
        setNodes(newnodes);
        setEdges(newedges);
        setTimeout(() => layout(getEdges, setNodes, fitView), 0);
        
        chatStatus = Status.OPTIONS;
        setMessages((prev) => [
          ...prev,
          {
            id: `${messageId++}`,
            role: "assistant",
            content: "Here is the updated mind map on "+currentTopic+"!",
          },
        ]);
        sendOptions(Options.ALL);
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
          <Button type="submit" onClick={() => processUserInput()} size="icon" className="bg-black hover:bg-blue-600" disabled={isLoading || isGenerating || !input || chatStatus == Status.GENERATING}>
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}