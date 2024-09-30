import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params.id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [brand, setBrand] = useState(productData?.brand || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setImage(productData.image || "");
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setDescription(productData.description);
      setBrand(productData.brand);
      setCategory(productData.category);
      setStock(productData.stock || 0);
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("quantity", quantity);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({
        productId: params.id,
        data: formData,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product updated successfully!`);
        navigate("/admin/allproducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed! Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!answer) return;

      const data = deleteProduct(params.id);
      toast.success(`${data.name} deleted succesfully!`);
      navigate("/admin/allproducts");
    } catch (error) {
      console.error(error);
      toast.error("Deletion failed! Try again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded!");
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:pl-[9rem] sm:px-[0]">
      <div className=" md:ml-7 md:mt-3">
        <AdminMenu />
        <div className="p-3">
          <h1 className="h-12 text-2xl font-semibold my-5">Update Product</h1>
          <div className={`md:w-3/4 flex items-center`}>
            {image && (
              <div className="mb-3 mr-10">
                <img
                  src={image}
                  alt="product image"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}
            <div className={`mb-3 w-full ${image && "w-3/4 max-w-[680px]"}`}>
              <label
                htmlFor="image"
                className="border border-slate-700 dark:border-slate-300 max-w-[820px]
            px-4 block w-full rounded text-center cursor-pointer font-semibold py-11"
              >
                {!image && "Upload Image"}
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-black dark:text-white"}
                />
              </label>
            </div>
          </div>
          <div className="py-3">
            <div className="flex flex-wrap">
              <div className="one mr-10 mb-4">
                <label htmlFor="name" className="font-semibold">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={name}
                  className="p-3 my-2 w-[25rem] border-slate-700 dark:border-slate-300 border-0 
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two mr-10 mb-4">
                <label htmlFor="price" className="font-semibold">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  id="price"
                  value={price}
                  className="p-3 my-2 w-[25rem] border-slate-700 dark:border-slate-300 border-0 
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one mr-10 mb-4">
                <label htmlFor="quantity" className="font-semibold">
                  Quantity
                </label>
                <br />
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  className="p-3 my-2 w-[25rem] border-slate-700 dark:border-slate-300 border-0 
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two mr-10 mb-4">
                <label htmlFor="brand" className="font-semibold">
                  Brand
                </label>
                <br />
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  className="p-3 my-2 w-[25rem] border-slate-700 dark:border-slate-300 border-0 
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <br />
              <textarea
                type="text"
                id="description"
                value={description}
                className="p-3 my-2 w-[50rem] border-slate-700 dark:border-slate-300 border-0 min-h-16
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300 max-h-52"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap">
              <div className="one mr-10 mb-4">
                <label htmlFor="stock" className="font-semibold">
                  In Stock
                </label>
                <br />
                <input
                  type="number"
                  id="stock"
                  value={stock}
                  className="p-3 my-2 w-[25rem] border-slate-700 dark:border-slate-300 border-0 
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="two mr-10 mb-4">
                <label htmlFor="category" className="font-semibold">
                  Category
                </label>
                <br />
                <select
                  id="category"
                  value={category}
                  className="p-3 my-2 w-[25rem] border-slate-700 dark:border-slate-300 border-0 
              border-b-2 text-black dark:text-white bg-transparent focus:shadow-none focus:rounded
              focus:ring-0 focus:border focus:border-slate-700 dark:focus:border-slate-300"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" className="text-black">
                    Choose Category
                  </option>
                  {categories?.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      className="text-black"
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-indigo-600 text-white mt-3 py-2 px-4 rounded-lg hover:bg-indigo-500 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mr-8"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white mt-3 py-2 px-4 rounded-lg hover:bg-red-500 
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
