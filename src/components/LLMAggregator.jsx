"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import toast from 'react-hot-toast';
import MarkdownRenderer from "./MarkdownRenderer";
import { useFingerprint } from "./FingerPrint";
import useIsMobile from "@/components/useIsMobile";

export function LLMAggregator() {
  const themes = [
    "dark",
    "light",
    "image"
  ];
  const fingerprint = useFingerprint();
  const router = useRouter();
  const {theme, setTheme} = useTheme()
  const [query, setQuery] = useState('');
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

  // Function to handle the auto resizing of the textarea
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height before recalculating
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  };

  const handleCancel = (index) => {
    const filter_list = JSON.parse(JSON.stringify(filterList));
    filter_list[index]["close"] = true;
    setFilterList((filter_list));
  };

  const askQuestion = () => {
    let chat_id = localStorage.getItem('chat_id');
    const question = query;
    const history = filterList;
    setQuery('');
    const textarea = inputRef.current;
    textarea.style.height = 'auto';        // Reset height
    textarea.style.height = '44px';
    setWaitingAnswer(true);

    abortControllerRef.current = new AbortController();
    const {signal} = abortControllerRef.current;

    if (!chat_id) chat_id = Math.floor(Date.now() / 1000);
    setChatHistory((prevList) => [...prevList, {
      type: 'question',
      chat_id: chat_id,
      text: question,
      level: 'question'
    }]);
    setFilterList((prevList) => [...prevList, {type: 'question', chat_id: chat_id, text: question, level: 'question'}]);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/openai/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: signal,
      body: JSON.stringify({user_id: fingerprint, chat_id: chat_id, question: question, history: history})
    }).then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }
      return response.json();
    }).then((response) => {
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
      setWaitingAnswer(false);
    }).catch((error) => {
      console.error(error);
      setWaitingAnswer(false);
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        console.log('Shift + Enter pressed');
      } else {
        e.preventDefault();
        askQuestion();
      }
    }
  };

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
      body: JSON.stringify({user_id: fingerprint,})
    }).then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }
      return response.json();
    }).then((response) => {
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
    setQuery('');
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
        body: JSON.stringify({user_id: fingerprint, chat_id: id})
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

  const copyAnswer = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy!');
    }
  }

  const setVerifyOpen = (index, position) => {
    if (position == 'top') {
      setFilterList(prevList =>
          prevList.map((item, i) =>
              i === index ? {...item, verify_top_open: !item.verify_top_open} : item
          )
      );
    }
    if (position == 'bottom') {
      setFilterList(prevList =>
          prevList.map((item, i) =>
              i === index ? {...item, verify_bottom_open: !item.verify_bottom_open} : item
          )
      );
    }
  };

  const linkToProduct = (url) => {
    window.open(url, '_blank');
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
    waitingRef.current?.scrollIntoView({behavior: "smooth"});
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
              <img src="/image/logo.png" alt="logo" className="w-[80] mx-auto"/>
              <span className="text-2xl font-semibold">Geneva</span>
            </div>
            <img src="/image/x.svg" alt="x" className="w-[24] cursor-pointer"/>
            <img src="/image/editor.svg" alt="x" className="w-[24] cursor-pointer" onClick={addNewChatId}/>
            <img src="/image/llm-icons.png" alt="x" className="w-[80%] cursor-pointer" onClick={addNewChatId}/>
            <div className="flex justify-between w-[80%]">
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
              <img src="/image/bottom-button.png" className="w-[50px] cursor-pointer"
                   onClick={() => {
                     if (scrollRef.current) {
                       scrollRef.current.scrollTo({
                         top: scrollRef.current.scrollHeight,
                         behavior: 'smooth',
                       });
                     }
                   }}
              />
            </div>
            <div className="w-[100%]" align="center">
              <input
                  className="border border-gray w-[80%] m-auto pl-6 pr-2"
                  placeholder="Search..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
              />
              <div className="relative">
                <img src="/image/search.png" width={15} style={{position: "absolute", left: "35px", top: " -20px"}}/>
              </div>
            </div>
          </div>
          <div className="w-full px-4 gap-2 flex flex-col mt-5">
            <div>
              <Button
                  className="w-full bg-[#DCEAF7] hover:bg-[#DCEAF7] text-black overflow-hidden"

              >123
              </Button>
            </div>
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
                          <hr className="mt-4 !border-[#D4F8E5] w-full"/>
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
                                   style={{color: theme === "light" ? "black" : "white"}}
                                   className="w-[30] self-start mt-1 cursor-pointer"
                                   onClick={() => setHideSideBar(false)}>
                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round"></path>
                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              </svg>}
              <div className="flex flex-col gap-4">
                <p className="underline decoration-[#D4F8E5] decoration-2 underline-offset-[10px] text-2xl cursor-pointer"
                   style={{color: theme === "light" ? "black" : "white"}}
                   onClick={() => router.push('/marketplace')}>marketplace</p>
                <img src="/image/boom.png" alt="x" className="w-[20] self-end cursor-pointer"
                     onClick={() => router.push('/marketplace')}/>
              </div>
            </div>
            <img
                src="/image/theme.png"
                alt="theme"
                onClick={changeTheme}
                className="w-[40] h-auto scale-x-[-1] cursor-pointer"
            />
          </header>
          <div className={`overflow-y-auto scrollbar-neutral-800 ${filterList.length ? 'flex-1' : ''}`}>
            {filterList.map((item, index) => {
              if (item.type == 'question') {
                return (
                    <div key={index} className="mx-auto flex flex-1 gap-4 md:max-w-3xl">
                      <div className="w-full px-4 py-4">
                        <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                          <div className="relative max-w-[var(--user-chat-width,70%)] rounded-3xl py-2.5 text-2xl"
                               style={{color: theme === "light" ? "black" : "white"}}
                          >
                            {item.text}
                            <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                )
              } else if (item.type == 'answer') {
                return (
                    <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                      {<div className="flex flex-col mx-4 dark:text-white text-xl my-6">
                        <div className="flex items-center gap-2 mt-6">
                          <img src="/image/verify.png" alt="verify" className="w-[20]"/>
                          <span className="font-semibold"
                                style={{color: theme === "light" ? "black" : "white"}}
                          >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.level == 'Easy' ? 3 : item.level == 'Medium' ? 5 : 7} models</span>
                          <img src="/image/down.png" alt="down"
                               className={`w-[16px] h-[16px] transition-transform duration-200 ${!item.verify_top_open ? 'rotate-x-180' : ''}`}
                               onClick={() => setVerifyOpen(index, 'top')}/>
                          <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)}/>
                        </div>
                        {item.verify_top_open && <div className="[display:ruby] font-semibold mt-4">
                          {item.status_report.map((item, index) => (
                              <div key={index} className="flex items-center gap-1 mr-2">
                                <span>{item.model}</span>
                                {item.status === 'success' ? (
                                    <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success"/>
                                ) : (
                                    <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed"/>
                                )}
                              </div>
                          ))}
                        </div>}
                        {item.verify_top_open && <span className="mt-4 text-2xl">
                    <MarkdownRenderer content={item.opinion}/>
                  </span>}
                      </div>}
                      {
                          !item.close &&
                          <div className="mx-4 px-4 py-4 shadow-[10px_-10px_black] bg-[#FEFBF0] rounded-[30px]">
                            <MarkdownRenderer content={item.text}/>
                          </div>
                      }
                      {<div className="flex flex-col mx-4 dark:text-white text-xl">
                        <div className="flex items-center gap-2 mt-6">
                          <img src="/image/verify.png" alt="verify" className="w-[20]"/>
                          <span className="font-semibold"
                                style={{color: theme === "light" ? "black" : "white"}}
                          >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.level == 'Easy' ? 3 : item.level == 'Medium' ? 5 : 7} models</span>
                          <img src="/image/down.png" alt="down"
                               className={`w-[16px] h-[16px] transition-transform duration-200 ${!item.verify_bottom_open ? 'rotate-x-180' : ''}`}
                               onClick={() => setVerifyOpen(index, 'bottom')}/>
                          <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)}/>
                        </div>
                        {item.verify_bottom_open && <div className="[display:ruby] font-semibold mt-4">
                          {item.status_report.map((item, index) => (
                              <div key={index} className="flex items-center gap-1 mr-2">
                                <span
                                    style={{color: theme === "light" ? "black" : "white"}}
                                >{item.model}</span>
                                {item.status === 'success' ? (
                                    <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success"/>
                                ) : (
                                    <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed"/>
                                )}
                              </div>
                          ))}
                        </div>}
                        {item.verify_bottom_open && <span className="mt-4 text-2xl"
                                                          style={{color: theme === "light" ? "black" : "white"}}
                        >
                    <MarkdownRenderer content={item.opinion}/>
                  </span>}
                      </div>}
                      <div align="center">
                        {
                            !item.close &&
                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                 onClick={() => {
                                   handleCancel(index)
                                 }}
                            />
                        }
                      </div>
                    </div>
                )
              } else if (item.type == 'compare_product') {
                return (
                    <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                      {<div className="flex flex-col mx-4 dark:text-white text-xl my-6">
                        <div className="flex items-center gap-2 mt-6">
                          <img src="/image/verify.png" alt="verify" className="w-[20]"/>
                          <span
                              className="font-semibold"
                              style={{color: theme === "light" ? "black" : "white"}}
                          >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.status_report.length} models</span>
                          <img src="/image/down.png" alt="down"
                               className={`w-[16px] h-[16px] transition-transform duration-200 ${!item.verify_top_open ? 'rotate-x-180' : ''}`}
                               onClick={() => setVerifyOpen(index, 'top')}/>
                          <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)}/>
                        </div>
                        {item.verify_top_open && <div className="[display:ruby] font-semibold mt-4">
                          {item.status_report.map((item, index) => (
                              <div key={index} className="flex items-center gap-1 mr-2">
                                <span
                                    style={{color: theme === "light" ? "black" : "white"}}
                                >{item.model}</span>
                                {item.status === 'success' ? (
                                    <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success"/>
                                ) : (
                                    <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed"/>
                                )}
                              </div>
                          ))}
                        </div>}
                        {item.verify_top_open && <span className="mt-4 text-2xl">
                    <MarkdownRenderer content={item.opinion}/>
                  </span>}
                      </div>}
                      {
                          !item.close &&
                          <div className="mx-4 px-4 py-4 shadow-[10px_-10px_black] bg-[#FEFBF0] rounded-[30px]">
                            <MarkdownRenderer content={item.text}/>
                            <div
                                className="text-2xl">Here {item.product.length > 1 ? 'are the products' : 'is the product'}:
                            </div>
                            <div
                                className="w-full px-4 py-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-items-center">
                              {item.product.map((product, id) => {
                                return (
                                    <div
                                        key={id}
                                        className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                                        onClick={() => linkToProduct(product.url)}
                                    >
                                      <div
                                          className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.title}</div>
                                      <ProductSlider
                                          data={{
                                            main: product.image,
                                            thumbnails: product.thumbnails
                                          }}
                                      />
                                      <div
                                          className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.price}</div>
                                    </div>
                                )
                              })
                              }
                            </div>
                          </div>
                      }
                      {<div className="flex flex-col mx-4 dark:text-white text-xl">
                        <div className="flex items-center gap-2 mt-6">
                          <img src="/image/verify.png" alt="verify" className="w-[20]"/>
                          <span className="font-semibold"
                                style={{color: theme === "light" ? "black" : "white"}}
                          >Verified by {item.status_report.filter(item => item.status == 'success').length} out of {item.status_report.length} models</span>
                          <img src="/image/down.png" alt="down"
                               className={`w-[16px] h-[16px] transition-transform duration-200 ${!item.verify_bottom_open ? 'rotate-x-180' : ''}`}
                               onClick={() => setVerifyOpen(index, 'bottom')}/>
                          <img src="/image/copy.png" className="w-[20]" onClick={() => copyAnswer(item.text)}/>
                        </div>
                        {item.verify_bottom_open && <div className="[display:ruby] font-semibold mt-4">
                          {item.status_report.map((item, index) => (
                              <div key={index} className="flex items-center gap-1 mr-2">
                                <span>{item.model}</span>
                                {item.status === 'success' ? (
                                    <img src="/image/success.png" className="w-[20px] h-[20px]" alt="success"/>
                                ) : (
                                    <img src="/image/failed.png" className="w-[20px] h-[20px]" alt="failed"/>
                                )}
                              </div>
                          ))}
                        </div>}
                        {item.verify_bottom_open && <span className="mt-4 text-2xl">
                    <MarkdownRenderer content={item.opinion}/>
                  </span>}
                      </div>}
                      <div align="center">
                        {
                            !item.close &&
                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                 onClick={() => {
                                   handleCancel(index)
                                 }}
                            />
                        }
                      </div>
                    </div>
                )
              } else if (item.type == "general_product") {
                return (
                    <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                      <div className="px-8 text-2xl mb-4 dark:text-white">
                        Certainly! Here are some options picked for you
                      </div>
                      <div
                          className="w-full px-4 py-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
                        {item.product.map((product, id) => {
                          return (
                              <div
                                  key={id}
                                  className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                                  onClick={() => linkToProduct(product.url)}
                              >
                                <div className="flex justify-center w-full">
                                  <img
                                      src={product.image}
                                      alt="product"
                                      className="max-w-[200px] max-h-[200px] pt-3"
                                  />
                                </div>
                                <div className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.price}</div>
                              </div>
                          )
                        })
                        }
                      </div>
                      <div className="px-8 text-2xl mt-4 dark:text-white">
                        You can also browse & shop from the Boom Marketplace <a link='#'
                                                                                className="underline cursor-pointer"
                                                                                onClick={() => router.push('/marketplace')}>here</a>
                      </div>
                      <div align="center">
                        {
                            !item.close &&
                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                 onClick={() => {
                                   handleCancel(index)
                                 }}
                            />
                        }
                      </div>
                    </div>
                )
              } else {
                return (
                    <div key={index} className="mx-auto flex flex-col flex-1 md:max-w-3xl text-black my-4">
                      <div className="px-8 text-2xl mb-4 dark:text-white">
                        Certainly! Here it is:
                      </div>
                      {/* First Product (Single Row) */}
                      {item.product.length > 0 && (
                          <div className="w-full px-4 py-4 flex justify-center">
                            <div
                                className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                                onClick={() => linkToProduct(item.product[0].url)}
                            >
                              <ProductSlider
                                  data={{
                                    main: product[0].image,
                                    thumbnails: product.thumbnails
                                  }}
                              />
                              <div
                                  className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{item.product[0].price}</div>
                            </div>
                          </div>
                      )}
                      <div className="px-8 text-2xl mb-4 dark:text-white">
                        And here are alternatives to choose from:
                      </div>
                      {/* Remaining Products (Grid) */}
                      {item.product.length > 1 && (
                          <div
                              className="w-full px-4 py-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {item.product.slice(1).map((product, id) => (
                                <div
                                    key={id}
                                    className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                                    onClick={() => linkToProduct(product.url)}
                                >
                                  <div className="flex justify-center w-full">
                                    <img
                                        src={product.image}
                                        alt="product"
                                        className="max-w-[200px] max-h-[200px] pt-3"
                                    />
                                  </div>
                                  <div
                                      className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{product.price}</div>
                                </div>
                            ))}
                          </div>
                      )}
                      <div className="px-8 text-2xl mt-4 dark:text-white">
                        You can also browse & shop from the Boom Marketplace <a link='#'
                                                                                className="underline cursor-pointer"
                                                                                onClick={() => router.push('/marketplace')}>here</a>
                      </div>
                      <div align="center">
                        {
                            !item.close &&
                            <img src={"/image/cancel_button.png"} width={50} height={50} className="cursor-pointer"
                                 onClick={() => {
                                   handleCancel(index)
                                 }}
                            />
                        }
                      </div>
                    </div>
                )
              }
            })}

            {waitingAnswer && <div ref={waitingRef} className="mx-auto flex flex-col flex-1 md:max-w-3xl my-4">
              <div className="mx-4 py-4 flex text-2xl">
                <img src="/image/logo.png" alt="logo" className="w-[30] mr-2"/>
                <span style={{color: theme === "light" ? "dark" : "white"}}>
                Consulting the council
              </span>
                <span className="ml-2 flex">
                <span className="dot dot1" style={{color: theme === "light" ? "dark" : "white"}}>.</span>
                <span className="dot dot2" style={{color: theme === "light" ? "dark" : "white"}}>.</span>
                <span className="dot dot3" style={{color: theme === "light" ? "dark" : "white"}}>.</span>
              </span>
                <style jsx>{`
                  .dot {
                    animation: bounce 1.5s infinite;
                    font-size: 2rem;
                    line-height: 1;
                    margin-top: -4px;
                  }

                  .dot1 {
                    animation-delay: 0s;
                  }

                  .dot2 {
                    animation-delay: 0.2s;
                  }

                  .dot3 {
                    animation-delay: 0.4s;
                  }

                  @keyframes bounce {
                    0%, 80%, 100% {
                      transform: scale(1);
                      opacity: 0.5;
                    }
                    40% {
                      transform: scale(1.4);
                      opacity: 1;
                    }
                  }
                `}</style>
              </div>
            </div>}

          </div>
          <div className={`flex mx-auto px-3 md:px-4 w-full pb-6 ${filterList.length ? '' : 'flex-1'}`}>
            <div
                className="mx-auto flex flex-col flex-1 gap-4 md:gap-5 lg:gap-6 md:max-w-3xl xl:max-w-[48rem] justify-center items-center">
              {!filterList.length && (
                  <div className="flex flex-col items-center">
                  <span className="text-[60px]"
                        style={{color: theme === "light" ? "black" : "white"}}
                  >Welcome to Geneva</span>
                    <span className="text-3xl my-15"
                          style={{color: theme === "light" ? "black" : "white"}}
                    >We intelligently unify AIs to give you high-quality, trusted answers & smarter discovery</span>
                  </div>
              )}
              <div
                  className="flex w-full pb-2 cursor-text flex-col items-center justify-center rounded-[20px] border border-[#F1E2FA] contain-inline-size overflow-clip bg-white dark:bg-black shadow-[10px_1px_20px_1px_black]">
                <Textarea
                    ref={inputRef}
                    className="resize-none max-h-48 overflow-auto !border-none focus-visible:ring-0 !
                none ml-2 !min-h-8 bg-white dark:bg-black !text-xl"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows="1" // Initially set to 1 row
                    placeholder="Ask Geneva anything"
                />
                <div className="flex w-full px-2">
                  <img src="/image/logo.png" alt="logo" className="w-[30] ml-auto cursor-pointer"
                       onClick={askQuestion}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function ProductSlider({data}) {
  console.log(data.thumbnails && data.thumbnails.length > 0);
  const [index, setIndex] = useState(0);
  return <div className="flex justify-center w-full">
    {
      data.thumbnails && data.thumbnails.length > 0 ?
          <div className="flex gap-[15] align-center">
            <img src={`/image/dark-left.png`} width={20} height={20}
                 onClick={() => {
                   setIndex([Math.abs(index + 1) % data.thumbnails.length])
                 }}
            />
            {
              <img
                  src={data.thumbnails[index]}
                  alt="product"
                  className="max-w-[200px] max-h-[200px] pt-3"
              />
            }
            <img src={`/image/dark-right.png`} width={20} height={20}
                 onClick={() => {
                   setIndex([Math.abs(index - 1) % data.thumbnails.length])
                 }}
            />
          </div> :
          <img
              src={data.main}
              alt="product"
              className="max-w-[200px] max-h-[200px] pt-3"
          />
    }
  </div>

}