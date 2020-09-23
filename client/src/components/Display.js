import React, { useEffect, useState, useContext } from "react";
import "./css/Display.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { get, create } from "../modules/axios-module";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Display(props) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const type = props.match.params.display;

  function getAll(type, setter) {
    get(type)
      .then((data) => setter(data.data))
      .catch((err) => console.log(err));
  }

  function like(id) {
    create(`${type}/like`, { song_id: id, user_id: context.user_id })
      .then(() => console.log("liked"))
      .catch((err) => console.log(err));
  }

  function favorite(id) {
    const currentDataId = data.slice();
    let index = currentDataId.findIndex((item) => item.id === id);
    currentDataId[index] &&
      (currentDataId[index].favorite
        ? delete currentDataId[index].favorite
        : (currentDataId[index].favorite = true));
    setData(currentDataId);
  }

  const handleClick = (id) => {
    like(id);
    favorite(id);
  };

  useEffect(() => {
    getAll(type, setData);
    getAll(`top/liked/${type}${context.user_id}`, setLiked);
  }, [type]);

  useEffect(() => {
    liked[0] && liked.map((item) => favorite(item.id));
  }, [liked]);

  return (
    <div className="display">
      <h2 className="header">{type}</h2>
      {data.map((item) => (
        <div className="linksDisplay" key={item.id}>
          <Link key={item.id} className="row links" to={`/${type}/${item.id}`}>
            {item.cover_img && (
              <img
                className="cover_img"
                src={item.cover_img}
                alt={`${item.name}`}
              />
            )}
            {item.youtube_link && (
              <img
                className="cover_img"
                src={`https://img.youtube.com/vi/${item.youtube_link}/0.jpg`}
                alt={`${item.name}`}
              />
            )}
            <span className="title">
              {item.name}
              {item.artist && <span className="artist">{item.artist}</span>}
            </span>
          </Link>
          <span className="icon" onClick={() => handleClick(item.id)}>
            {item.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Display;