// ─────────────────────────────────────────────────────────────
//  MINTED MILLIONAIRES — site config
//  Edit these values; app.js reads them at load.
// ─────────────────────────────────────────────────────────────
window.MM_CONFIG = {
  // Token contract address (shown in hero + footer, copy button)
  CA: "xxxxxxxxxxxxxxxxxxxxxxx",

  // X / Twitter profile link — every element with [data-x-link] gets this href
  X_URL: "#",

  // Mint settings
  MINT: {
    supply: 10000,
    minted: 0,          // displayed count (will be replaced by on-chain data when wired)
    maxPerWallet: 3,
    live: false,        // set true when the candy machine / mint endpoint is live
    // Candy Machine / mint endpoint goes here when ready:
    candyMachineId: "",
    rpc: "https://api.mainnet-beta.solana.com",
  },
};
