export default function Searchbar({ onSearch }) {
  return (
    <div className="p-4 bg-gray-200 rounded flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className="bg-transparent w-full pl-4 outline-none"
        placeholder="Search"
        onChange={onSearch}
      />
    </div>
  );
}
