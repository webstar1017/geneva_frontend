import {Flex, Group, Menu, Text} from "@mantine/core";
import {
    IconChevronDown,
    IconChevronUp,
    IconDroplet,
    IconFilter,
    IconHourglass,
    IconLighter,
    IconStar,
    IconTrendingUp
} from "@tabler/icons-react";
import "react-multi-carousel/lib/styles.css";
import {useState} from "react";

export const FILTER_OPTIONS = [
    {
        name: "Sort by", childrens: [
            {name: "24hr Volume", icon: <IconTrendingUp color="#94969C" size={16}/>, key: "24hr_volume"},
            {name: "Total Volume", icon: <IconLighter color="#94969C" size={16}/>, key: "totla_volume"},
            {name: "Liquidity", icon: <IconDroplet color="#94969C" size={16}/>, key: "liquidity"},
            {name: "Newest", icon: <IconStar color="#94969C" size={16}/>, key: "newest"},
            {name: "End Soon", icon: <IconHourglass color="#94969C" size={16}/>, key: "end_soon"},
            {name: "Competitive", icon: <IconHourglass color="#94969C" size={16}/>, key: "competitive"}
        ]
    },
    {
        name: "Frequency", childrens: []
    }
];

function CategoryHeader() {
    const [openedFilter, setOpenedFilter] = useState<boolean>(false);
    return <Group
        align='center'
        justify='start'
        mt={20}
        gap={17}
    >
        <Menu width={200} position="bottom-start"
              opened={openedFilter} onChange={setOpenedFilter}
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
                    pt={14}
                    pb={14}
                    pl={16}
                    pr={19}
                    align="center"
                    miw={200}
                >
                    <Flex
                        gap={8}
                        align="center"
                    >
                        <IconFilter size={18} color="#94969C"/>
                        <Text size="16px">
                            Filters
                        </Text>
                    </Flex>
                    {
                        openedFilter ? <IconChevronUp color="#94969C"/> : <IconChevronDown color="#94969C"/>
                    }
                </Flex>
            </Menu.Target>
            <Menu.Dropdown
            >
                {
                    FILTER_OPTIONS.map((item, index) =>
                        item.childrens.length === 0 ? <Menu.Item key={`filter-${index}`}>{item.name}</Menu.Item> :
                            <Menu.Sub key={`filter-${index}`}>
                                <Menu.Sub.Target>
                                    <Menu.Sub.Item>{item.name}</Menu.Sub.Item>
                                </Menu.Sub.Target>
                                <Menu.Sub.Dropdown>
                                    {
                                        item.childrens.map((sub_item, sub_index) =>
                                            <Menu.Item w={200} key={`{filter-${index}}-${sub_index}`}>
                                                <Group>
                                                    {sub_item.icon}
                                                    <Text size="16px">{sub_item.name}</Text>
                                                </Group>
                                            </Menu.Item>
                                        )
                                    }
                                </Menu.Sub.Dropdown>
                            </Menu.Sub>
                    )
                }
            </Menu.Dropdown>
        </Menu>
        {/* <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
        </Carousel> */}
        {/*<Group gap={5}>*/}
        {/*    {*/}
        {/*        MARKET_CATEGORIES.filter(item => item.key === selectedCategory)[0].childrens.map((item, index: number) =>*/}
        {/*            <Button*/}
        {/*                variant={selectedSubCategory === item.key ? "light" : "transparent"}*/}
        {/*                onClick={() => {*/}
        {/*                    homeDispatch({*/}
        {/*                        field: "selectedSubCategory",*/}
        {/*                        value: item.key*/}
        {/*                    })*/}
        {/*                }}*/}
        {/*                key={`header-category-${index}`}*/}
        {/*                pl={6} pr={6}*/}
        {/*            >*/}
        {/*                <Text style={{color: "white"}} size="14px">*/}
        {/*                    {item.name}*/}
        {/*                </Text>*/}
        {/*            </Button>*/}
        {/*        )*/}
        {/*    }*/}
        {/*</Group>*/}
    </Group>
}

export default CategoryHeader;