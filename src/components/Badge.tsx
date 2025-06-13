import { Box } from "@mantine/core";
import React, { FC } from "react";

interface Props {
    content: React.ReactElement,
    type: "alert" | "success"
}

const Badge:FC<Props> = ({content, type}) => {
    return <Box
        p={6}
        style={{
            border: `1px solid ${type === "alert" ? "#912018" : "#085D3A"}`,
            background: type === "alert" ? "#55160C" : "#053321",
            borderRadius: "15px"
        }}
    >
        {content}
    </Box>
}

export default Badge;