import React from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

export default function CategoryForm({ handleSubmit, value, setValue,editingId }) {
  return (
    <>
      <button 
        className="flex items-center cursor-pointer bg-[#FF851B] hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
        onClick={() => document.getElementById('category_modal').showModal()}
      >
        <FiPlus className="mr-2" /> {editingId?"Update Catagory":"Add New Category"}
      </button>

      <dialog id="category_modal" className="modal backdrop-blur-sm">
        <div className="modal-box p-0 max-w-md rounded-lg overflow-hidden shadow-xl">
          <form onSubmit={handleSubmit} className="bg-white">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingId?"Update Catagory":"Add New Category"}
              </h3>
              <button 
                type="button" 
                onClick={() => document.getElementById('category_modal').close()}
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                  {editingId?"Update Catagory Name":"Add Category Name"}
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] outline-none transition-colors"
                  placeholder="Enter category name"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={() => document.getElementById('category_modal').close()}
                className="px-4 py-2 text-sm cursor-pointer  font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF851B] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-[#FF851B] rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
               {editingId?"Update Catagory":"Add Category"}
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}