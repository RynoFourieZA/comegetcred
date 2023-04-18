import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const [items, setItems] = useState([]);
  const [modalItems, setModalItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data.slice(0, 9));
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
       {items.map(({ name, type, card_images }, i) => (
        <div className="card" key={i} onClick={() => handleModal(i)}>
          <div className="content">
            <h2>{name}</h2>
            <p>{type}</p>
          </div>
          <div className="img-box">
            <img src={`${card_images[0].image_url}`} className="crop-img" alt={`${card_images[0].id}`} />
          </div>
        </div>
      ))}
     {openModal &&
        modalItems.map(
          (
            { name, desc, type, archetype, race, frameType, card_images, card_sets },
            i
          ) => {

            return (
              <div className="modal" key={i}>
                <div className="content">
                  <div className="header">
                    <div className="source">
                      <h4>{type}</h4>
                    </div>
                    <div className="close-btn" onClick={closeBtn}>
                      <span>
                        <IoClose />
                      </span>
                    </div>
                    <h2>"{name}"</h2>
                    <div className="dual-box">

                    <p>
                      {desc}
                    </p>
                    <img src={`${card_images[0].image_url}`} className="crop-img-2" alt={`${card_images[0].id}`} width={180} />
                    </div>
                  </div>
                  {card_sets && card_sets.map(({set_name, set_rarity, set_rarity_code}) => <div className="sets">
                    <p className="paragraph">Set name: {set_name}</p>
                    <p className="paragraph">Rarity: {set_rarity}</p>
                    <p className="paragraph">Rarity: {set_rarity_code}</p>
                  </div>)}
                </div>
                <p className="content-paragraph">Arche Type: <strong>{archetype}</strong></p>
                <p className="content-paragraph">Race: <strong>{race}</strong></p>
              </div>
            );
          }
        )}
    </section>
  );
};

export default Page;
