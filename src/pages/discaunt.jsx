import { useEffect, useState } from "react";
import Modal from "../componets/modal";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export default function Discaunt() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getDiscaunt,setGetdiscaunt] = useState([])

  const [discaunts,setDiscaunts] = useState()
  const [startdate,setSatartdate] = useState()
  const [enddate,setEnddate] = useState()
  const [actives,setActives] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const token = localStorage.getItem("tokenInfo")

  const ModalOpen = () => {
    setIsOpen(!isOpen);
  };
  const ModalDelete = (id) => {
    setSelectedId(id)
    setDeleteModal(!deleteModal);
  };
  const ModalEdit = () => {
    setEditModal(!editModal);
  };

  const getDiscauntFunction = ()=>{
    fetch("https://back.ifly.com.uz/api/discount")
    .then((res)=>res.json())
    .then((data)=>setGetdiscaunt(data.data))
  }

    const postDiscauntFunction = (event)=>{
      event.preventDefault()
      fetch("https://back.ifly.com.uz/api/discount",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          discount:Number(discaunts),
          started_at:startdate,
          finished_at:enddate,
          status:actives
        })
      })
      .then((response)=>response.json())
      .then((res)=>{
        console.log(res);
        if(res.success){
          toast.success("Create succesufuly")
          getDiscauntFunction()
          setIsOpen(false)
        }else{
          toast.error(res.message.message)
        }
        
      })
    }

    const deleteDiscaunt = (id) =>{
           fetch(`https://back.ifly.com.uz/api/discount/${id}`,{
            method:"DELETE",
            headers:{
              "Content-type":"application/json",
              "authorization":`Bearer ${token}`
            },
           })
           .then((response)=>response.json())
           .then((res)=>{
            if(res.success){
              toast.success("Discount deleted successfully!")
              getDiscauntFunction()
              setDeleteModal(false)
            }else{
              toast.error(res.message.message)
            }
           })
    }
  
  useEffect(()=>{
    getDiscauntFunction()
  },[])
  
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
            {getDiscaunt.map((item,index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index+1}</td>
                <td className="py-3 px-6 text-center">{item.discount}%</td>
                <td className="py-3 px-6 text-center">{item.started_at}</td>
                <td className="py-3 px-6 text-center">{item.finished_at}</td>
                <td className="py-3 px-6 text-center">
                  <span className={item.status ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={ModalEdit}
                    className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={()=>ModalDelete(item.id)}
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
          <form onSubmit={postDiscauntFunction}>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
                onChange={((e)=>setDiscaunts(e.target.value))}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="number"
                required
                minLength={3}
                placeholder="Discaunt (%)"
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
              onChange={((e)=>setSatartdate(e.target.value))}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="date"
                required
                minLength={3}
              />
            </label>
            <label className="text-gray-600 font-bold mb-6 text-center flex flex-col gap-1 items-start">
              <input
              onChange={((e)=>setEnddate(e.target.value))}
                className="w-full border border-gray-400 rounded-[8px] p-[8px]"
                type="date"
                required
                minLength={3}
                placeholder="English name"
              />
            </label>

            <label className="text-gray-600 font-bold mb-6 text-center flex items-center gap-[10px]">
              <input onChange={((e)=>setActives(e.target.checked))} type="checkbox" />
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
            Are you sure you want to delete this discount?
          </p>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
              onClick={ModalDelete}
            >
              Cencel
            </button>
            <button onClick={()=>deleteDiscaunt(selectedId)} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">
              delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
