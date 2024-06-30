import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Pagination = ({
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
                    searchParams.get("continent")
                      ? navigate({
                          pathname: "/",
                          search: createSearchParams({
                            continent: searchParams.get("continent"),
                            page: number,
                          }).toString(),
                        })
                      : navigate({
                          pathname: "/",
                          search: createSearchParams({
                            page: number,
                          }).toString(),
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

  const handleClickPrevious = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;

    if (currentPage !== 1) {
      searchParams.get("continent")
        ? navigate({
            pathname: "/",
            search: createSearchParams({
              continent: searchParams.get("continent"),
              page: prevPage,
            }).toString(),
          })
        : navigate({
            pathname: "/",
            search: createSearchParams({
              page: prevPage,
            }).toString(),
          });
      onPageChange(prevPage);
    }
  };

  const handleClickNext = () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    if (totalPages !== currentPage) {
      searchParams.get("continent")
        ? navigate({
            pathname: "/",
            search: createSearchParams({
              continent: searchParams.get("continent"),
              page: nextPage,
            }).toString(),
          })
        : navigate({
            pathname: "/",
            search: createSearchParams({
              page: nextPage,
            }).toString(),
          });
      onPageChange(nextPage);
    }
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex flex-wrap justify-center  -space-x-px text-base h-10">
          {items}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
