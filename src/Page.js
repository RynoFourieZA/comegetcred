import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const [items, setItems] = useState([]);
  const [modalItems, setModalItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=dd30ec9b51794fafbf09a3f65d7eeb12`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.articles.slice(0, 9));
      });
  }, []);

  const handleModal = (i) => {
    setOpenModal(true);
    setModalItems([items[i]]);
  };

  const closeBtn = () => {
    setOpenModal(false);
  };
  return (
    <section className="container">
      {items.map(({ title, description, urlToImage }, i) => (
        <div className="card" key={i} onClick={() => handleModal(i)}>
          <div className="img-box">
            <img src={`${urlToImage}`} />
          </div>
          <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      ))}
      {openModal &&
        modalItems.map(
          (
            { title, description, content, url, source, author, publishedAt },
            i
          ) => {
            const getSquareBracketIndex = content.indexOf("[");

            return (
              <div className="modal" key={i}>
                <div className="content">
                  <div className="header">
                    <div className="source">
                      <h4>{source.name}</h4>
                    </div>
                    <div className="close-btn" onClick={closeBtn}>
                      <span>
                        <IoClose />
                      </span>
                    </div>
                    <h2>"{title}"</h2>
                    <p>
                      {publishedAt.slice(0, 10)} : {author}
                    </p>
                  </div>
                  <p className="paragraph">{description}</p>
                </div>
                <p className="content-paragraph">
                  {content.slice(0, getSquareBracketIndex)}{" "}
                  <a href={`${url}`} target="_blank">
                    Read more
                  </a>
                </p>
              </div>
            );
          }
        )}
    </section>
  );
};

export default Page;
