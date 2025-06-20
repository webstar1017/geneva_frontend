"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { useFingerprint } from "./FingerPrint";
import useIsMobile from "@/components/useIsMobile";
import Playground from "./Playground";
import LLMTitleSearch from "./LLMTitleSearch";

export function LLMAggregator() {
  const themes = [
    "dark",
    "light",
    "image"
  ];
  const fingerprint = useFingerprint();
  const router = useRouter();
  const { theme, setTheme } = useTheme()
  const [waitingAnswer, setWaitingAnswer] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [hideSideBar, setHideSideBar] = useState(true);
  const abortControllerRef = useRef(null);
  const waitingRef = useRef(null);
  const inputRef = useRef(null);
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);


  const askQuestion = (query) => {
    let chat_id = localStorage.getItem('chat_id');
    const question = query;
    const history = filterList;
    const textarea = inputRef.current;
    textarea.style.height = 'auto';        // Reset height
    textarea.style.height = '44px';
    setWaitingAnswer(true);

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    if (!chat_id) chat_id = Math.floor(Date.now() / 1000);
    setChatHistory((prevList) => [...prevList, {
      type: 'question',
      chat_id: chat_id,
      text: question,
      level: 'question'
    }]);
    setFilterList((prevList) => [...prevList, { type: 'question', chat_id: chat_id, text: question, level: 'question' }]);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/openai/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: signal,
      body: JSON.stringify({ user_id: fingerprint, chat_id: chat_id, question: question, history: history })
    }).then((response) => {
      // if (!response.ok) {
      //   throw new Error('error');
      // }
      return false;
    }).then((response) => {
      setWaitingAnswer(false);
      if (!response) return;
      if (response.level.includes('product')) {
        if (response.level == 'compare_product') {
          const final_answer = JSON.parse(response.answer);
          console.log(final_answer);
          console.log(final_answer);
          setChatHistory((prevList) => [...prevList, {
            user_id: fingerprint,
            type: response.level,
            chat_id: chat_id,
            text: final_answer['answer'],
            level: response.level,
            status_report: response.status_report,
            opinion: response.opinion,
            product: final_answer['products']
          }]);
          setFilterList((prevList) => [...prevList, {
            user_id: fingerprint,
            type: response.level,
            chat_id: chat_id,
            text: final_answer['answer'],
            level: response.level,
            status_report: response.status_report,
            opinion: response.opinion,
            product: final_answer['products'],
            verify_top_open: false,
            verify_bottom_open: false
          }]);
        } else {
          setChatHistory((prevList) => [...prevList, {
            user_id: fingerprint,
            type: response.level,
            chat_id: chat_id,
            text: '',
            level: response.level,
            status_report: response.status_report,
            opinion: response.opinion,
            product: JSON.parse(response.answer)
          }]);
          setFilterList((prevList) => [...prevList, {
            user_id: fingerprint,
            type: response.level,
            chat_id: chat_id,
            text: '',
            level: response.level,
            status_report: response.status_report,
            opinion: response.opinion,
            product: JSON.parse(response.answer),
            verify_top_open: false,
            verify_bottom_open: false
          }]);
        }
      } else {
        setChatHistory((prevList) => [...prevList, {
          user_id: fingerprint,
          type: 'answer',
          chat_id: chat_id,
          text: response.answer,
          level: response.level,
          status_report: response.status_report,
          opinion: response.opinion,
          product: []
        }]);
        setFilterList((prevList) => [...prevList, {
          user_id: fingerprint,
          type: 'answer',
          chat_id: chat_id,
          text: response.answer,
          level: response.level,
          status_report: response.status_report,
          opinion: response.opinion,
          product: [],
          verify_top_open: false,
          verify_bottom_open: false
        }]);
      }
      if (!localStorage.getItem('chat_id')) {
        localStorage.setItem('chat_id', chat_id);
        setChatList((prevList) => [...prevList, {
          user_id: fingerprint,
          type: 'question',
          chat_id: chat_id,
          text: question
        }]);
      }

    }).catch((error) => {
      console.error(error);
      setWaitingAnswer(false);
    });
  }



  const changeTheme = () => {
    // setTheme(theme === 'dark' ? 'light' : 'dark')
    const themeIndex = themes.findIndex(item => item === theme);
    setTheme(themes[(themeIndex + 1) % 3]);
  }

  const loadChatHistory = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat-history/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: fingerprint, })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }
      return response.json();
    }).then((response) => {
      console.log(response);
      const history = [];
      response.map((item) => {
        history.push({
          user_id: item.user_id,
          type: 'question',
          chat_id: item.chat_id,
          status_report: item.status_report,
          opinion: item.opinion,
          level: item.level,
          text: item.question,
          product: []
        });
        if (item.level.includes('product')) {
          if (item.level == 'compare_product') {
            const final_answer = JSON.parse(item.answer);
            console.log(final_answer);
            history.push({
              user_id: item.user_id,
              type: item.level,
              chat_id: item.chat_id,
              status_report: JSON.parse(item.status_report),
              opinion: item.opinion,
              level: item.level,
              text: final_answer['answer'],
              product: final_answer['products']
            });
          } else {
            history.push({
              user_id: item.user_id,
              type: item.level,
              chat_id: item.chat_id,
              status_report: JSON.parse(item.status_report),
              opinion: item.opinion,
              level: item.level,
              text: '',
              product: JSON.parse(item.answer)
            });
          }
        } else {
          history.push({
            user_id: item.user_id,
            type: 'answer',
            chat_id: item.chat_id,
            status_report: JSON.parse(item.status_report),
            opinion: item.opinion,
            level: item.level,
            text: item.answer,
            product: []
          });
        }
      })
      setChatHistory(history);
      console.log(history);
      if (history.length > 0) {
        const lastChat = Math.max(...history.map(chat => chat.chat_id));
        const filteredList = history
          .filter(chat => chat.chat_id == lastChat)
          .map(chat => ({
            ...chat,
            verify_top_open: false,
            verify_bottom_open: false
          }));
        setFilterList(filteredList)
        const list = history.filter(
          (chat, index, self) =>
            self.findIndex(c => c.chat_id === chat.chat_id) === index
        );
        setChatList(list);
        localStorage.setItem('chat_id', lastChat);
      } else {
        localStorage.removeItem('chat_id');
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const changeChatId = (id) => {
    const filteredList = chatHistory
      .filter(chat => chat.chat_id == id)
      .map(chat => ({
        ...chat,
        verify_top_open: false,
        verify_bottom_open: false
      }));
    setFilterList(filteredList)
    localStorage.setItem('chat_id', id);
    const width = window.innerWidth;
    if (width < 640) {
      setHideSideBar(true);
    }
  }

  const addNewChatId = () => {
    setFilterList([]);
    const textarea = inputRef.current;
    textarea.style.height = 'auto';        // Reset height
    textarea.style.height = '44px';
    localStorage.removeItem('chat_id');
  }

  const deleteChatHistory = (id, user_id) => {
    if (user_id == fingerprint) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat-history/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: fingerprint, chat_id: id })
      }).then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      }).then((response) => {
        localStorage.removeItem('chat_id');
        setChatHistory((prevList) => prevList.filter(chat => chat.chat_id != id));
        setChatList((prevList) => prevList.filter(chat => chat.chat_id != id));
        setFilterList([]);
      }).catch((error) => {
        console.error(error);
      })
    } else {
      toast.error(`You don't have permission`);
    }
  }

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 640) {
      setHideSideBar(false);
    }
    localStorage.removeItem('chat_id');
  }, [])

  useEffect(() => {
    if (fingerprint) {
      loadChatHistory();
    }
  }, [fingerprint]);

  useEffect(() => {
    waitingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filterList])

  return (
    <div className="flex h-screen font-goudy">
      {!hideSideBar && (
        <div
          className="fixed sm:hidden inset-0 bg-black/50 z-40"
          onClick={() => setHideSideBar(true)}
        />
      )}
      {/* Sidebar */}
      <div ref={scrollRef}
        className={`
            fixed top-0 left-0 z-50
            overflow-y-auto
            w-[300px] h-full py-4 gap-3
            !bg-white !text-black
            transform transition-transform duration-300 ease-in-out
            ${hideSideBar ? '-translate-x-full' : 'translate-x-0'}
          `}
      >
        <div className="flex flex-col items-center gap-3 overflow-y-auto">
          <div className="absolute top-0 right-0 px-2 pt-3 cursor-pointer" onClick={() => setHideSideBar(true)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30]">
              <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div className="text-center flex flex-col gap-2">
            <img src="/image/logo.png" alt="logo" className="w-[80] mx-auto" />
            <span className="text-2xl font-semibold">Geneva</span>
          </div>
          <img src="/image/x.svg" alt="x" className="w-[24] cursor-pointer" />
          <img src="/image/editor.svg" alt="x" className="w-[24] cursor-pointer" onClick={addNewChatId} />
          <img src="/image/llm-icons.png" alt="x" className="w-[80%] cursor-pointer" onClick={addNewChatId} />
          <div align="center">
            <img src="/image/top-button.png" className="w-[40px] cursor-pointer"
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }
              }}
            />
          </div>
          <div className="w-[100%]" align="center">
            <LLMTitleSearch
              setSearch={setSearch}
            />
            <div className="relative">
              <img src="/image/search.png" width={15} style={{ position: "absolute", left: "35px", top: " -20px" }} />
            </div>
          </div>
        </div>
        <div className="w-full px-4 gap-2 flex flex-col mt-5">
          {chatList.filter((item) => item.text.indexOf(search) > -1).map((item, index) => {
            return (
              <div key={index} className="relative group w-full">
                <Button
                  key={index}
                  className="w-full bg-[#DCEAF7] hover:bg-[#DCEAF7] text-black overflow-hidden"
                  onClick={() => changeChatId(item.chat_id)}
                >
                  <span className="block text-center text-xl truncate mx-5">
                    {item.text}
                  </span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src="/image/trash.svg"
                      onClick={(e) => e.stopPropagation()} // Prevent other click handlers
                      className="absolute w-[14px] right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent
                    className="bg-[length:100%_100%] bg-no-repeat bg-center border-none shadow-[10px_1px_20px_1px_black] px-0 rounded-4xl [&>button]:hidden font-goudy text-xl ring-0">
                    <DialogHeader className="items-center">
                      <DialogTitle className="text-xl">delete chat?</DialogTitle>
                      <hr className="mt-4 !border-[#D4F8E5] w-full" />
                    </DialogHeader>
                    <div className="justify-self-center">
                      this will delete the conversation & history
                    </div>
                    <DialogFooter className="gap-20 flex !justify-center">
                      <DialogClose asChild>
                        <div
                          className="bg-white text-black w-[60px] hover:bg-black hover:text-white text-center rounded-sm py-1 shadow-[2px_2px_2px_black] cursor-pointer">
                          back
                        </div>
                      </DialogClose>
                      <DialogClose>
                        <div
                          className="bg-white text-black w-[60px] hover:bg-black hover:text-white text-center rounded-sm py-1 shadow-[2px_2px_2px_black] cursor-pointer"
                          onClick={() => deleteChatHistory(item.chat_id, item.user_id)}>
                          yes
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )
          })}
        </div>
        <div align="center">
          <img src="/image/bottom-button.png" className="w-[50px] cursor-pointer"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  top: scrollRef.current.scrollHeight,
                  behavior: 'smooth',
                });
              }
            }} />
        </div>

      </div>
      <div
        style={{
          background: `url(/image/background-${theme}${isMobile ? "-mobile" : ""}.png)`,
        }}
        className={`
          background-image
          flex-1 flex flex-col
          transition-all duration-300 ease-in-out
          ${hideSideBar ? 'ml-0' : 'ml-0 sm:ml-[300px]'}
        `}
      >
        <header className="flex justify-between items-center px-8 py-2">
          <div className="flex gap-3">
            {hideSideBar && <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ color: theme === "light" ? "black" : "white" }}
              className="w-[30] self-start mt-1 cursor-pointer"
              onClick={() => setHideSideBar(false)}>
              <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round"></path>
              <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
            </svg>}
            <div className="flex flex-col gap-4">
              <p className="underline decoration-[#D4F8E5] decoration-2 underline-offset-[10px] text-2xl cursor-pointer"
                style={{ color: theme === "light" ? "black" : "white" }}
                onClick={() => router.push('/marketplace')}>marketplace</p>
              <img src="/image/boom.png" alt="x" className="w-[20] self-end cursor-pointer"
                onClick={() => router.push('/marketplace')} />
            </div>
          </div>
          <img
            src="/image/theme.png"
            alt="theme"
            onClick={changeTheme}
            className="w-[40] h-auto scale-x-[-1] cursor-pointer"
          />
        </header>
        <Playground
          theme={theme}
          filterList={filterList}
          waitingAnswer={waitingAnswer}
          setFilterList={setFilterList}
          inputRef={inputRef}
          askQuestion={askQuestion}
          waitingRef={waitingRef}
        />
      </div>
    </div>
  );
}
