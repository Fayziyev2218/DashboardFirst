import { useState } from "react";
import Modal from "../componets/modal";

export default function Discaunt() {
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
    { id: 1, name: "0%", price: "2025-04-05", quantity: "2025-04-24" },
    { id: 2, name: "0%", price: "2025-04-22", quantity: "2025-04-24" },
    { id: 3, name: "0%", price: "2025-04-22", quantity: "2025-04-24" },
    { id: 4, name: "0%", price: "2025-04-22", quantity: "2025-04-24" },
    { id: 4, name: "0%", price: "2025-04-22", quantity: "2025-04-24" },
  ];
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Discounts
          </h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add Discounts
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Discount (%)</th>
              <th className="py-3 px-6 text-center">Created Date</th>
              <th className="py-3 px-6 text-center">Finished Date</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{item.id}</td>
                <td className="py-3 px-6 text-center">{item.name}</td>
                <td className="py-3 px-6 text-center">{item.price}</td>
                <td className="py-3 px-6 text-center">{item.quantity}</td>
                <td className="py-3 px-6 text-center">Status</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={ModalEdit}
                    className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={ModalDelete}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {isOpen && (
        <Modal close={ModalOpen} title={"Add Discount"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="number"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="date"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="date"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex items-center gap-[10px]">
              <input type="checkbox" />
              Active
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Discount
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalEdit} title={"Add Discount"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="number"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="date"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="date"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex items-center gap-[10px]">
              <input type="checkbox" />
              Active
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Discount
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete Discount"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            {" "}
            Are you sure you want to delete this discount?
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
