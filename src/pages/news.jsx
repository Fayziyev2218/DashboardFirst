import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function News() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [title_en, setTitle_en] = useState();
  const [title_ru, setTitle_ru] = useState();
  const [title_de, setTitle_de] = useState();
  const [description_en, setdescription_en] = useState();
  const [description_ru, setDescription_ru] = useState();
  const [description_de, setDescription_de] = useState();
  const [image, setImage] = useState();
  const token = localStorage.getItem("tokenInfo");
  const [selectedId, setSelectedId] = useState(null);
  const [clickData, setClickData] = useState();

  const [getData, setGetdata] = useState([]);

  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = (id) => {
    setSelectedId(id);
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };

  const getNewsFunction = () => {
    fetch("https://testaoron.limsa.uz/api/news")
      .then((res) => res.json())
      .then((data) => setGetdata(data.data));
  };

  const postNewsFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("title_de", title_de);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("description_de", description_de);
    formData.append("file",image)
    fetch("https://testaoron.limsa.uz/api/news", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success("Created successfully");
          getNewsFunction();
          setIsOpen(false);
        } else {
          toast.error(res.message.message);
        }
      });
  };

    const patchNewsFunction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title_en", title_en);
    formData.append("title_ru", title_ru);
    formData.append("title_de", title_de);
    formData.append("description_en", description_en);
    formData.append("description_ru", description_ru);
    formData.append("description_de", description_de);
    formData.append("file",image)
    fetch(`https://testaoron.limsa.uz/api/news/${clickData.id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success("Created successfully");
          getNewsFunction();
          setEditModal(false);
        } else {
          toast.error(res.message.message);
        }
      });
  };

  const deledeNewsFunction = (id) => {
    fetch(`https://testaoron.limsa.uz/api/news/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toast.success("Delete successfuly");
          getNewsFunction()
          setDeleteModal(false);
        } else {
          toast.error(res.message.message);
        }
      });
  };

  useEffect(() => {
    getNewsFunction();
  }, []);
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
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Image</th>
              <th className="py-3 px-6 text-center">Title (EN)</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getData.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6 text-center">
                  <img
                    className="rounded-sm w-[130px] h-[100px]"
                    src={`https://testaoron.limsa.uz/${item.image}`}
                    alt={item.title_en}
                  />
                </td>
                <td className="py-3 px-6 text-center">{item.title_en}</td>
                <td className="py-3 px-6 text-center">{item.description_en}</td>
                <td className="py-3 px-6 text-center">
                  <button
                     onClick={()=>{
                      ModalEdit()
                      setClickData(item)
                    }}
                    className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={()=> ModalDelete(item.id)}
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
        <Modal close={ModalOpen} title={"Add News"}>
          <form onSubmit={postNewsFunction}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setTitle_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Title EN"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setTitle_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Title RU"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setTitle_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Title DE"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setdescription_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Discription EN"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setDescription_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Discription RU"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setDescription_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Discription DE"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Upload Image
              <input
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="file"
                required
                minLength={3}
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add News
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalEdit} title={"Edit News"}>
          <form onSubmit={patchNewsFunction}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setTitle_en(e.target.value)}
                defaultValue={clickData.title_en}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Title EN"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setTitle_ru(e.target.value)}
                defaultValue={clickData.title_ru}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Title RU"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setTitle_de(e.target.value)}
                defaultValue={clickData.title_de}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Title DE"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setdescription_en(e.target.value)}
                defaultValue={clickData.description_en}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Discription EN"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setDescription_ru(e.target.value)}
                defaultValue={clickData.description_ru}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Discription RU"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={(e) => setDescription_de(e.target.value)}
                defaultValue={clickData.description_de}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Discription DE"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Upload Image
              <input
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="file"
                required
                minLength={3}
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add News
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete News"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
          Are you sure you want to delete this news?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button onClick={()=>deledeNewsFunction(selectedId)} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
