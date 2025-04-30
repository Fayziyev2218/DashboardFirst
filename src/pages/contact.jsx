import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [phone_number, setPhone_number] = useState();
  const [email, setEmail] = useState();
  const [address_en, setAddress_en] = useState();
  const [address_ru, setAddress_ru] = useState();
  const [address_de, setAddress_de] = useState();
  const token = localStorage.getItem("tokenInfo");
  const [selectID, setSelectID] = useState(null);

  const [getContact, setGetcontact] = useState([]);
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

  const getContactFunction = () => {
    fetch("https://back.ifly.com.uz/api/contact")
      .then((res) => res.json())
      .then((data) => setGetcontact(data.data));
  };

  const postContactFunction = (e) => {
    e.preventDefault();
    fetch("https://back.ifly.com.uz/api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: phone_number.trim(),
        email: email.trim(),
        address_en: address_en.trim(),
        address_ru: address_ru,
        address_de: address_de,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Create successful");
          getContactFunction();
          setIsOpen(false);
        } else {
          toast.error("error must be a string");
        }
      });
  };
  const deleteFaqFunction = (id) => {
    fetch(`https://back.ifly.com.uz/api/contact/${id}`, {
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
          getContactFunction();
          setDeleteModal(false);
        } else {
          toast.error("error");
        }
      });
  };
  useEffect(() => {
    getContactFunction();
  }, []);

  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Contact
          </h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add Contact
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Phone Number</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Address (EN)</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getContact.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6 text-center">{item.phone_number}</td>
                <td className="py-3 px-6 text-center">{item.email}</td>
                <td className="py-3 px-6 text-center">{item.address_en}</td>
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
        <Modal close={ModalOpen} title={"Add Contact"}>
          <form onSubmit={postContactFunction}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Phone Number
              <input
                onChange={(e) => setPhone_number(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="tel"
                required
                minLength={3}
                placeholder="Phone Number"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Email
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="email"
                required
                minLength={3}
                placeholder="Email"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Address (EN)
              <input
                onChange={(e) => setAddress_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Address (EN)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Address (RU)
              <input
                onChange={(e) => setAddress_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Address (EN)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Address (DE)
              <input
                onChange={(e) => setAddress_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
                placeholder="Address (EN)"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
              Add Contact
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
        <Modal close={ModalDelete} title={"Delete Contact"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Are you sure you want to delete this contact?
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
