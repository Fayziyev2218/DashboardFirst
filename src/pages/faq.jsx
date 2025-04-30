import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function Faq() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getFaq, setGetFaq] = useState([]);
  const token = localStorage.getItem("tokenInfo");

  const [question_en, setQuestion_en] = useState();
  const [question_ru, setQuestion_ru] = useState();
  const [question_de, setQuestion_de] = useState();
  const [answer_en, setAnswer_en] = useState();
  const [answer_ru, setAnswer_ru] = useState();
  const [answer_de, setAnswer_de] = useState();
  const [selectID, setSelectID] = useState(null);

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

  const getFaqFunction = () => {
    fetch("https://back.ifly.com.uz/api/faq")
      .then((res) => res.json())
      .then((data) => setGetFaq(data.data));
  };

  const postFaqFunction = (event) => {
    event.preventDefault();
    fetch("https://back.ifly.com.uz/api/faq", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_en: question_en,
        question_ru: question_ru,
        question_de: question_de,
        answer_en: answer_en,
        answer_ru: answer_ru,
        answer_de: answer_de,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Create successful");
          getFaqFunction();
          setIsOpen(false);
        } else {
          toast.error("error must be a string");
        }
      });
  };

  const deleteFaqFunction = (id) => {
    fetch(`https://back.ifly.com.uz/api/faq/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          toast.success("Create successful");
          getFaqFunction();
          setDeleteModal(false);
        } else {
          toast.error("error");
        }
      });
  };

  useEffect(() => {
    getFaqFunction();
  }, []);
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            FAQ Management
          </h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add FAQ
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Question (EN)</th>
              <th className="py-3 px-6 text-center">Answer (EN)</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFaq.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6 text-center">{item.question_en}</td>
                <td className="py-3 px-6 text-center">{item.answer_en}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={ModalEdit}
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
        <Modal close={ModalOpen} title={"Add FAQ"}>
          <form onSubmit={postFaqFunction}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              English quetion
              <input
                onChange={(e) => setQuestion_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English quetion"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              English Answer
              <input
                onChange={(e) => setAnswer_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English Answer"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Question (Russian)
              <input
                onChange={(e) => setQuestion_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Question (Russian)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Answer (Russian)
              <input
                onChange={(e) => setAnswer_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Answer (Russian)"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Question (German)
              <input
                onChange={(e) => setQuestion_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Question (German)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Answer (German)
              <input
                onChange={(e) => setAnswer_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Answer (German)"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add FAQ
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalOpen} title={"Add FAQ"}>
          <form>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              English quetion
              <input
                onChange={(e) => setQuestion_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English quetion"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              English Answer
              <input
                onChange={(e) => setAnswer_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="English Answer"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Question (Russian)
              <input
                onChange={(e) => setQuestion_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Question (Russian)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Answer (Russian)
              <input
                onChange={(e) => setAnswer_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Answer (Russian)"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Question (German)
              <input
                onChange={(e) => setQuestion_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Question (German)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Answer (German)
              <input
                onChange={(e) => setAnswer_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Answer (German)"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add FAQ
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete FAQ"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Are you sure you want to delete this FAQ?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button
              onClick={() => deleteFaqFunction(selectID)}
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
