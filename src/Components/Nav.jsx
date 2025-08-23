import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";

const Nav = () => {
  const [products] = useContext(ProductContext);
  const [open, setOpen] = useState(false);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
                 ${(Math.random() * 255).toFixed()},
                 ${(Math.random() * 255).toFixed()},
                 0.4)`;
  };

  return (
    <>
      <div className="lg:hidden w-full flex justify-between items-center p-4 bg-gray-100 shadow-md fixed top-0 left-0 z-50">
        <Link to="/" className="text-lg font-bold text-gray-700">
          ShopVerse
        </Link>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav className="hidden lg:flex w-[18%] h-full bg-gradient-to-b from-gray-100 to-gray-200 shadow-xl flex-col items-center pt-6 rounded-r-2xl">
        <Link
          to="/"
          className="w-[80%] py-3 px-5 mb-4 text-center flex items-center justify-center gap-2 bg-green-500 text-white font-semibold rounded-xl shadow-md 
          hover:bg-green-600 hover:shadow-lg transition-all duration-300"
        >
          <Home size={18} /> Home
        </Link>

        <Link
          to="/create"
          className="w-[80%] py-3 px-5 mb-4 text-center bg-blue-500 text-white font-semibold rounded-xl shadow-md 
          hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
        >
          Add New Product
        </Link>

        <hr className="w-[80%] border-gray-300 my-4" />

        <h1 className="text-xl font-bold mb-4 w-[80%] text-gray-700 tracking-wide">
          Category Filter
        </h1>

        <hr className="w-[80%] border-gray-300 mb-4" />

        <div className="w-[80%] space-y-3">
          {distinct_category.map((c, i) => (
            <Link
              to={`/?category=${c}`}
              key={i}
              className="flex items-center p-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
            >
              <span
                style={{ backgroundColor: color() }}
                className="w-[28px] h-[28px] mr-3 rounded-full border border-gray-300 shadow-sm"
              ></span>
              <span className="capitalize text-gray-700 font-medium hover:text-blue-500">
                {c}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[70%] bg-white shadow-xl p-6 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <X size={28} />
        </button>

        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="block w-full py-3 mt-10 px-5 mb-6 text-center flex items-center justify-center gap-2 bg-green-500 text-white font-semibold rounded-xl shadow-md 
          hover:bg-green-600 hover:shadow-lg transition-all duration-300"
        >
          <Home size={18} /> Home
        </Link>

        <Link
          to="/create"
          onClick={() => setOpen(false)}
          className="block w-full py-3 px-5 mb-6 text-center bg-blue-500 text-white font-semibold rounded-xl shadow-md 
          hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
        >
          Add New Product
        </Link>

        <h1 className="text-xl font-bold mb-4 text-gray-700 tracking-wide">
          Category Filter
        </h1>
        <div className="space-y-3">
          {distinct_category.map((c, i) => (
            <Link
              to={`/?category=${c}`}
              key={i}
              onClick={() => setOpen(false)}
              className="flex items-center p-2 rounded-lg hover:bg-blue-100 transition-all duration-300"
            >
              <span
                style={{ backgroundColor: color() }}
                className="w-[28px] h-[28px] mr-3 rounded-full border border-gray-300 shadow-sm"
              ></span>
              <span className="capitalize text-gray-700 font-medium hover:text-blue-500">
                {c}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Nav;
