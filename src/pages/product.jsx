import { useEffect, useState } from "react";
import Modal from "../componets/modal";

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [productGet, setproductGet] = useState([]);

  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = () => {
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };

  const getProductFunction = () => {
    fetch("https://back.ifly.com.uz/api/product?page=1&limit=10&min_sell=2")
      .then((res) => res.json())
      .then((data) => setproductGet(data.data.products));
  };

  useEffect(() => {
    getProductFunction();
  }, []);
  console.log(productGet);

  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">News</h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add News
          </button>
        </div>
        <div className="p-4">
          <table className="w-full text-sm text-gray-600 border border-gray-300">
            <thead className="bg-gray-800 text-white text-center">
              <tr>
                <th className="py-2 px-2">№</th>
                <th className="py-2 px-2">Images</th>
                <th className="py-2 px-2">Title</th>
                <th className="py-2 px-2">Description</th>
                <th className="py-2 px-2">Price</th>
                <th className="py-2 px-2">Category</th>
                <th className="py-2 px-2">Colors</th>
                <th className="py-2 px-2">Sizes</th>
                <th className="py-2 px-2">Discount</th>
                <th className="py-2 px-2">Materials</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productGet.map((item, index) => (
                <tr key={item.id} className="border-t text-center">
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">
                    <img
                      src={item.images}
                      alt="img"
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="py-2 px-2">{item.title_en}</td>
                  <td className="py-2 px-2">{item.description_en}</td>
                  <td className="py-2 px-2">{item.price}</td>
                  <td className="py-2 px-2">{item.category.name_en}</td>
                  <td className="py-2 px-2">{item.colors}</td>
                  <td className="py-2 px-2">{item.sizes}</td>
                  <td className="py-2 px-2">{item.discount?.discount}%</td>
                  <td className="py-2 px-2">{item?.materials?.min_sell}</td>
                  <td className="py-2 px-2">
                    <button
                      onClick={ModalEdit}
                      className="py-1 px-3 w-[70%] bg-yellow-400 mb-0.5 hover:bg-yellow-500 rounded text-white text-xs mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={ModalDelete}
                      className="py-1 px-3  w-[70%] bg-red-500 hover:bg-red-600 rounded text-white text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      {isOpen && (
        <Modal close={ModalOpen} title={"Add Sizes"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Sizes
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalEdit} title={"Edit Size"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>
            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Update Sizes
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete Discount"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            {" "}
            Are you sure you want to delete this size?
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
