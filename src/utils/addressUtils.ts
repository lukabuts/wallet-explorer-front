export function shortAddr(addr: string) {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export function isValidAddr(addr: string) {
  return /^0x[0-9a-fA-F]{40}$/.test(addr);
}
