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

  // ── The 12 ghosts ──────────────────────────────────────────
  // image:   the NFT art (assets/nft/XX.png)
  // hue:     optional colour shift (0 = as drawn)
  // claimed: set to a wallet string once that ghost is gone
  NFTS: [
    { id: 1,  name: "Classic Pump", hue: 0, image: "assets/nft/01.png", claimed: null },
    { id: 2,  name: "Beanie Pump",  hue: 0, image: "assets/nft/02.png", claimed: null },
    { id: 3,  name: "Halo Pump",    hue: 0, image: "assets/nft/03.png", claimed: null },
    { id: 4,  name: "Spiky Pump",   hue: 0, image: "assets/nft/04.png", claimed: null },
    { id: 5,  name: "Goblin Pump",  hue: 0, image: "assets/nft/05.png", claimed: null },
    { id: 6,  name: "Ghost Pump",   hue: 0, image: "assets/nft/06.png", claimed: null },
    { id: 7,  name: "Glitch Pump",  hue: 0, image: "assets/nft/07.png", claimed: null },
    { id: 8,  name: "Cat Pump",     hue: 0, image: "assets/nft/08.png", claimed: null },
    { id: 9,  name: "Dog Pump",     hue: 0, image: "assets/nft/09.png", claimed: null },
    { id: 10, name: "Robot Pump",   hue: 0, image: "assets/nft/10.png", claimed: null },
    { id: 11, name: "Pink Pump",    hue: 0, image: "assets/nft/11.png", claimed: null },
    { id: 12, name: "Shadow Pump",  hue: 0, image: "assets/nft/12.png", claimed: null },
  ],
};
