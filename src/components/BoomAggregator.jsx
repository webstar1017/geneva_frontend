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
import getCaretCoordinates from 'textarea-caret';
import { useFingerprint } from "./FingerPrint";
import toast from "react-hot-toast";

export default function BoomAggregator() {
  const fingerprint = useFingerprint();
  const router = useRouter();
  const inputRef = useRef(null);
  const controllerRef = useRef(null);
  const { theme, setTheme } = useTheme()
  const [iconOffset, setIconOffset] = useState(8);
  const [query, setQuery] = useState('');
  const [waitingAnswer, setWaitingAnswer] = useState(false);
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState('');
  const [productHistory, setProductHistory] = useState([]);
  const [category, setCategory] = useState('random');
  const [icon, setIcon] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(true);
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    let space = 30;
    if(e.target.value == '') space += 15;
    const coords = getCaretCoordinates(e.target, 0);
    setIconOffset(coords.left - space); // `left` is x-coordinate of caret
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        console.log('Shift + Enter pressed');
      } else {
        e.preventDefault();
        setCategory('');
        searchProduct(query, 'search');
      }
    }
  };

  const loadProductHistory = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product-history/list`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: fingerprint})
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
          id: item.id,
          products: JSON.parse(item.products),
          product_type: item.product_type,
          query: item.search
        });
      })
      setProductHistory(history);
    }).catch((error) => {
      console.error(error);
    });
  }
  
  const loadProduct = (query) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  
    const controller = new AbortController();
    controllerRef.current = controller;
  
    setProducts([]);
    setWaitingAnswer(true);
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({ category:  query}),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Fetch error');
        return response.json();
      })
      .then((response) => {
        setProducts(response);
        setProductType('general');
        setWaitingAnswer(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Previous fetch aborted');
        } else {
          console.error(err);
          setWaitingAnswer(false);
        }
      })
  }
  
  const searchProduct = (search, type) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  
    const controller = new AbortController();
    controllerRef.current = controller;
  
    setProducts([]);
    setWaitingAnswer(true);
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/openai/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({ user_id: fingerprint, query: search, type }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Fetch error');
        return response.json();
      })
      .then((response) => {
        setProducts(response.products);
        setProductType(response.product_type);
        if (type === 'search') {
          setProductHistory((prev) => [
            ...prev,
            { user_id: fingerprint, id: response.id, query: query, products: response.products, product_type: response.product_type },
          ]);
        }
        setWaitingAnswer(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Previous fetch aborted');
        } else {
          console.error(err);
          setWaitingAnswer(false);
        }
      })
  }

  const linkToProduct = (url) => {
    window.open(url, '_blank');
  }

  const changeHistory = (index) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null; // clear it
      setWaitingAnswer(false);
    }
    setProductType(productHistory[index].product_type);
    setProducts(productHistory[index].products);
    setQuery(productHistory[index].query);
    setCategory('');
    const width = window.innerWidth;
    if(width < 640) {
      setHideSideBar(true);
    }
  }

  const deleteHistory = (index, user_id) => {
    if(user_id == fingerprint) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product-history/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: fingerprint, id: index})
      }).then((response) => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      }).then((response) => {
        setProductHistory((prevList) => prevList.filter(item => item.id != index));
        setQuery('');
        setProductType('');
        setProducts([]);
      }).catch((error) => {
        console.error(error);
      })
    } else {
      toast.error(`You don't have permission`);
    }
  }

  const searchNew = () => {
    setCategory('');
    setQuery('')
    setProductType('');
    setProducts([]);
  }

  const gotoBack = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setWaitingAnswer(false);
    }
    router.back();
  }
  useEffect(() => {
    const width = window.innerWidth;
    if(width > 640) {
      setHideSideBar(false);
    }
    if (inputRef.current) {
      let space = 30;
      if(inputRef.current.value == '') space += 35;
      const coords = getCaretCoordinates(inputRef.current, 0);
      setIconOffset(coords.left - space);
      setIcon(true);
    }
    setTheme('light');
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      let space = 30;
      if(inputRef.current.value == '') space += 35;
      const coords = getCaretCoordinates(inputRef.current, 0);
      setIconOffset(coords.left - space);
      setIcon(true);
    }
  },[query])

  useEffect(() => {
    if(category) {
      setQuery('');
      loadProduct(category);
    }
  }, [category])

  useEffect(() => {
    loadProductHistory();
  }, [fingerprint])

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
            w-[300px] h-full  py-4 gap-3
            !bg-white !text-black
            transform transition-transform duration-300 ease-in-out
            ${hideSideBar ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
        <div className="flex flex-col items-center gap-3 overflow-y-auto">
          <div className="absolute top-0 right-0 px-2 pt-3 cursor-pointer" onClick={() => setHideSideBar(true)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30]">
              <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div className="text-center flex flex-col gap-2">
            <img src="/image/logo.png" alt="logo" className="w-[80] mx-auto" />
            <span className="text-2xl font-semibold">Geneva</span>
          </div>
          <img src="/image/x.svg" alt="x" className="w-[24] cursor-pointer" />
          <img src="/image/editor.svg" alt="x" className="w-[24] cursor-pointer" onClick={searchNew}/>
          <img src="/image/llm-icons.png" alt="x" className="w-[80%] cursor-pointer" />
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
        <div className="w-full px-4 gap-2 flex flex-col mt-5"

        >
          {Array.isArray(productHistory) && productHistory.filter((item) => item.query.indexOf(search) > -1).map((item, index) => {
            return (
              <div key={index} className="relative group w-full">
                <Button
                  key={index}
                  className="w-full bg-[#DCEAF7] hover:bg-[#DCEAF7] text-black overflow-hidden"
                  onClick={() => changeHistory(index)}
                >
                  <span className="block text-center text-xl truncate mx-5">
                    {item.query}
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
                  <DialogContent className="bg-[url('/image/background-light.png')] dark:bg-[url('/image/background-dark.png')] bg-[length:100%_100%] bg-no-repeat bg-center border-none shadow-[10px_1px_20px_1px_black] px-0 rounded-4xl [&>button]:hidden font-goudy text-xl ring-0">
                    <DialogHeader className="items-center">
                      <DialogTitle className="text-xl">delete history?</DialogTitle>
                      <hr className="mt-4 !border-[#D4F8E5] w-full"/>
                    </DialogHeader>
                    <div className="justify-self-center">
                      this will delete the conversation & history
                    </div>
                    <DialogFooter className="gap-20 flex !justify-center">
                      <DialogClose asChild>
                        <div className="bg-white text-black w-[60px] hover:bg-black hover:text-white text-center rounded-sm py-1 shadow-[2px_2px_2px_black] cursor-pointer">
                          back
                        </div>
                      </DialogClose>
                      <DialogClose>
                        <div className="bg-white text-black w-[60px] hover:bg-black hover:text-white text-center rounded-sm py-1 shadow-[2px_2px_2px_black] cursor-pointer" onClick={() => deleteHistory(item.id, item.user_id)}>
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
        className={`
          flex-1 flex flex-col
          overflow-y-auto
          bg-[url('/image/background-boom.png')]
          bg-[length:100%_100%] bg-no-repeat bg-center
          transition-all duration-300 ease-in-out
          ${hideSideBar ? 'ml-0' : 'ml-0 sm:ml-[300px]'}
        `}
      >
        <header className="flex justify-between items-center p-2">
          <div className="flex gap-3">
            {hideSideBar && <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30] self-start mt-1 cursor-pointer"
                                 style={{color: theme === "light" ? "black" : "white"}}
                                 onClick={() => setHideSideBar(false)}>
              <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
            </svg>}
            <div className="w-[60px] bg-black text-white text-center rounded-sm py-1 shadow-[2px_2px_2px_black] cursor-pointer" onClick={gotoBack}>
              back
            </div>
          </div>
          <span className="text-3xl underline decoration-[#189453] decoration-2 underline-offset-[10px] self-end text-center">Discover & Shop anything consumer. Powered by Boom.</span>
          <img src="/image/boom.png" alt="x" className="w-[60] self-end cursor-pointer"/>
        </header>
        <div className="flex mx-auto px-3 md:px-4 w-full py-6">
          <div className="mx-auto flex flex-col flex-1 gap-4 md:gap-5 lg:gap-6 md:max-w-3xl xl:max-w-[48rem] justify-center items-center">
            <div className="relative flex w-full pb-2 cursor-text flex-col items-center justify-center rounded-[20px] contain-inline-size">
              <div
                className="absolute inset-y-0 flex pointer-events-none self-start mt-3"
                style={{ left: `${iconOffset}px` }}
              >
                {icon && <img src="/image/search.png" alt="logo" className="w-[20] ml-auto" />}
              </div>
              <Textarea
                ref={inputRef}
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="resize-none max-h-48 overflow-auto !border-none focus-visible:ring-0 !shadow-none !text-xl text-center"
                rows="1"
                placeholder="Search ..."
              />
            </div>
          </div>
        </div>
        <div className=" w-[90%] m-auto flex  justify-center md:justify-between lg:justify-between items-center text-2xl my-10" style={{flexWrap: "wrap", gap: "50px"}}>
          <div className={`${category == 'footwear' ? 'underline decoration-[#189453] decoration-2 underline-offset-[10px]' : ''} cursor-pointer`} onClick={() => setCategory('footwear')}>footwear</div>
          <div className={`${category == 'beauty' ? 'underline decoration-[#189453] decoration-2 underline-offset-[10px]' : ''} cursor-pointer`} onClick={() => setCategory('beauty')}>beauty</div>
          <div className={`${category == 'clothing' ? 'underline decoration-[#189453] decoration-2 underline-offset-[10px]' : ''} cursor-pointer`} onClick={() => setCategory('clothing')}>clothing</div>
          <div className={`${category == 'furniture' ? 'underline decoration-[#189453] decoration-2 underline-offset-[10px]' : ''} cursor-pointer`} onClick={() => setCategory('furniture')}>furniture</div>
          <div className={`${category == 'electronics' ? 'underline decoration-[#189453] decoration-2 underline-offset-[10px]' : ''} cursor-pointer`} onClick={() => setCategory('electronics')}>electronics</div>
          <div className={`${category == 'random' ? 'underline decoration-[#189453] decoration-2 underline-offset-[10px]' : ''} cursor-pointer`} onClick={() => setCategory('random')}>&  everything else</div>
        </div>
        {waitingAnswer && 
          <div className="flex flex-col flex-1 my-4">
            <div className="mx-10 py-4 flex text-2xl">
              <img src="/image/logo.png" alt="logo" className="w-[30] mr-2" />
              Rummaging through
              <span className="ml-2 flex">
                <span className="dot dot1">.</span>
                <span className="dot dot2">.</span>
                <span className="dot dot3">.</span>
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
          </div>
        }
        <div className="w-full  p-8">
          {productType === 'specific' && Array.isArray(products) && products.length > 0 && (
            <>
              <div className="text-2xl">
                Best match for you:
              </div>
              <div className="w-full flex justify-center mb-6 mt-4">
                <ProductSlider
                  linkToProduct={linkToProduct}
                  image={products[0].image}
                  thumbnails={products[0].thumbnails}
                  url={products[0].url}
                  price={products[0].price}
                />
                {/*<div*/}
                {/*  className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"*/}
                {/*  onClick={() => linkToProduct(products[0].url)}*/}
                {/*>*/}
                {/*  <div className="flex justify-center w-full">*/}
                {/*    <img*/}
                {/*      src={products[0].image}*/}
                {/*      alt="product"*/}
                {/*      className="max-w-[200px] max-h-[200px] pt-3"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <div className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{products[0].price}</div>*/}
                {/*</div>*/}
              </div>
              <div className="text-2xl mb-4">
                Alternatives to choose from:
              </div>
            </>
          )}

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {Array.isArray(products) && (
              (productType === 'specific' ? products.slice(1) : products)
                .map((item, index) => (
                    <ProductSlider
                        linkToProduct={linkToProduct}
                        image={item.image}
                        thumbnails={item.thumbnails}
                        url={item.url}
                        price={item.price}
                    />
                  // <div
                  //   key={index}
                  //   className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
                  //   onClick={() => linkToProduct(item.url)}
                  // >
                  //   <div className="flex justify-center w-full">
                  //     <img
                  //       src={item.image}
                  //       alt="product"
                  //       className="max-w-[200px] max-h-[200px] pt-3"
                  //     />
                  //   </div>
                  //   <div className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{item.price}</div>
                  // </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSlider({image, thumbnails, url,linkToProduct, price, id}) {
  const [index, setIndex] = useState(0);
  const {theme, setTheme} = useTheme();
  return <div className="flex items-center gap-[15] align-center" id={id}>
    {
        thumbnails && thumbnails.length > 0 &&
        <div>
          <img src={`/image/${theme == "light" ? "dark" : "white" }-left.png`} width={20} height={20}
               onClick={() => {
                 setIndex(prevIndex => (prevIndex + 1) % thumbnails.length);
               }}
               className="cursor-pointer"
          />
        </div>
    }
    <div
      className="bg-white w-[200px] shadow-[10px_10px_20px_1px_black] rounded-[20px] overflow-hidden flex flex-col items-center cursor-pointer"
      onClick={() => linkToProduct(url)}
  >

    <div className="flex justify-center w-full">
      {
          thumbnails && thumbnails.length > 1 ?
          <img
              src={thumbnails[index]}
              alt="product"
              className="max-w-[200px] max-h-[200px] pt-3"
          />:
        <img
          src={image}
          alt="product"
          className="max-w-[200px] max-h-[200px] pt-3"
        />
      }
    </div>
    <div className="text-xl py-3 mb-0 mt-auto pl-3 w-full font-aptos">{price}</div>
  </div>
    {
        thumbnails && thumbnails.length > 1 &&
        <div>
          <img src={`/image/${theme == "light" ? "dark" : "white" }-right.png`} width={20} height={20}
               onClick={() => {
                 setIndex(prevIndex => (prevIndex + 1) % thumbnails.length);
               }}
               className="cursor-pointer"
          />
        </div>
    }
  </div>
}