import { CheckIcon, CopyIcon } from "@/assets/icons";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className="text-gray-600 hover:text-gray-300 transition-colors ml-1"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
