import React, { useEffect, useState } from "react";
import { get } from "../modules/axios-module";

function DisplaySingle(props) {
  const [item, setItem] = useState({});

  function getAll(type) {
    get(type)
      .then((data) => setItem(data.data[0]))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(`${props.match.url}`);
  }, []);

  return (
    <div className="DisplaySingle">
      <h2>{item.name}</h2>
      {item.artist && <h4>By {item.artist}</h4>}
      {item.youtube_link && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${item.youtube_link}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {item.created_at && <h5>Created at: {item.created_at.slice(0, 11).replace('T', ' ')}</h5>}
    </div>
  );
}

export default DisplaySingle;
