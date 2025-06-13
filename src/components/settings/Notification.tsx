import { Box } from "@mantine/core";

function Notification() {
    return <Box className="border border-[#1F242F] rounded-[10px] bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16]">
        <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
        </div>
        <Box className="p-[16px]">
            Need to guidences
        </Box>
    </Box>
}

export default Notification;