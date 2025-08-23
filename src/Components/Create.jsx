import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context'
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {

  const navigate=  useNavigate()
const [products, setproducts]= useContext(ProductContext);

    const [title, settitle]= useState("")
    const [image, setimage]= useState("")
    const [price, setprice]= useState("")
    const [category, setcategory]= useState("")
    const [description, setdescription]= useState("")

    const addproducthandler =(e) =>{
        e.preventDefault();

        if (
        title.trim().length <5 || 
        image.trim().length < 5 ||
        price.trim().length <1 ||
        description.trim().length <5
     ) {
            alert("please fill the details")
            return;
        }

        const product ={
            id: nanoid(),
            title,
            image,
            category,
            price,
            description,
        };
      setproducts([...products , product])
      
      localStorage.setItem("products",JSON.stringify([...products, product]));
      navigate("/")
        toast.success("Product has been created")
          
    }

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
  <form className="w-full  max-w-fit bg-zinc-200  p-8 rounded-xl shadow-lg flex flex-col gap-5">
    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
      Add New Product
    </h1>

    {/* Title */}
    <input
      type="text"
      value={title}
      onChange={(e)=> settitle(e.target.value)}
      placeholder="Product Title"
      className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Image URL */}
    <input
      type="url"
      placeholder="Image URL"
      value={image}
      onChange={(e)=> setimage(e.target.value)}
      className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Price and category */}
    
<div className="flex gap-4">
  {/* Price */}
  <input
    type="number"
    placeholder="Price"
    value={price}
      onChange={(e)=> setprice(e.target.value)}
    className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
  />

  {/* Category */}
  <input
    type="text"
    placeholder="Category"
     value={category}
      onChange={(e)=> setcategory(e.target.value)}
    className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>

    {/* Description */}
    <textarea
      placeholder="Product Description"
      rows="4"
      value={description}
      onChange={(e)=> setdescription(e.target.value)}
      className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 resize-none"
    >
        
    </textarea>

    {/* Submit Button */}
    <button
    onClick={(addproducthandler)}
      type="submit"
      className="bg-blue-500 w-40 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
    >
      Add Product
    </button>
  </form>
</div>

  )
}

export default Create