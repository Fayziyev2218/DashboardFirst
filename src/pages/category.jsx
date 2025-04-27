


export default function Category(){
    const data = [
        { id: 1, name: 'Item 1', price: '$10', quantity: 5 },
        { id: 2, name: 'Item 2', price: '$20', quantity: 3 },
        { id: 3, name: 'Item 3', price: '$30', quantity: 2 },
        { id: 4, name: 'Item 4', price: '$40', quantity: 7 },
      ];
    return(
        <>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <div className="mb-[24px] flex items-center justify-between">
                <h3 className="font-extrabold text-[20px] text-black">Category</h3>
                <button className="py-2 px-4 bg-green-500 rounded-lg text-white">Add Category</button>
            </div>
            <table className="min-w-full text-sm text-gray-600">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="py-3 px-6 text-left">№</th>
                    <th className="py-3 px-6 text-left">Title ENG</th>
                    <th className="py-3 px-6 text-left">Title RU</th>
                    <th className="py-3 px-6 text-left">Title DE</th>
                    <th className="py-3 px-6 text-left">Actions</th> {/* New column for Total */}
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{item.id}</td>
                    <td className="py-3 px-6">{item.name}</td>
                    <td className="py-3 px-6">{item.price}</td>
                    <td className="py-3 px-6">{item.quantity}</td>
                    <td className="py-3 px-6"><button className="py-2 px-4 bg-yellow-400 rounded-lg text-white">Edit </button> <button className="py-2 px-4 bg-red-500 rounded-lg text-white">Delete</button></td> {/* Total calculation */}
                    </tr>
                ))}
                </tbody>
            </table>
         </div>
        </>
    )
}