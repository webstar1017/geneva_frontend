import useIsMobile from "@/hooks/useIsMobile";
import { Box, Button, Flex, Group, Menu, Radio, Text, TextInput } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconDots, IconFilter } from "@tabler/icons-react";
import { useState } from "react";

function Comments() {
    const COMMENT_TYPES = [
        { name: "Comments", key: "comments" },
        { name: "Top Holders", key: "top_holders" },
        { name: "Activity", key: "activity" },
        { name: "Related", key: "related" },
    ]
    const [selectedComment, setSelectedComment] = useState<string>(COMMENT_TYPES[0].key);
    const [openedSort, setOpenedSort] = useState<boolean>(false);
    const [selectedSort, setSelectedSort] = useState<"new" | "old">("new");
    const isMobile = useIsMobile();
    return (
        <Flex
            style={{ border: '1px solid #333741' }}
            gap={24}
            direction="column"
        >
            <Flex
                direction={isMobile ? "column" : "row"}
            >
                {
                    COMMENT_TYPES.map((item, index) =>
                        <Box key={`table-tag-${index}`} p={0} w={isMobile ? "100%" : "50%"}>
                            <Flex
                                h={44} w="100%" justify="center" align="center"
                                bg={selectedComment === item.key ? "rgba(46, 144, 250, 0.4)" : "transparent"}
                                style={{
                                    borderBottom: `2px solid ${selectedComment === item.key ? "rgba(46, 144, 250, 1)" : "#333741"}`
                                }}
                                className="cursor-pointer"
                                onClick={() => setSelectedComment(item.key)}
                            >
                                <Text
                                    style={{
                                        color: selectedComment === item.key ? "white" : "#94969C",
                                    }}
                                >{item.name}</Text>
                            </Flex>
                        </Box>
                    )
                }
            </Flex>
            <Flex gap={24} p={16} w="100%" direction="column">
                <Flex gap={10} w="100%" align="end">
                    <TextInput
                        placeholder="Comments..."
                        label={"Add a Comment"}
                        w="100%"
                    />
                    <Button color="rgba(31, 36, 47, 1)" className="border border-[rgba(31, 36, 47, 1)]" pl={16} pr={16}>Post</Button>
                </Flex>
                <Flex justify="end">
                    <Menu width={150} position="bottom-start"
                        opened={openedSort} onChange={setOpenedSort}
                    >
                        <Menu.Target>
                            <Flex
                                justify="space-between"
                                className="
                                            border-1 border-blue-500 rounded-md
                                            transition duration-300
                                            hover:ring-2 hover:ring-blue-400 hover:ring-opacity-20
                                            hover:outline-none    
                                            cursor-pointer
                                        "
                                p={12}
                                align="center"
                                w={150}
                            >
                                <Flex
                                    gap={8}
                                    align="center"
                                >
                                    <IconFilter size={18} color="#94969C" />
                                    <Text size="16px">
                                        Filters
                                    </Text>
                                </Flex>
                                {
                                    openedSort ? <IconChevronUp color="#94969C" /> : <IconChevronDown color="#94969C" />
                                }
                            </Flex>
                        </Menu.Target>
                        <Menu.Dropdown
                        >
                            <Menu.Item w={110}
                                onClick={() => setSelectedSort("new")}
                            >
                                <Group>
                                    <Radio defaultChecked={selectedSort === "new" ? true : false} />
                                    Newest
                                </Group>
                            </Menu.Item>
                            <Menu.Item w={110}
                                onClick={() => setSelectedSort("old")}
                            >
                                <Group>
                                    <Radio defaultChecked={selectedSort === "old" ? true : false} />
                                    Oldest
                                </Group>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Flex>
                <Box>
                    <Flex
                        justify={isMobile ? "start" : "space-between"}
                        gap={10}
                    >
                        <Flex gap={16}>
                            <img src="/img/btc.png" width={48} height={48}/>
                            <Box>
                                <Flex gap={8}>
                                    <Text size="18px">Noah Johnson</Text>
                                    <Text size="14px" style={{color: "rgba(148, 150, 156, 1)"}}>1h ago</Text>
                                </Flex>
                                <Text style={{color: "rgba(148, 150, 156, 1)"}}>easy lock ever pacers easily winning</Text>
                            </Box>
                        </Flex>
                        <IconDots style={{color: "rgba(148, 150, 156, 1)"}} cursor="pointer"/>
                    </Flex>
                    <Flex align="center" justify="center" gap={3} className="cursor-pointer" mt={20}>
                        <Text style={{color: "rgba(206, 207, 210, 1)"}}>Lead More</Text>
                        <IconChevronDown color="rgba(206, 207, 210, 1)"/>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Comments;