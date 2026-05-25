import { ethers } from "ethers";

export function shortAddr(addr: string) {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export function isValidAddr(addr: string) {
  return ethers.isAddress(addr);
}
