import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

/** Build a compact page list with ellipses, e.g. 1 … 4 5 6 … 10. */
function buildPages(page: number, pageCount: number): Array<number | "ellipsis"> {
  const pages: Array<number | "ellipsis"> = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || (p >= page - 1 && p <= page + 1)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }
  return pages;
}

/** Button-driven pager on top of the shadcn Pagination layout primitives. */
export function TablePagination({
  page,
  pageCount,
  onPageChange,
}: TablePaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <Pagination className="mx-0 w-auto justify-end">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Oldingi sahifa"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {buildPages(page, pageCount).map((token, index) =>
          token === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={token}>
              <Button
                variant={token === page ? "outline" : "ghost"}
                size="icon"
                aria-current={token === page ? "page" : undefined}
                onClick={() => onPageChange(token)}
              >
                {token}
              </Button>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
            aria-label="Keyingi sahifa"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
