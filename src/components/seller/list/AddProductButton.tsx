import { Link } from "react-router-dom";

const AddProductButton = () => {
  return (
    <>
      <Link to="/seller/new" className="fixed right-4 bottom-4 z-50">
        <button className=" mr-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-14 h-14 mt-3 bg-main-color  rounded-full shadow-md stroke-gray-300 drop-shadow-sm stroke-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </Link>
    </>
  );
};

export default AddProductButton;
