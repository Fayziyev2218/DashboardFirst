
export default function Modal({ children, close,title }) {
    return (
      <>
        <div
          onClick={close}
          className="fixed inset-0 flex items-center justify-center z-30 bg-black/40"
        >
          <div
            onClick={(e) => e.stopPropagation()} // bu eng muhim qism!
            className="w-[50%] bg-white rounded-[12px] shadow-2xl z-50 p-6 transform transition-all scale-100"
          >
            <div className="flex items-center justify-between mb-[20px]">
            <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
            <button
                onClick={close}
                className="px-[15px] py-[6px] bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                X
              </button>
          </div>
            {children}
          </div>
        </div>
      </>
    );
  }
  