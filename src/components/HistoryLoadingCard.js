const HistoryLoadingCard = ({ totalData = 10 }) => {
  const cards = Array.from({ length: totalData }, (_, index) => (
    <div key={index} className="mb-3 animate-pulse">
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse grid-item relative mb-10">
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3 "></div>
      </div>
    </div>
  ));
  return <>{cards}</>;
};

export default HistoryLoadingCard;
