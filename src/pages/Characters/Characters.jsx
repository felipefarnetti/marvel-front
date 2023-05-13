import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./characters.css";
import loadingImage from "../../assets/loading.gif";
import notavailable from "../../assets/notavailable.png";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 40;
        const skip = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://site--marvel-backend--4w9wbptccl4w.code.run/characters?name=${search}&skip=${skip}&limit=${limit}`
        );
        setData(response.data.results);
        setIsLoading(false);
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
    <div className="character-page">
      <div className="character-search-container">
        <button onClick={handlePreviousPage}>PREVIOUS PAGE</button>
        <input
          type="text"
          placeholder="🔎      Character search        "
          value={search}
          onChange={handleSearch}
        />
        <button onClick={handleNextPage}>NEXT PAGE</button>
      </div>
      <div className="character-container">
        {isLoading ? (
          <div className="loading-container">
            <img src={loadingImage} alt="Loading..." />
          </div>
        ) : (
          <>
            {data.map((character) => {
              return (
                <Link
                  to={`/character/${character._id}`}
                  key={character._id}
                  state={data}
                >
                  <article className="character-card">
                    <div className="character-content">
                      <img
                        className="character-image"
                        src={
                          character.thumbnail.path +
                            "." +
                            character.thumbnail.extension ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
                          character.thumbnail.path +
                            "." +
                            character.thumbnail.extension ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
                            ? notavailable
                            : character.thumbnail.path +
                              "." +
                              character.thumbnail.extension
                        }
                        alt=""
                      />
                      <h2 className="character-name">{character.name}</h2>
                      <p className="character-description">
                        {character.description}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </>
        )}
      </div>

      <footer className="character-footer">
        <div className="character-footer-buttons">
          <button onClick={handlePreviousPage}>PREVIOUS PAGE</button>
          <button onClick={handleNextPage}>NEXT PAGE</button>
        </div>
      </footer>
    </div>
  );
};

export default Characters;
