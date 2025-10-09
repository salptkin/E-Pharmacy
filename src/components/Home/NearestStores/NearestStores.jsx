import React, { useEffect } from "react";
import styles from "./NearestStores.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNearestStores } from "../../../redux/pharmacy/selectors";
import { getNearestStores } from "../../../redux/pharmacy/operations";

const sprite = "/images/sprite.svg";

const mockStores = [
  {
    _id: "1",
    name: "Central Pharmacy",
    address: "123 Main Street",
    city: "New York, NY",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    isOpen: true
  },
  {
    _id: "2",
    name: "Health Plus Pharmacy",
    address: "456 Park Avenue",
    city: "Los Angeles, CA",
    phone: "+1 (555) 234-5678",
    rating: 4.6,
    isOpen: true
  },
  {
    _id: "3",
    name: "MediCare Drugstore",
    address: "789 Oak Boulevard",
    city: "Chicago, IL",
    phone: "+1 (555) 345-6789",
    rating: 4.9,
    isOpen: false
  },
  {
    _id: "4",
    name: "QuickMed Pharmacy",
    address: "321 Elm Street",
    city: "Houston, TX",
    phone: "+1 (555) 456-7890",
    rating: 4.7,
    isOpen: true
  },
  {
    _id: "5",
    name: "Family Health Pharmacy",
    address: "654 Pine Road",
    city: "Phoenix, AZ",
    phone: "+1 (555) 567-8901",
    rating: 4.5,
    isOpen: true
  },
  {
    _id: "6",
    name: "Express Pharmacy",
    address: "987 Maple Drive",
    city: "Philadelphia, PA",
    phone: "+1 (555) 678-9012",
    rating: 4.8,
    isOpen: false
  }
];

const NearestStores = () => {
  const dispatch = useDispatch();
  const apiStores = useSelector(selectNearestStores);

  useEffect(() => {
    dispatch(getNearestStores({ limit: 6 }));
  }, [dispatch]);

  const nearestStores = apiStores && apiStores.length > 0 ? apiStores : mockStores;

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Your Nearest Medicine Store</h2>
        <p className={styles.text}>Search for Medicine, Filter by your location</p>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {nearestStores?.map((store) => (
              <li key={store._id} className={styles.item}>
                <h3 className={styles.subTitle}>{store.name}</h3>
                <div className={styles.addressBox}>
                  <svg>
                    <use href={`${sprite}#map`} />
                  </svg>
                  <ul>
                    <li>
                      <a
                        href={`https://maps.google.com/?q=${store.address},${store.city}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store.address}
                      </a>
                    </li>
                    <li>{store.city}</li>
                  </ul>
                </div>
                <div className={styles.phoneBox}>
                  <svg>
                    <use href={`${sprite}#phone`} />
                  </svg>
                  <a href={`tel:${store.phone}`}>
                    <p>{store.phone}</p>
                  </a>
                </div>
                <div className={styles.ratingWithBtn}>
                  <div className={styles.ratingBox}>
                    <svg>
                      <use href={`${sprite}#star`} />
                    </svg>
                    <p>{store.rating}</p>
                  </div>
                  <div
                    className={`${styles.isOpenItem} ${
                      store.isOpen ? styles.open : styles.close
                    }`}
                  >
                    {store.isOpen ? "open" : "close"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NearestStores;
