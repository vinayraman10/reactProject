// import axios from '../utils/axios'
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const productDeleteHandler = () => {
    const filteredProducts = products.filter((p) => p.id != id); // fixed id check
    setproducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    navigate("/");
    toast.success("Product has been Deleted Successfully");
  };

  useEffect(() => {
    if (!product) {
      setproduct(products.find((p) => p.id == id)); // cleaner than filter()[0]
    }
  }, [id, products, product]);

  return product ? (
    <>
      <div className="w-[95%] lg:w-[70%] min-h-min flex flex-col lg:flex-row m-auto px-6 py-8 gap-8 bg-zinc-100 rounded-2xl shadow-lg mt-10">
      
        <div className="flex-1 flex justify-center items-center">
          <img
            className="w-[70%] max-h-[400px] object-contain rounded-md shadow-md"
            src={product.image}
            alt={product.title}
          />
        </div>

     
        <div className="flex-1 font-sans flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl mt-2 font-bold text-gray-800">
              {product.title}
            </h1>
            <h3 className="mt-2 md:mt-3 font-semibold text-gray-500 capitalize">
              {product.category}
            </h3>
            <h2 className="text-xl md:text-2xl mt-2 text-red-500 font-semibold">
              {product.price}$
            </h2>
            <p className="mb-6 mt-3 font-medium text-gray-700 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            
            <div className="flex flex-wrap gap-4">
              <Link
                to={`/edit/${product.id}`}
                className="py-2 px-5 md:py-3 md:px-6 border border-blue-600 rounded-md text-blue-600 font-semibold bg-white shadow-md hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out"
              >
                Edit
              </Link>

              <button
                onClick={productDeleteHandler}
                className="py-2 px-5 md:py-3 md:px-6 border border-red-500 rounded-md text-red-500 font-semibold bg-white shadow-md hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-400 focus:outline-none transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>

         
          <div className="mt-10">
            <button
              onClick={() => navigate(-1 || "/")}
              className="w-[120px] py-2 border border-gray-400 rounded-md text-gray-600 font-semibold bg-white shadow-md hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Details;
