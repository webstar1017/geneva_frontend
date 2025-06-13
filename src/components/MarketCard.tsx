import MarketData from "@/types/MarketData";
import {Box, Button, Flex, Grid, Text} from "@mantine/core";
import {IconChevronsDown, IconChevronsUp} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {FC, useState} from "react";
import {PieChart, Pie, Cell} from "recharts";


interface Props {
    data: MarketData
}

const MarketCard: FC<Props> = ({
                                   data
                               }) => {
    const router = useRouter();
    const [hoverBg, setHoverBg] = useState<boolean>(false);
    const [yesButtonerHover, setYesButtonHover] = useState<boolean>(false);
    const [noButtonerHover, setNoButtonHover] = useState<boolean>(false);

    return <Box
        className={`market-card-item border border-[#1F242F] rounded-[25px] mb-[5px] transition-transform duration-300 ease-in-out ${hoverBg ? "bg-[#242f4c] transition-colors duration-300 rounded" : "bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16]"} w-full cursor-pointer`}
    >
        <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
        </div>
        <Flex p={16} gap={16} direction="column" className="w-full border-bottom border-[#1F242F]">
            <Flex justify="space-between" w="100%"
                  onMouseEnter={() => setHoverBg(true)}
                  onMouseLeave={() => setHoverBg(false)}
                  onClick={() => router.push(`/detail/${data.id}`)}
            >
                <Flex gap={8}>
                    <img src="/img/btc.png" alt="" className="w-[32px] h-[32px]"/>
                    <Text style={{color: "#CECFD2", lineHeight: "20px"}} size="14px"
                          className="bold-text leading-[20px]">
                        {data.title}
                    </Text>
                </Flex>
                <Box>
                    <PieChart width={70} height={70}>
                        <Pie
                            data={[
                                {
                                    name: "Group D",
                                    value: (Number(data.yesPrice) + Number(data.noPrice)) / Number(data.yesPrice) * 100
                                },
                                {
                                    name: "Group E",
                                    value: (Number(data.yesPrice) + Number(data.noPrice)) / Number(data.noPrice) * 100
                                }
                            ]}
                            innerRadius={20}
                            outerRadius={25}
                            startAngle={0}
                            endAngle={180}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            <Cell key={`cell-2`} fill={"#333741"} stroke="none" strokeWidth={1}/>
                            <Cell key={`cell-1`} fill={"#47CD89"} stroke="none" strokeWidth={1}/>
                        </Pie>
                        <text
                            x="50%"
                            y="40%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{fontSize: '8px', fill: 'white'}}
                        >
                            Chance
                        </text>
                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{fontSize: '12px', fill: 'white'}}
                        >
                            {(Number(data.yesPrice) + Number(data.noPrice)) * Number(data.yesPrice) * 100}%
                        </text>
                    </PieChart>
                </Box>
            </Flex>
            <Grid>
                <Grid.Col span={6}>
                    <Button
                        w="100%"
                        color={yesButtonerHover ? "rgba(7, 77, 49, 0.8)" : "rgba(7, 77, 49, 0.3)"}
                        onClick={() => router.push(`/detail/${data.id}`)}
                        onMouseEnter={() => setYesButtonHover(true)}
                        onMouseLeave={() => setYesButtonHover(false)}
                    >
                        <Flex
                            gap={6}
                            align="center"
                            justify="center"
                            onClick={() => router.push(`/detail/${data.id}`)}
                        >
                            <Text size="15px" style={{color: "#47CD89"}} className="bold-text"
                            >Buy Yes</Text>
                            <IconChevronsUp color="#47CD89"/>
                        </Flex>
                    </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Button
                        color={noButtonerHover ? "rgba(217, 45, 32, 0.8)" : "rgba(217, 45, 32, 0.3)"}
                        w="100%"
                        onMouseEnter={() => setNoButtonHover(true)}
                        onMouseLeave={() => setNoButtonHover(false)}
                    >
                        <Flex
                            gap={6}
                            align="center"
                            justify="center"
                            onClick={() => router.push(`/detail/${data.id}`)}
                        >
                            <Text size="15px" style={{color: "#F97066"}} className="bold-text">Buy No</Text>
                            <IconChevronsDown color="#F97066"/>
                        </Flex>
                    </Button>
                </Grid.Col>
            </Grid>
        </Flex>
        <Flex p={16} justify="space-between"
              className="border-t border-[#1F242F]"
              onMouseEnter={() => setHoverBg(true)}
              onMouseLeave={() => setHoverBg(false)}
              onClick={() => router.push(`/detail/${data.id}`)}
        >
            <Flex
                gap={5}
                align="center"
            >
                <img src="/img/chartbar_icon.svg" style={{width: "12px"}}/>
                <Text size="12px" style={{color: "#CECFD2"}}>
                    {data.volume}
                </Text>
            </Flex>
            <Flex
                gap={8}
                align="center"
            >
                <img src="/img/vote_icon.svg" style={{width: "14px"}} className="cursor-pointer"/>
                <img src="/img/view_icon.svg" style={{width: "14px"}} className="cursor-pointer"
                     onClick={() => router.push(`/detail/${data.id}`)}
                />
            </Flex>
        </Flex>
    </Box>
}

export default MarketCard;