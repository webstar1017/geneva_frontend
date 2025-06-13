import {Box, Button, Card, Flex, Group, Image, Text, useMantineColorScheme} from "@mantine/core";
import {IconArrowRight, IconChartBar, IconFileCheck} from "@tabler/icons-react";
import React from "react";
// import { FC } from "react";

// interface Props {

// }

const CategoryCard = () => {

    const {colorScheme} = useMantineColorScheme();

    return <Box p={18}>
        <Card shadow="sm" padding="lg" radius="md" withBorder
              className="border border-[#1F242F]"
              bg={colorScheme === "dark" ? "#31353e" : "white"}>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                    style={{borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}
                />
            </Card.Section>
            <Box>
                <div className="bg-gradient-to-r from-[#25282e] via-[#37598b] to-[#25282e] m-auto h-[2px]">
                </div>
                <Group justify="space-between" mt="30px" mb="xs" gap="20px" bg="#31353e">
                    <Text fw={500} size="24px"
                    >Politics</Text>
                    <Text size="14px" className="thin-text" style={{lineHeight: "23px", wordSpacing: '2px'}}>Explore
                        predictions on elections,
                        policy changes, and global political events</Text>
                    <Group>
                        <Flex
                            p={6}
                            style={{
                                border: `1px solid rgba(71, 205, 137, 1)`,
                                borderRadius: "15px"
                            }}
                            align="center"
                            gap={5}
                        >
                            <IconChartBar color="rgba(23, 178, 106, 1)" size={18}/>
                            <Text size="12px" fw={400} style={{color: "rgba(117, 224, 167, 1)"}}>
                                2,000+ Polls
                            </Text>
                        </Flex>
                        <Flex
                            p={6}
                            style={{
                                border: `1px solid rgba(128, 152, 249, 1)`,
                                borderRadius: "15px"
                            }}
                            align="center"
                            gap={5}
                        >
                            <IconFileCheck color="rgba(97, 114, 243, 1)" size={18}/>
                            <Text size="12px" fw={400} style={{color: "rgba(164, 188, 253, 1)"}}>
                                2,000+ Polls
                            </Text>
                        </Flex>
                    </Group>
                    <Flex
                        justify="space-between"
                        mt={20}
                        pt={20}
                        style={{borderTop: "2px solid rgba(12, 17, 29, 0.35)"}}
                        w="100%"
                        align="center"

                    >
                        <Text
                            style={{color: "rgba(206, 207, 210, 1)"}}
                            size="16px"
                        >
                            View Polls
                        </Text>
                        <Button color="rgba(46, 144, 250, 1)" variant="outline">
                            <Flex gap={10}>
                                <Text
                                    style={{color: "rgba(132, 202, 255, 1)"}}
                                >
                                    Vote Now
                                </Text>
                                <IconArrowRight color="rgba(132, 202, 255, 1)"/>
                            </Flex>
                        </Button>
                    </Flex>
                </Group>
            </Box>
        </Card>
    </Box>
}

export default CategoryCard;         