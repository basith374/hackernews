import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "..";
import Comment from "./Comment";

export default function Item() {
  const [busy, setBusy] = useState(true);
  const { id } = useParams();
  const story = useRef();
  useEffect(() => {
    fetch(API_ENDPOINT + "/item/" + id + ".json").then(async (rsp) => {
      story.current = await rsp.json();
      setBusy(false);
    });
  }, [id]);
  if (busy) return null;
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <div className="bg-white rounded p-10">
          <h1 className="text-4xl mb-4">{story.current.title}</h1>
          <div className="mb-4">{story.current.text}</div>
          <div className="">
            {story.current.kids?.map(id => <Comment key={id} id={id} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
