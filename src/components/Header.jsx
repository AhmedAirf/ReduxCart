import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center gap-4 p-4 bg-gray-200 rounded-lg shadow-md mb-11">
      <h1>
        <span className="text-4xl font-bold">ReduxCart</span>
      </h1>
      <div className="flex gap-8">
        <Link to="/" className="text-2xl font-bold">
          Home
        </Link>
        <Link to="/cart" className="text-2xl font-bold">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Header;
