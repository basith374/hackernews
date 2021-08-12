import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "..";

export default function Comment({ id }) {
  const [busy, setBusy] = useState(true);
  const comment = useRef();
  useEffect(() => {
    const controller = new AbortController();
    fetch(API_ENDPOINT + "/item/" + id + ".json", {
      signal: controller.signal
    }).then(async (rsp) => {
      comment.current = await rsp.json();
      setBusy(false);
    }).catch(() => {});
    return () => {
      controller.abort();
    }
  }, [id]);
  if (busy) return null;
  return (
    <div className="mb-4">
      <div className="flex text-gray-500">
        <div className="pr-2">{comment.current.by}</div>
        <div className="pr-2">.</div>
        <div>{dayjs.unix(comment.current.time).fromNow()}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.current.text }} />
      <div className="pl-5 pt-5">
        {comment.current.kids?.map((id) => (
          <Comment id={id} />
        ))}
      </div>
    </div>
  );
}
