import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CatagoryForm from "../../components/Form/CatagoryForm";
import DeleteConfirmationModal from "../../components/Form/DeleteConfirmationModal";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/category/get-catagory`
      );
      if (data.success) {
        setCategories(data.getAll);
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Something went wrong", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        // Update category
        const { data } = await axios.put(
          `${
            import.meta.env.VITE_APP_API
          }/api/v1/category/update-category/${editingCategoryId}`,
          { name }
        );
        if (data.success) {
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      } else {
        // Create new category
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_API}/api/v1/category/create-category`,
          { name }
        );
        if (data.success) {
          enqueueSnackbar(`${name} created successfully`, {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else {
          enqueueSnackbar(data.message, {
            variant: "error",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      }

      // Reset form & refresh list
      setName("");
      setEditingCategoryId(null);
      document.getElementById("category_modal").close();
      getAllCategories();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Something went wrong", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/v1/category/delete-catagory/${pid}`
      );
      if (data.success) {
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        getAllCategories();
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Something went wrong", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const openEditModal = (category) => {
    setName(category.name);
    setEditingCategoryId(category._id);
    document.getElementById("category_modal").showModal();
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            if (categoryToDelete) {
              handleDelete(categoryToDelete);
              setDeleteModalOpen(false);
            } else {
              console.error("No category selected for deletion");
            }
          }}
          title="Delete Category"
          message="Are you sure you want to delete this category? This action cannot be undone."
        />

        {/* Page Header + Form */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Category Management
          </h1>
          <CatagoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
            editingId={editingCategoryId}
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FF851B] border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr
                        key={category._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {category.slug || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                            <button
                              onClick={() => openEditModal(category)}
                              className="flex items-center text-[#FF851B] hover:text-orange-600 p-2 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                            >
                              <FiEdit2 className="mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => {
                                setCategoryToDelete(category._id);
                                setDeleteModalOpen(true);
                              }}
                              className="flex items-center text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
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
                        colSpan="3"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No categories found. Add your first category to get
                        started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Entry Info */}
        {categories.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center sm:text-left">
            Showing 1 to {categories.length} of {categories.length} entries
          </div>
        )}
      </div>
    </>
  );
}
