import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiSearch,
  FiX,
} from "react-icons/fi";
import DeleteConfirmationModal from "../../components/Form/DeleteConfirmationModal";

export default function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    photo: null,
    photoPreview: "",
    catagory: "",
    quantity: "",
    shipping: "",
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/category/get-catagory`
      );
      if (data?.success) {
        setCategories(data?.getAll);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    enqueueSnackbar(error.response?.data?.message || "Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const handleChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      oldPrice: "",
      photo: null,
      photoPreview: "",
      catagory: "",
      quantity: "",
      shipping: "",
    });
    setIsEdit(false);
    setEditingProductId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", productForm.name);
      productData.append("description", productForm.description);
      productData.append("price", productForm.price);
      productData.append("oldPrice", productForm.oldPrice);
      productData.append("catagory", productForm.catagory);
      productData.append("quantity", productForm.quantity);
      productData.append("shipping", productForm.shipping);
      if (productForm.photo) {
        productData.append("photo", productForm.photo);
      }

      let response;
      if (isEdit) {
        // Update product
        response = await axios.put(
          `${import.meta.env.VITE_APP_API}/api/v1/product/update-product/${editingProductId}`,
          productData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create product
        response = await axios.post(
          `${import.meta.env.VITE_APP_API}/api/v1/product/create-product`,
          productData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data?.success) {
        enqueueSnackbar(
          isEdit ? "Product updated successfully" : "Product created successfully",
          {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          }
        );
        getAllProducts();
        resetForm();
        document.getElementById("product_modal").close();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setEditingProductId(product._id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice,
      photoPreview: product.photo ||`${ import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${product._id}`,
      catagory: product.catagory?._id || "",
      quantity: product.quantity,
      shipping: product.shipping.toString(),
    });
    document.getElementById("product_modal").showModal();
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        enqueueSnackbar("Product deleted successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        getAllProducts();
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (productToDelete) {
            handleDelete(productToDelete);
            setDeleteModalOpen(false);
          }
        }}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="flex items-center justify-center bg-[#FF851B] hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
            onClick={() => {
              resetForm();
              document.getElementById("product_modal").showModal();
            }}
          >
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FF851B] border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Old Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {product.photo && (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={`${
                                  import.meta.env.VITE_APP_API
                                }/api/v1/product/product-photo/${product._id}`}
                                alt={product.name}
                                onError={(e) =>
                                  (e.target.src = "/path/to/fallback-image.jpg")
                                }
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.catagory?.name || "Uncategorized"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 line-through">
                          ${product.oldPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-100">
                          {product._id ? (
                            <img
                              src={`${
                                import.meta.env.VITE_APP_API
                              }/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                              onError={(e) =>
                                (e.target.src = "/path/to/fallback-image.jpg")
                              }
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="flex items-center cursor-pointer text-[#FF851B] hover:text-orange-600 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                            onClick={() => handleEdit(product)}
                          >
                            <FiEdit2 className="mr-1" /> Edit
                          </button>
                          <button
                            className="flex items-center cursor-pointer text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => {
                              setProductToDelete(product._id);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      {searchTerm
                        ? "No products match your search."
                        : "No products found. Add your first product to get started."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <dialog id="product_modal" className="modal backdrop-blur-sm">
        <div className="modal-box p-0 max-w-2xl h-[90vh] rounded-lg overflow-scroll shadow-xl">
        <form onSubmit={handleSubmit} className="bg-white max-w-3xl mx-auto w-full">
  {/* Modal Header */}
  <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
      {isEdit ? "Edit Product" : "Add New Product"}
    </h3>
    <button
      type="button"
      onClick={() => {
        resetForm();
        document.getElementById("product_modal").close();
      }}
      className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <FiX className="w-5 h-5" />
    </button>
  </div>

  {/* Modal Body */}
  <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    {/* Product Name */}
    <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Product Name
      </label>
      <input
        type="text"
        name="name"
        value={productForm.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
        placeholder="Enter product name"
        required
      />
    </div>

    {/* Description */}
    <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Description
      </label>
      <textarea
        name="description"
        value={productForm.description}
        onChange={handleChange}
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
        placeholder="Enter product description"
      />
    </div>

    {/* Price */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Price ($)
      </label>
      <input
        type="number"
        name="price"
        value={productForm.price}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
        placeholder="0.00"
        min="0"
        step="0.01"
        required
      />
    </div>

    {/* Old Price */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Old Price ($)
      </label>
      <input
        type="number"
        name="oldPrice"
        value={productForm.oldPrice}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
        placeholder="0.00"
        min="0"
        step="0.01"
        required
      />
    </div>

    {/* Quantity */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Quantity
      </label>
      <input
        type="number"
        name="quantity"
        value={productForm.quantity}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
        placeholder="0"
        min="0"
        required
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Category
      </label>
      <select
        name="catagory"
        value={productForm.catagory}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors cursor-pointer"
        required
      >
        <option value="">Select a category</option>
        {categories.map((catagory) => (
          <option key={catagory._id} value={catagory._id}>
            {catagory.name}
          </option>
        ))}
      </select>
    </div>

    {/* Shipping */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Shipping
      </label>
      <select
        name="shipping"
        value={productForm.shipping}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors cursor-pointer"
        required
      >
        <option value="">Select shipping option</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>

    {/* Image Upload */}
    <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
        Product Image
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 2MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProductForm({
                  ...productForm,
                  photo: e.target.files[0],
                  photoPreview: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </label>
      </div>
      {productForm.photoPreview && (
        <div className="mt-2 flex justify-center">
          <img
            src={productForm.photoPreview}
            alt="Preview"
            className="h-20 rounded-md"
          />
        </div>
      )}
    </div>
  </div>

  {/* Modal Footer */}
  <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
    <button
      type="button"
      onClick={() => {
        resetForm();
        document.getElementById("product_modal").close();
      }}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF851B] transition-colors cursor-pointer"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 text-sm font-medium text-white bg-[#FF851B] rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors cursor-pointer"
    >
      {isEdit ? "Update Product" : "Add Product"}
    </button>
  </div>
</form>

        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}