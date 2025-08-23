import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Local states for form fields
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");

  // ✅ Load product data into form fields
  useEffect(() => {
    const existingProduct = products.find((p) => p.id == id);
    if (existingProduct) {
      settitle(existingProduct.title);
      setimage(existingProduct.image);
      setprice(existingProduct.price);
      setcategory(existingProduct.category);
      setdescription(existingProduct.description);
    }
  }, [id, products]);

  // ✅ Update product handler
  const updateProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      price.toString().trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Please fill all the details correctly.");
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id == id ? { ...p, title, image, category, price, description } : p
    );

    setproducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
    toast.success("Product has been Edited Successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6 sm:px-6 lg:px-8">
      <form
        onSubmit={updateProductHandler}
        className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-5"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
         Edit Product
        </h1>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Product Title"
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />

        {/* Image URL */}
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setimage(e.target.value)}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />

        {/* Price + Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Product Description"
          rows="4"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm sm:text-base"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 w-full sm:w-40 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 w-full sm:w-40 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
