const LoadingCard = ({ totalData = 10 }) => {
  const cards = Array.from({ length: totalData }, (_, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-md p-4 animate-pulse grid-item relative mb-10"
    >
      <div className="rounded-t-lg w-full h-[150px] bg-gray-200 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded w-1/6 mb-2"></div>
      <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-2 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div className="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
    </div>
  ));
  return <>{cards}</>;
};

export default LoadingCard;
