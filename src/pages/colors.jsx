import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function Colors() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [colors, setColors] = useState([]);
  const [color_en, setColor_en] = useState();
  const [color_ru, setColor_ru] = useState();
  const [color_de, setColor_de] = useState();
  const token = localStorage.getItem("tokenInfo");
  const [selectID, setSelectID] = useState(null);
  const [clickData, setClickData] = useState();

  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = (id) => {
    setSelectID(id);
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };

  const getColorFunction = () => {
    fetch("https://testaoron.limsa.uz/api/colors")
      .then((res) => res.json())
      .then((color) => setColors(color.data));
  };

  const postColorFuncton = (e) => {
    e.preventDefault();
    fetch("https://testaoron.limsa.uz/api/colors", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        color_en: color_en,
        color_ru: color_ru,
        color_de: color_de,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Create successefuly");
          getColorFunction();
          setIsOpen(false);
        } else {
          toast.error(data?.message.message);
        }
      });
  };

  const patchColorFuncton = (e) => {
    e.preventDefault();
    fetch(`https://testaoron.limsa.uz/api/colors/${clickData.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        color_en: color_en,
        color_ru: color_ru,
        color_de: color_de,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Create successefuly");
          getColorFunction();
          setEditModal(false);
        } else {
          toast.error(data?.message.message);
        }
      });
  };

  const deleteColorFunction = (id) => {
    fetch(`https://testaoron.limsa.uz/api/colors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Create successefuly");
          getColorFunction();
          setDeleteModal(false);
        }
      });
  };

  useEffect(() => {
    getColorFunction();
  }, []);
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Colors
          </h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add Colors
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Colors ENG</th>
              <th className="py-3 px-6 text-center">Colors RU</th>
              <th className="py-3 px-6 text-center">Colors DE</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6 text-center">{item.color_en}</td>
                <td className="py-3 px-6 text-center">{item.color_ru}</td>
                <td className="py-3 px-6 text-center">{item.color_de}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => {
                      ModalEdit();
                      setClickData(item);
                    }}
                    className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => ModalDelete(item.id)}
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
        <Modal close={ModalOpen} title={"Add Color"}>
          <form onSubmit={postColorFuncton}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Color (EN)
              <input
                onChange={(e) => setColor_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Color in English"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Color (RU)
              <input
                onChange={(e) => setColor_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="цвет на русском"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Color (DE)
              <input
                onChange={(e) => setColor_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Color in German"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Color
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalEdit} title={"Edit Color"}>
          <form onSubmit={patchColorFuncton}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Color (EN)
              <input
                defaultValue={clickData.color_en}
                onChange={(e) => setColor_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Color in English"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Color (RU)
              <input
                defaultValue={clickData.color_ru}
                onChange={(e) => setColor_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="цвет на русском"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Color (DE)
              <input
                defaultValue={clickData.color_de}
                onChange={(e) => setColor_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Color in German"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Color
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete Color"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Are you sure you want to delete this color?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button
              onClick={() => deleteColorFunction(selectID)}
              className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white"
            >
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
