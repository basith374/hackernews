import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "..";

export default function Story({ story }) {
  const [busy, setBusy] = useState(!story.title);
  useEffect(() => {
    if (!story.title) {
      fetch(API_ENDPOINT + "/item/" + story.id + ".json").then(async (rsp) => {
        const data = await rsp.json();
        // fill data
        for (let i in data) {
          story[i] = data[i];
        }
        setBusy(false);
      });
    }
  }, [story]);
  if (busy) return null;
  return (
    <div className="p-4 hover:bg-gray-50">
      <div>
        <div className="flex">
          <div className="flex items-center w-16 justify-center mr-4">
            <div className="bg-gray-100 px-2 rounded">
              {story.score}
            </div>
          </div>
          <div className="flex-1">
            <a className="mb-2 block" href={story.url}>{story.title}</a>
            <div className="flex text-gray-500">
              <Link
                to={"/user/" + story.by}
                className="hover:text-gray-600 mr-2"
              >
                by {story.by}
              </Link>
              <div className="mr-2">.</div>
              <div>{dayjs.unix(story.time).fromNow()}</div>
              <div className="mr-2">.</div>
              <Link
                to={"/item/" + story.id}
                className="hover:text-gray-600"
              >
                {story.kids?.length || 0} comments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
