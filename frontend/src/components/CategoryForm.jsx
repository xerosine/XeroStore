const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="py-3 px-4 border rounded-lg w-full mb-2 dark:text-black"
        />
        <div className="flex justify-between">
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-lg 
            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
            focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
