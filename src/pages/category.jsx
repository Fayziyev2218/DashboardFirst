import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getcate,setGetcate] = useState([])
  const [selectedId, setSelectedId] = useState(null);

  const [name_en,setName_en] = useState()
  const [name_ru,setName_ru] = useState()
  const [name_de,setName_de] = useState()

  const token = localStorage.getItem("tokenInfo")
  
  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = (id) => {
    setSelectedId(id); // id ni saqlaymiz
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };

  const GetCategory = ()=>{
    fetch("https://back.ifly.com.uz/api/category")
    .then((response)=>response.json())
    .then((res)=>setGetcate(res.data))
  }

  const CategoryPost = (event)=>{
    event.preventDefault()
    fetch("https://back.ifly.com.uz/api/category",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        name_en:name_en,
        name_de:name_de,
        name_ru:name_ru
      })
    })
    .then((response)=>response.json())
    .then((res)=>{
      console.log(res);
      if(res.success){
        toast.success("Create succesufuly")
      GetCategory()
      setIsOpen(false)
      }else{
        toast.error(res.message.message)
      }
      
    })
  }

  const deledecategory = (id) =>{
     fetch(`https://back.ifly.com.uz/api/category/${id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer ${token}`
      },
     })
     .then((response)=>response.json())
     .then((res)=>{
      if(res.success){
        toast.success(res.data.message)
        GetCategory()
        setDeleteModal(false)
      }else{
        toast.error(res.message.message)
      }
     })
  }

  useEffect(()=>{
    GetCategory()
  },[])
  
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
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Title ENG</th>
              <th className="py-3 px-6 text-center">Title RU</th>
              <th className="py-3 px-6 text-center">Title DE</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getcate.map((item,index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index+1}</td>
                <td className="py-3 px-6 text-center">{item.name_en}</td>
                <td className="py-3 px-6 text-center">{item.name_ru}</td>
                <td className="py-3 px-6 text-center">{item.name_de}</td>
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
                {/* Total calculation */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {isOpen && (
        <Modal close={ModalOpen} title={"Add Category"}>
          <form onSubmit={CategoryPost}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              Category Name (EN)
              <input
                onChange={((e)=>setName_en(e.target.value))}
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
              onChange={((e)=>setName_ru(e.target.value))}
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
              onChange={((e)=>setName_de(e.target.value))}
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
            Are you sure you want to delete this category?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button onClick={() => deledecategory(selectedId)} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
