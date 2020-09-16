import React, { useEffect, useState } from "react";
import "./css/Table.css";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const url = props.url;

  function getAll(type) {
    get(type)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(url);
  }, [url]);

  return (
    <div className="display">
      {data.map((data, index) => (
        <div className="row" key={(data.id + index) * index}>
          <Link
            key={data.id + index}
            className="links"
            to={`/songs/${data.id}`}
          >
            <span className="title">
              {data.name}
              {data.artist && <span className="artist">{data.artist}</span>}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default List;
