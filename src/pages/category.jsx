import { useState } from "react";
import Modal from "../componets/modal";

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = () => {
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };
  const data = [
    { id: 1, name: "Item 1", price: "$10", quantity: 5 },
    { id: 2, name: "Item 2", price: "$20", quantity: 3 },
    { id: 3, name: "Item 3", price: "$30", quantity: 2 },
    { id: 4, name: "Item 4", price: "$40", quantity: 7 },
  ];
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">Category</h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add Category
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">№</th>
              <th className="py-3 px-6 text-left">Title ENG</th>
              <th className="py-3 px-6 text-left">Title RU</th>
              <th className="py-3 px-6 text-left">Title DE</th>
              <th className="py-3 px-6 text-left">Actions</th>{" "}
              {/* New column for Total */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{item.id}</td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className="py-3 px-6">{item.quantity}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={ModalEdit}
                    className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
                  >
                    Edit{" "}
                  </button>{" "}
                  <button
                    onClick={ModalDelete}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </td>{" "}
                {/* Total calculation */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {isOpen && (
        <Modal close={ModalOpen} title={"Add Category"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (EN)
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (RU)
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (DE)
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Category
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalEdit} title={"Update Category"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (EN)
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (RU)
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (DE)
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Update Category
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete Category"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            {" "}
            Are you sure you want to delete this category?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
