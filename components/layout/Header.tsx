const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          ALX Stays
        </h1>

        <input
          type="text"
          placeholder="Search destinations"
          className="border rounded-md px-4 py-2 w-full md:w-80"
        />

        <div className="flex gap-4 text-sm">
          <button>Sign in</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign up
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 py-2 text-sm text-gray-600">
        {["Rooms", "Mansion", "Countryside", "Villa", "Apartments"].map(type => (
          <span key={type} className="cursor-pointer whitespace-nowrap">
            {type}
          </span>
        ))}
      </div>
    </header>
  );
};

export default Header;
