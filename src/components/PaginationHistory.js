import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const HistoryPagination = ({
  totalData,
  totalPages,
  pageNum,
  pageSize,
  onPageChange,
}) => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let items = [];
  const currentPage = parseInt(searchParams.get("page")) || 1;

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <li key={number}>
        <a
          onClick={() => {
            const bookingCode = searchParams.get("bookingCode");
            const startDate = searchParams.get("startDate");
            const endDate = searchParams.get("endDate");

            const params = { page: number };

            if (bookingCode) {
              params.bookingCode = bookingCode;
            }
            if (startDate) {
              params.startDate = startDate;
            }
            if (endDate) {
              params.endDate = endDate;
            }

            navigate({
              pathname: "/order-history",
              search: createSearchParams(params).toString(),
            });

            onPageChange(number);
          }}
          className={`flex items-center justify-center cursor-pointer px-4 h-10 leading-tight border border-customBlue1 hover:bg-gray-100 hover:text-gray-700 ${
            currentPage === number
              ? "bg-customBlue2 text-white"
              : "text-customBlue1 bg-white"
          }`}
        >
          {number}
        </a>
      </li>
    );
  }

  const handleClickPrevious = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;

    if (currentPage !== 1) {
      const bookingCode = searchParams.get("bookingCode");
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");

      const params = { page: prevPage };

      if (bookingCode) {
        params.bookingCode = bookingCode;
      }
      if (startDate) {
        params.startDate = startDate;
      }
      if (endDate) {
        params.endDate = endDate;
      }

      navigate({
        pathname: "/order-history",
        search: createSearchParams(params).toString(),
      });
      onPageChange(prevPage);
    }
  };

  const handleClickNext = () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    if (totalPages !== currentPage) {
      const bookingCode = searchParams.get("bookingCode");
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");

      const params = { page: nextPage };

      if (bookingCode) {
        params.bookingCode = bookingCode;
      }
      if (startDate) {
        params.startDate = startDate;
      }
      if (endDate) {
        params.endDate = endDate;
      }

      navigate({
        pathname: "/order-history",
        search: createSearchParams(params).toString(),
      });
      onPageChange(nextPage);
    }
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex flex-wrap justify-center -space-x-px text-base h-10">
          <li>
            <a
              onClick={handleClickPrevious}
              className="flex items-center justify-center cursor-pointer px-4 h-10 ms-0 leading-tight bg-customBlue1 text-white border border-e-0 border-customBlue1 rounded-s-md hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>

          {items}

          <li>
            <a
              onClick={handleClickNext}
              className="flex items-center justify-center cursor-pointer px-4 h-10 leading-tight text-white bg-customBlue1 border border-customBlue1 rounded-e-md hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HistoryPagination;