import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { toast } from "react-toastify";

export default function Size() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getsize,setGetsize] = useState([])
  const [size,setSize] = useState()
  const [selectID,setSelectID] = useState(null)
  const token = localStorage.getItem("tokenInfo")
  const [clickData, setClickData] = useState();



  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = (id) => {
    setSelectID(id)
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };

  const getSizeFunction = ()=>{
    fetch("https://back.ifly.com.uz/api/sizes")
    .then((response)=>response.json())
    .then((res)=>setGetsize(res.data))
  }

  const postSizeFunction = (event)=>{
    event.preventDefault()
    fetch("https://back.ifly.com.uz/api/sizes",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        size: size
      })
    })
    .then((response)=>response.json())
    .then((res)=>{
      console.log(res);
      if(res.success){
        toast.success("Create succesufuly")
      getSizeFunction()
      setIsOpen(false)
      }else{
        toast.error("size must be a string")
      }
      
    })
  }

  const patchSizeFunction = (event)=>{
    event.preventDefault()
    fetch(`https://back.ifly.com.uz/api/sizes/${clickData.id}`,{
      method:"PATCH",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        size: size
      })
    })
    .then((response)=>response.json())
    .then((res)=>{
      console.log(res);
      if(res.success){
        toast.success("Create succesufuly")
      getSizeFunction()
      setEditModal(false)
      }else{
        toast.error("size must be a string")
      }
      
    })
  }

  const deleteSizeFunction =(id)=>{
      fetch(`https://back.ifly.com.uz/api/sizes/${id}`,{
        method:"DELETE",
        headers:{
          "Content-type":"application/json",
          "authorization":`Bearer ${token}`
        },
      })
      .then((res)=>res.json())
      .then((data)=>{
        if(data.success){
          console.log(data);
          
          toast.success("Delete successefuly")
          getSizeFunction()
          setDeleteModal(false)
        }else{
          toast.error("error")
        }
      })
  }
  

  useEffect(()=>{
    getSizeFunction()
  },[])
  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <div className="mb-[24px] flex items-center justify-between">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Size
          </h3>
          <button
            onClick={ModalOpen}
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white"
          >
            Add Size
          </button>
        </div>
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="py-3 px-6 text-center">№</th>
              <th className="py-3 px-6 text-center">Sizes</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getsize.map((item,index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index+1}</td>
                <td className="py-3 px-6 text-center">{item.size}</td>
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
        <Modal close={ModalOpen} title={"Add Sizes"}>
          <form onSubmit={postSizeFunction}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={((e)=>setSize(e.target.value))}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="text"
                required
                minLength={1}
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
        <form onSubmit={patchSizeFunction}>
          <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            <input
              onChange={((e)=>setSize(e.target.value))}
              defaultValue={clickData.size}
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
        <Modal close={() => setDeleteModal(false)} title={"Delete Size"}>
          <p className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
            Are you sure you want to delete this size?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button onClick={() => deleteSizeFunction(selectID)}  className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
