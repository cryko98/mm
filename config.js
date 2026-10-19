// ─────────────────────────────────────────────────────────────
//  MINTED MILLIONAIRES — site config
//  Edit these values; app.js reads them at load.
// ─────────────────────────────────────────────────────────────
window.MM_CONFIG = {
  // $MM token contract address (hero + footer + holder check)
  CA: "xxxxxxxxxxxxxxxxxxxxxxx",

  // X / Twitter profile link — every [data-x-link] gets this href
  X_URL: "#",

  // ── Holder-only claim ──────────────────────────────────────
  CLAIM: {
    // true  → skip the on-chain $MM balance check (use while CA is a placeholder)
    // false → wallet must hold at least MIN_HOLD $MM to claim
    DEV_MODE: true,
    MIN_HOLD: 1,                       // minimum $MM balance (UI amount) to qualify
    RPC: "https://api.mainnet-beta.solana.com",
    // Backend that transfers the NFT. Receives POST {wallet, nftId, message, signature}.
    // Leave empty → claims are only recorded in this browser (demo mode).
    ENDPOINT: "",
  },

  // ── The 20 ghosts ──────────────────────────────────────────
  // image: path to the NFT art (all use the genesis art until the set is drawn)
  // hue:   colour shift applied to the art so each ghost reads differently
  // claimed: set to a wallet string once that ghost is gone
  NFTS: [
    { id: 1,  name: "The Spark",       hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 2,  name: "Night Shift",     hue: 200,  image: "assets/mm.jpg", claimed: null },
    { id: 3,  name: "Green Candle",    hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 4,  name: "Coffee Break",    hue: 35,   image: "assets/mm.jpg", claimed: null },
    { id: 5,  name: "Still Here",      hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 6,  name: "Headphones On",   hue: 275,  image: "assets/mm.jpg", claimed: null },
    { id: 7,  name: "The Other Ghost", hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 8,  name: "Bonding Curve",   hue: 160,  image: "assets/mm.jpg", claimed: null },
    { id: 9,  name: "Rekt & Back",     hue: -40,  image: "assets/mm.jpg", claimed: null },
    { id: 10, name: "Trench Rat",      hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 11, name: "Creator Fee",     hue: 60,   image: "assets/mm.jpg", claimed: null },
    { id: 12, name: "Holder Reward",   hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 13, name: "Callout",         hue: 320,  image: "assets/mm.jpg", claimed: null },
    { id: 14, name: "Referral",        hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 15, name: "Mint Green",      hue: 20,   image: "assets/mm.jpg", claimed: null },
    { id: 16, name: "10:58 PM",        hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 17, name: "Five Lines",      hue: 120,  image: "assets/mm.jpg", claimed: null },
    { id: 18, name: "No Chart",        hue: 0,    image: "assets/mm.jpg", claimed: null },
    { id: 19, name: "Pale Flame",      hue: 240,  image: "assets/mm.jpg", claimed: null },
    { id: 20, name: "The Minted One",  hue: 0,    image: "assets/mm.jpg", claimed: null },
  ],
};
