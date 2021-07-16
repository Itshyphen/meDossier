export function useMoralis() {
    // Moralis Initialization
    let Moralis;
    if (typeof window !== `undefined`) {
      Moralis = require("moralis");
      Moralis.initialize("nKZ9n1YocfUDZOSKSJX9KHpoFeUWp8vOoPp1aGAv");
      Moralis.serverURL = "https://blswm8kqumap.usemoralis.com:2053/server";
      
    }
    return { Moralis };
  }