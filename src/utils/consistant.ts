export const APP_TITLE: string = "";
export const APP_DESCRIPTION: string = "";
export const CATEGORIES = [
    {name: "All", page: "all"},
    {name: "New", page: "new"},
    {name: "Trending", page: "trending"},
    {name: "Business", page: "business"},
    {name: "Creator", page: "creator"},
    {name: "Sports", page: "sports"},
    {name: "WordEconomy", page: "crypto"},
    {name: "Trump", page: "trump"},
];

export const HEADER_PAGES = [
    // { name: "Markets", page: "markets" },
    // { name: "Portfolio", page: "portfolio" },
    // { name: "Create Market", page: "create-market" },
];

export const MARKET_CATEGORIES = [
    {
        name: "Crypto", key: "crypto", childrens: [
            {name: "All", key: "all"},
            {name: "Featured", key: "crypto_featured"},
            {name: "Hit Price", key: "crypto_hit_price"},
            {name: "MicroStrategy", key: "crypto_microstratgy"},
            {name: "Stablecoins", key: "crypto_stablecoins"},
        ],
    },
    {name: "Culture", key: "culture", childrens: []},
    {name: "Economy", key: "economy", childrens: []},
    {name: "Politics", key: "politics", childrens: []},
    {name: "Sports", key: "sports", childrens: []},
    {name: "Tech", key: "tech", childrens: []},
    {name: "Trump", key: "trump", childrens: []},
    {name: "World", key: "world", childrens: []},
]

export const CONTRACT_CONFIG = {
    DEEPBOOK_PACKAGE_ID: "0x0b498f1b967ad5bc10fae981a681f70d74454d322d44d94578f8d6f59351e38d",
    DEEPBOOK_REGISTRY_ID: "0x82f79b3e440244b01654e5c12c5b442ad31a1082b84f7eaedae48e32364093b4",

    PACKAGE_ID: "0x8517e9b1185b754a559ebc8ebd623935f86c0e53359023ede7ecb71b02002363",


    MARKET_MODULE: "market_manager",
    MARKET_CREATE_FUNCTION: "create_market",
    MARKET_BUY_FUNCTION: "buy_position",
    MARKET_SELL_FUNCTION: "sell_position",
    MARKET_RESOLVE_FUNCTION: "resolve_market",

    // Add any other contract-related constants here
    SUI_TYPE: "0x2::sui::SUI",

    // Network-specific constants
    TESTNET_CLOCK_ID: "0x6",
};
