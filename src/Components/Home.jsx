import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { ProductContext } from "../utils/Context";
import { Link, useLocation } from "react-router-dom";
import Loading from "./Loading";
// import axios from "../utils/axios"; // optional if you want API fetch

const Home = () => {
  const [products] = useContext(ProductContext);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  let [filteredProducts, setfilteredProducts] = useState(null);

  useEffect(() => {
    if (!filteredProducts || category === "undefined")
      setfilteredProducts(products);
    if (category !== "undefined")
      setfilteredProducts(products.filter((p) => p.category === category));
  }, [category, products]);

  return products ? (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
      
      <Nav />

     
      <div className="flex-1 h-full p-4 sm:p-8 md:p-8 lg:p-10  bg-zinc-200 overflow-y-auto">
        <div className="flex flex-wrap justify-center sm:justify-start  gap-4">
          {filteredProducts &&
            filteredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/details/${p.id}`}
                className="card flex flex-col items-center justify-center 
                          w-[46%] sm:w-[30%] md:w-[22%] lg:w-[18%] 
                          h-[38vh] sm:h-[40vh] p-3 border border-zinc-300 rounded shadow      text-center transition hover:shadow-md bg-white">
                <div
                  className="w-full h-[150px] sm:h-[180px] md:h-[170px] mb-4 bg-contain bg-no-repeat bg-center 
                             cursor-pointer transform transition hover:scale-110"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <h1 className="font-semibold text-sm sm:text-base line-clamp-2 transition hover:text-blue-400">
                  {p.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
