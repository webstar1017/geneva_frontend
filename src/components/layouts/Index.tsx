/**
 * Created by Pulao
 * date: 5/24/2025
 * description: In next js, all pages are passed when routing pages.
 */

"use client"

import {useCreateReducer} from "@/hooks/useCreateReducer";
import HomeContext from "@/state/index.context";
import {HomeInitialState, initialState} from "@/state/index.state";
import {AppShell, MantineProvider} from "@mantine/core";
// import {useDisclosure} from "@mantine/hooks";
import {FC, ReactNode, useEffect, useState} from "react";
import {Notifications} from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import MyHeader from "./Header";
// import MyFooter from "./Footer";
import Container from "./Main";
import Providers from "../Providers";
import useIsMobile from "@/hooks/useIsMobile";
import Navbar from "./Navbar";
import {useDisclosure} from "@mantine/hooks";
import {useParams} from "next/navigation";

interface Props {
    children: ReactNode,
}

const Layout: FC<Props> = ({children}) => {

    const [isClient, setIsClient] = useState(false);
    const isMobile = useIsMobile();
    const [opened] = useDisclosure();
    const [path, setpath] = useState<string>("");
    const params = useParams();

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        setpath(window.location.pathname);
    }, [params])

    const contextValue = useCreateReducer<HomeInitialState>({
        initialState,
    });
    // const theme = createTheme({
    //     colors: {
    //     },
    // });

    return (
        isClient &&
        <HomeContext.Provider
            value={{
                ...contextValue,
            }}
        >
            <Providers>
                <MantineProvider
                    forceColorScheme="dark"
                    theme={{
                        colors: {},
                        components: {
                            Text: {
                                styles: () => ({
                                    root: {
                                        color: "white"
                                    },
                                    input: {
                                        backgroundColor: "transparent",
                                        borderColor: '#333741'
                                    }
                                })
                            },
                            NumberInput: {
                                styles: () => ({
                                    input: {
                                        backgroundColor: "transparent",
                                        borderColor: '#333741'
                                    }
                                })
                            },
                            Select: {
                                styles: () => ({
                                    input: {
                                        backgroundColor: "transparent",
                                        borderColor: '#333741'
                                    },
                                    dropdown: {
                                        backgroundColor: "#0c111d"
                                    },
                                })
                            },
                            Textarea: {
                                styles: () => ({
                                    input: {
                                        backgroundColor: "transparent",
                                        borderColor: '#333741'
                                    }
                                })
                            },
                            DateInput: {
                                styles: () => ({
                                    input: {
                                        backgroundColor: "transparent",
                                        borderColor: '#333741'
                                    },
                                })
                            },
                            TextInput: {
                                styles: () => ({
                                    input: {
                                        backgroundColor: "transparent",
                                        borderColor: '#333741'
                                    }
                                })
                            },
                            Radio: {
                                styles: () => ({
                                    // radio: {
                                    //     backgroundColor: "transparent"
                                    // },
                                })
                            },
                            Menu: {
                                styles: () => ({
                                    dropdown: {
                                        backgroundColor: "#0c111d"
                                    },
                                    item: {
                                        padding: '10px 8px',
                                        fontSize: '14px',
                                        color: "white"
                                    }
                                })
                            }
                        }
                    }}
                >
                    <Notifications/>
                    <AppShell
                        header={{height: path.indexOf("comming-soon") > -1 ? 0 : 129}}
                        // footer={{ height: 60 }}
                        navbar={{
                            width: 0,
                            breakpoint: 'sm',
                            collapsed: {mobile: !opened},
                        }}
                        padding="md"
                        withBorder={false}
                    >
                        <AppShell.Header
                        >
                            {
                                path.indexOf("comming-soon") == -1 && <MyHeader
                                    // openNavbar={opened}
                                    // toogleNavbar={toggle}
                                />
                            }
                        </AppShell.Header>
                        {
                            isMobile && <AppShell.Navbar p="md">
                                <Navbar/>
                            </AppShell.Navbar>
                        }
                        <AppShell.Main
                            style={{paddingLeft: '0px', paddingRight: '0px'}}
                        >
                            <Container>
                                {children}
                            </Container>
                        </AppShell.Main>
                        {/* <AppShell.Footer
                        >
                            <MyFooter />
                        </AppShell.Footer> */}
                    </AppShell>
                </MantineProvider>
            </Providers>
        </HomeContext.Provider>
    )
}

export default Layout;