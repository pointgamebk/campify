"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {};

  return <div>Pagination</div>;
};

export default Pagination;
