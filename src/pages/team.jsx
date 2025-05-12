import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getData,setGetdata] = useState([])
  const [full_name,setFull_name] = useState()
  const [position_de,setPosition_de] = useState()
  const [position_ru,setPosition_ru] = useState()
  const [position_en,setPosition_en] = useState()
  const [image,setImage] = useState()
  const token = localStorage.getItem("tokenInfo");
  const [selectedId, setSelectedId] = useState(null);
  const [clickData, setClickData] = useState();



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
  
  const getTeamFunction = ()=>{
    fetch("https://testaoron.limsa.uz/api/team-section")
    .then((res)=>res.json())
    .then((data)=>setGetdata(data.data))
  }


  const postTeamFunction = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("position_de", position_de);
    formData.append("position_ru", position_ru);
    formData.append("position_en", position_en);
    formData.append("file",image) // Fayl obyektini yuborayapmiz
  
    fetch("https://testaoron.limsa.uz/api/team-section", {
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
          getTeamFunction();
          setIsOpen(false);
        } else {
          toast.error(res.message.message);
        }
      });
  };
  
  const patchTeamFunction = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("position_de", position_de);
    formData.append("position_ru", position_ru);
    formData.append("position_en", position_en);
    formData.append("file",image) // Fayl obyektini yuborayapmiz
  
    fetch(`https://testaoron.limsa.uz/api/team-section/${clickData.id}`, {
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
          getTeamFunction();
          setEditModal(false);
        } else {
          toast.error(res.message.message);
        }
      });
  };


  const deledecategory = (id) => {
    fetch(`https://testaoron.limsa.uz/api/team-section/${id}`, {
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
          getTeamFunction()
          setDeleteModal(false);
        } else {
          toast.error(res.message.message);
        }
      });
  };

  useEffect(()=>{
    getTeamFunction()
  },[])
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Team Members
          </h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add Team Members
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Images</th>
              <th className="py-3 px-6 text-center">Full Name</th>
              <th className="py-3 px-6 text-center">Position</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getData.map((item,index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index+1}</td>
                <td className="py-3 px-6 text-center"><img className="rounded-sm w-[130px] h-[100px]" src={`https://testaoron.limsa.uz/${item.image}`} alt={item.full_name} /></td>
                <td className="py-3 px-6 text-center">{item.full_name}</td>
                <td className="py-3 px-6 text-center">{item.position_en}</td>
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
        <Modal close={ModalOpen} title={"Add Team Member"}>
          <form onSubmit={postTeamFunction}>  
            
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Full Name
              <input
                onChange={(e) => setFull_name(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Position (English)
              <input
                onChange={(e) => setPosition_en(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Position (Russian)
              <input
                onChange={(e) => setPosition_ru(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Position (German)
              <input
                onChange={(e) => setPosition_de(e.target.value)}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
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
               Add Team Member
            </button>
          </form>
        </Modal>
      )}

      {editModal && (
        <Modal close={ModalEdit} title={"Edit Team Member"}>
        <form onSubmit={patchTeamFunction}>  
            
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Full Name
              <input
                onChange={(e) => setFull_name(e.target.value)}
                defaultValue={clickData.full_name}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Position (English)
              <input
                onChange={(e) => setPosition_en(e.target.value)}
                defaultValue={clickData.position_en}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Position (Russian)
              <input
                onChange={(e) => setPosition_ru(e.target.value)}
                defaultValue={clickData.position_ru}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Position (German)
              <input
                onChange={(e) => setPosition_de(e.target.value)}
                defaultValue={clickData.position_de}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Upload Image
              <input
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="file"
              />
            </label>

            <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white">
               Add Team Member
            </button>
          </form>
      </Modal>
      )}

      {deleteModal && (
        <Modal close={ModalDelete} title={"Delete Team Member"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Are you sure you want to delete?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button onClick={()=>deledecategory(selectedId)} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
