import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();

  return <div>Pagination</div>;
};

export default Pagination;
