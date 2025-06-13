"use client"

import { Box, Button, Flex, Text } from "@mantine/core"
import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { useState } from "react";

export default function WalletConnect() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    background: isHovered ? '#00a592' : 'rgba(38, 133, 241, 1)',
    color: 'white',
    cursor: 'pointer',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s',
    fontWeight: 'bold',
  };

  return <Box>
    {
      currentAccount ?
        <Flex gap={15} align="center">
          <Text>
            {formatAddress(currentAccount.address)}
          </Text>
          <Button color="red"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        </Flex>
        :
        <ConnectButton
          style={style}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
    }
  </Box>
}