import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./comics.css";
import loadingImage from "../../assets/loading.gif";
import notavailable from "../../assets/notavailable.png";

const Comics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, SetIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 40;
        const skip = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://site--marvel-backend--4w9wbptccl4w.code.run/comics?title=${search}&skip=${skip}&limit=${limit}`
        );
        setData(response.data);
        SetIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, currentPage]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="comics-page">
      <div className="comics-search-container">
        <button onClick={handlePreviousPage}>PREVIOUS PAGE</button>
        <input
          type="text"
          placeholder="🔎    Rechercher des comics    "
          value={search}
          onChange={handleSearch}
        />
        <button onClick={handleNextPage}>NEXT PAGE</button>
      </div>

      {isLoading ? (
        <div className="comics-container">
          <img src={loadingImage} alt="" />
        </div>
      ) : (
        <>
          <div className="comics-container">
            {data.results.map((comic) => {
              let newComicDescription = comic.description;
              if (newComicDescription) {
                newComicDescription = newComicDescription.replace(
                  /&#39;/g,
                  "'"
                );
              }
              return (
                <article className="comics-card" key={comic._id}>
                  <div className="comics-content">
                    <img
                      className="comics-image"
                      src={
                        comic.thumbnail.path +
                          "." +
                          comic.thumbnail.extension !==
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                          ? comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          : notavailable
                      }
                      alt=""
                    />
                    <h2 className="comics-name">{comic.title}</h2>
                    <p className="comics-description">{newComicDescription}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <footer className="comics-footer">
            <div className="comics-footer-buttons">
              <button onClick={handlePreviousPage}>PREVIOUS PAGE</button>
              <button onClick={handleNextPage}>NEXT PAGE</button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Comics;
