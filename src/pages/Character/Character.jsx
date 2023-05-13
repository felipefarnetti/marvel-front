import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./character.css";

const Character = () => {
  const characterId = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--4w9wbptccl4w.code.run/comics/${characterId.characterId}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="comics-page-char">
      <div className="comics-container-char">
        {data.comics.map((comic) => {
          let newComicDescription = comic.description;
          if (newComicDescription) {
            newComicDescription = newComicDescription.replace(/&#39;/g, "'");
          }
          return (
            <article key={comic._id} className="comics-card-char">
              <div className="comics-content-char">
                <img
                  className="comics-image-char"
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt=""
                />
                <h2 className="comics-name-char">{comic.title}</h2>
                <p className="comics-description-char">{newComicDescription}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Character;
