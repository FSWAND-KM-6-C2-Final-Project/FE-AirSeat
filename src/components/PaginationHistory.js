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
      <>
        <div className="flex justify-center mt-2 pb-4">
          <nav>
            <ul className="flex flex-wrap list-none justify-center">
              <li key={number} className="mx-1 mb-2">
                <button
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
                  className={`px-3 py-1 rounded-full ${
                    currentPage === number
                      ? "bg-customBlue2 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  style={{ minWidth: "30px" }}
                >
                  {number}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex flex-wrap justify-center -space-x-px text-base h-10">
          {items}
        </ul>
      </nav>
    </>
  );
};

export default HistoryPagination;
