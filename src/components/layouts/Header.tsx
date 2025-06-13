import {MARKET_CATEGORIES} from "@/utils/consistant";
import {
    UnstyledButton,
    Container,
    Flex,
    Image,
    useMantineColorScheme,
    Text,
    // Burger,
    Box,
    Modal,
    Menu
} from "@mantine/core";
import Link from "next/link";
import {useContext, useState} from "react";
import WalletConnect from "../WalletConnect";
import useIsMobile from "@/hooks/useIsMobile";
import {useDisclosure} from "@mantine/hooks";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import {useRouter} from "next/navigation";
import {IconChevronDown, IconChevronUp} from "@tabler/icons-react";
import HomeContext from "@/state/index.context";
import SearchInput from "../SearchInput";

// interface Props {
//     // openNavbar: boolean
//     // toogleNavbar: () => void
// }

const MyHeader = ({
                      // openNavbar,
                      // toogleNavbar
                  }) => {
    const [opened, {open, close}] = useDisclosure(false);
    const [authType, setAuthType] = useState("login");
    const {colorScheme} = useMantineColorScheme();
    const isMobile = useIsMobile();
    const router = useRouter();
    const [openedUserMenu, setOpenedUserMenu] = useState(false);
    const {
        state: {selectedCategory},
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    return <header>
        <Box
            style={{
                height: "75px",
                borderBottom: '1px solid #1F242F',
                background: `${colorScheme === "dark" ? '#0c111d' : "white"}`
            }}
            w='100%'
            pl={15}
            pr={15}
        >
            <Container size={1440} h="100%">
                <Flex
                    justify={'space-between'}
                    h={'100%'}
                    w={'100%'}
                    align='center'
                >
                    <Flex
                        align='center'
                        gap="20px"
                    >
                        {/*<Burger*/}
                        {/*    opened={openNavbar}*/}
                        {/*    onClick={toogleNavbar}*/}
                        {/*    hiddenFrom="sm"*/}
                        {/*    size="sm"*/}
                        {/*/>*/}
                        <Link href="/">
                            <Image src="/img/logo.svg" style={{width: 160}} alt=""/>
                        </Link>
                        {/*<Flex*/}
                        {/*    gap="20px"*/}
                        {/*    align='center'*/}
                        {/*    justify="center"*/}
                        {/*    h={64}*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        !isMobile && MARKET_CATEGORIES.map((item, index) => (*/}
                        {/*            <Link href={`/${item.key}`} key={`header-${index}`}>*/}
                        {/*                {*/}
                        {/*                    selectedCategory.indexOf(item.key) > -1 ?*/}
                        {/*                        <Text size="16px" style={{color: "rgba(38, 133, 241, 1)"}}*/}
                        {/*                              className="bold-text">{item.name}</Text> :*/}
                        {/*                        <Text size="16px" fw={500} style={{color: "#CECFD2d"}}>{item.name}</Text>*/}
                        {/*                }*/}
                        {/*            </Link>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</Flex>*/}
                    </Flex>
                    {
                        !isMobile && <SearchInput/>
                    }
                    <Flex
                        gap={20}
                        align='center'
                    >
                        {
                            !isMobile && <WalletConnect/>
                        }
                        <Menu opened={openedUserMenu} onChange={setOpenedUserMenu} shadow="md" width={200}
                              closeOnItemClick={true} trigger="click-hover" position="bottom-end"
                        >
                            <Menu.Target>
                                <UnstyledButton
                                >
                                    <Flex align="center" gap={5}>
                                        <Box w={35} h={35} className="rounded-[100%]" bg={"orange"}>
                                        </Box>
                                        {openedUserMenu ? <IconChevronUp/> : <IconChevronDown/>}
                                    </Flex>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={() => {
                                        setAuthType("login");
                                        open();
                                    }}
                                >
                                    Log In
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        setAuthType("signup");
                                        open();
                                    }}
                                >
                                    Sign Up
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        router.push("/settings")
                                    }}
                                >
                                    Settings
                                </Menu.Item>
                                {/*<Menu.Item*/}
                                {/*    onClick={() => { router.push("/rewards") }}*/}
                                {/*>*/}
                                {/*    Rewards*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item
                                    onClick={() => {
                                        router.push("/create-market")
                                    }}
                                >
                                    Create a market
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        router.push("/profile")
                                    }}
                                >
                                    Profile
                                </Menu.Item>
                                {/* <Menu.Divider /> */}
                                {/* <Menu.Item >
                                    <Flex justify="space-between" align="center">
                                        Dark Mode
                                        <Switch
                                            checked={colorScheme === "dark" ? true : false}
                                            onChange={(event) => event.currentTarget.checked ? setColorScheme("dark") : setColorScheme("light")}
                                            color="blue"
                                            size="md"
                                            thumbIcon={
                                                colorScheme === "dark" ? (
                                                    <IconMoon size={12} color="var(--mantine-color-gray-6)" stroke={3} />
                                                ) : (
                                                    <IconSun size={12} color="var(--mantine-color-blue-6)" stroke={3} />
                                                )
                                            }
                                        />
                                    </Flex>
                                </Menu.Item> */}
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                </Flex>
            </Container>
        </Box>
        {
            <Box
                style={{borderBottom: '1px solid #2E90FA'}}
                className="h-[64px] bg-[#0c111d]"
            >
                <Container size={1440} h="100%">
                    <Flex
                        gap="28px"
                        align='center'
                        justify="center"
                        h={64}
                    >
                        {
                            MARKET_CATEGORIES.map((item, index) => (
                                <UnstyledButton key={`header-${index}`}
                                                onClick={() => {
                                                    homeDispatch({
                                                        "field": "selectedCategory",
                                                        "value": item.key
                                                    });
                                                    router.push(`/markets/${item.key}`)
                                                }}
                                >
                                    {
                                        selectedCategory === item.key ?
                                            <Text style={{color: "rgba(38, 133, 241, 1)"}} fw={500}
                                                  size="16px">{item.name}</Text> :
                                            <Text fw={500} size="16px" style={{color: "#CECFD2"}}>{item.name}</Text>
                                    }
                                </UnstyledButton>
                            ))
                        }
                    </Flex>
                </Container>
            </Box>
        }

        <Modal opened={opened} onClose={close} centered withCloseButton={false}>
            {
                authType === "login" ? <Login/> : <SignUp/>
            }
        </Modal>
    </header>
}

export default MyHeader;