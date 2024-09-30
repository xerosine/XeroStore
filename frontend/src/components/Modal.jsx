const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="absolute top-[45%] left-[50%] bg-slate-300 dark:bg-slate-900 p-4 rounded-lg text-right z-50
            dark:border dark:border-indigo-600 transfrom translate-x-[-50%] translate-y-[-50%]"
          >
            <button
              className="text-black dark:text-white font-semibold hover:text-gray-700 
              focus:outline-none mr-2"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
