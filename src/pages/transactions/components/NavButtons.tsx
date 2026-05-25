import { Button } from "@/components";

export function NavButtons({
  nextPageKey,
  setPageKeys,
  pageIndex,
  setPageIndex,
}: {
  nextPageKey: string | null;
  pageIndex: number;
  setPageKeys: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNext = () => {
    if (!nextPageKey) return;

    const nextKey = nextPageKey;

    setPageKeys((prev) => {
      const updated = prev.slice(0, pageIndex + 1);
      updated.push(nextKey);
      return updated;
    });

    setPageIndex((i) => i + 1);
  };

  const handlePrev = () => {
    if (pageIndex === 0) return;
    setPageIndex((i) => i - 1);
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <Button
        className="py-1 px-2"
        onClick={handlePrev}
        disabled={pageIndex === 0}
      >
        Prev
      </Button>

      <span className="text-[12px] text-gray-600">Page {pageIndex + 1}</span>

      <Button
        className="py-1 px-2"
        onClick={handleNext}
        disabled={!nextPageKey}
      >
        Next
      </Button>
    </div>
  );
}
