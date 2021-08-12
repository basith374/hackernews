import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export default function Dropdown({ onSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const listener = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) setOpen(false);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);
  return (
    <div
      className="bg-gray-200 rounded p-4 flex items-center cursor-pointer relative"
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <div className="mr-2">Sort by</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <div
        className={classNames(
          "bg-white shadow rounded divide-y absolute top-16 right-0 w-max",
          { hidden: !open }
        )}
      >
        <div className="py-2 px-6" onClick={() => onSort("latest")}>
          New to old
        </div>
        <div className="py-2 px-6" onClick={() => onSort("oldest")}>
          Old to new
        </div>
      </div>
    </div>
  );
}
