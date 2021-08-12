import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "..";

export default function Profile() {
  const { id } = useParams();
  const [busy, setBusy] = useState(true);
  const user = useRef();
  useEffect(() => {
    fetch(API_ENDPOINT + `/user/${id}.json`).then(async (rsp) => {
      user.current = await rsp.json();
      setBusy(false);
    });
  }, [id]);
  if (busy) return null;
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <div className="bg-white p-4 rounded">
          <h1 className="text-4xl mb-4">{user.current.id}</h1>
          <div className="text-gray-500">Karma: {user.current.karma}</div>
          <div className="text-gray-500">Created: {dayjs.unix(user.current.created).fromNow()}</div>  
          <div className="text-gray-500">Submissions: {user.current.submitted.length}</div>
        </div>
      </div>
    </div>
  );
}
