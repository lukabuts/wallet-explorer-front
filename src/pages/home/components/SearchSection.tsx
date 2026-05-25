import { Button } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { isValidAddr } from "@/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchSection() {
  const [val, setVal] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSearch() {
    setError("");
    if (!val.trim()) return;
    if (!isValidAddr(val.trim())) {
      setError(
        "Invalid address — must start with 0x and be 42 characters long.",
      );
      return;
    }
    navigate(buildRoute(ROUTES.WALLET, { address: val.trim() }));
  }
  return (
    <section className="max-w-2xl mx-auto px-6 mb-14">
      {/* Search bar */}
      <div
        className={`flex items-center gap-3 bg-[#111] rounded-xl border transition-all px-4 ${val ? "border-orange-500/30" : "border-white/8"}`}
      >
        <svg
          className="text-gray-600 shrink-0"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="flex-1 bg-transparent border-none outline-none text-gray-300 py-4 text-[13px] placeholder-gray-600"
          style={{ fontFamily: "'Space Mono',monospace" }}
          placeholder="0x... paste a MetaMask address"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>Look Up</Button>
      </div>

      <p className="text-[12px] text-gray-600 mt-2 px-1">
        Enter a full Ethereum address (42 characters, starting with 0x)
      </p>

      {/* Error */}
      {error && (
        <div
          className="mt-3 px-4 py-3 rounded-lg bg-red-500/8 border border-red-500/20 text-red-400 text-[12px]"
          style={{ fontFamily: "'Space Mono',monospace" }}
        >
          {error}
        </div>
      )}
    </section>
  );
}
