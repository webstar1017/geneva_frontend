import { Flex, Text } from "@mantine/core";
import React, { FC } from "react";

interface Props {
    title: string,
    component: React.ReactElement
}

const Content:FC<Props> = ({ title, component }) => {
    return <Flex gap={20} direction="column">
        <Text size="18px">{title}</Text>
        {component}
    </Flex>
}

export default Content;