import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "..";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";
import Story from "./Story";

export default function News() {
  const [stories, setStories] = useState([]);
  const _stories = useRef();
  useEffect(() => {
    fetch(API_ENDPOINT + "/topstories.json").then(async (rsp) => {
      const stories = await rsp.json();
      _stories.current = stories.map((id) => ({ id }))
      setStories(_stories.current);
    });
  }, []);
  function onSearch({ target: { value }}) {
    if (value) {
      const regex = new RegExp(".*" + value + ".*", "gi");
      const results = _stories.current.filter(story => regex.test(story.title));
      setStories(results);
    } else {
      setStories(_stories.current);
    }
  }
  function onSort(order) {
    const sorter = (a, b) => order === "oldest" ? a.time - b.time : b.time - a.time;
    setStories(stories.map(s => ({ ...s })).sort(sorter));
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <div className="flex mb-4">
          <div
            className="px-6 py-4 mr-4 text-white"
            style={{ background: "#FF6600" }}
          >
            Y
          </div>
          <div className="flex-1 mr-4">
            <Searchbar onSearch={onSearch} />
          </div>
          <Dropdown onSort={onSort} />
        </div>
        <div className="bg-white rounded divide-y">
          {stories.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
