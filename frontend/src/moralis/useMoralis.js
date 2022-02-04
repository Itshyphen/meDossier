export function useMoralis() {
    // Moralis Initialization
    let Moralis;
    if (typeof window !== `undefined`) {
      Moralis = require("moralis");
      Moralis.initialize("9SI3yZPrr7ConF4LCHOlIXjwl8nmheUm1YmRjvic");
      Moralis.serverURL ="https://akswr2xxeyur.usemoralis.com:2053/server";
      
    }
    return { Moralis };
  }