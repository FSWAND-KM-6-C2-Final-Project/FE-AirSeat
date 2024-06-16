const Pagination = () => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px text-base h-10">
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-customBlue1 text-white  border border-e-0 border-customBlue1 rounded-s-md hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-customBlue1 bg-white border border-customBlue1 hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-customBlue1 bg-white border border-customBlue1 hover:bg-gray-100 hover:text-gray-700"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              class="flex items-center justify-center px-4 h-10 text-blue-600 border border-customBlue1 bg-customBlue1 hover:bg-blue-100 hover:text-customBlue1   dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-customBlue1 bg-white border border-customBlue1 hover:bg-gray-100 hover:text-gray-700"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-customBlue1 bg-white border border-customBlue1 hover:bg-gray-100 hover:text-gray-700"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-4 h-10 leading-tight text-white bg-customBlue1 border border-customBlue1 rounded-e-md hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
