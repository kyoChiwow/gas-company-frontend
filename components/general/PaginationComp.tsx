"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Builds a windowed page list with ellipsis markers.
 * siblingCount controls how many pages show on each side of the current page.
 * Returns a mix of numbers and the string "ellipsis".
 */
function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const totalNumbersToShow = siblingCount * 2 + 5; // first, last, current, 2 ellipses

  if (totalPages <= totalNumbersToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: (number | "ellipsis")[] = [1];

  if (showLeftEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let i = 2; i < leftSiblingIndex; i++) pages.push(i);
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let i = rightSiblingIndex + 1; i < totalPages; i++) pages.push(i);
  }

  pages.push(totalPages);

  return pages;
}

export default function PaginationComp({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  // Fewer siblings on mobile keeps the row from wrapping/overflowing.
  const desktopPages = getPageRange(currentPage, totalPages, 1);
  const mobilePages = getPageRange(currentPage, totalPages, 0);

  return (
    <Pagination>
      <PaginationContent className="flex-wrap justify-center gap-y-2">
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {/* Desktop / tablet: wider window */}
        {desktopPages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`d-ellipsis-${idx}`} className="hidden sm:list-item">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} className="hidden sm:list-item">
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Mobile: tighter window so the row never overflows */}
        {mobilePages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`m-ellipsis-${idx}`} className="sm:hidden">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`m-${page}`} className="sm:hidden">
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}