import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/pharmacy/selectors";
import sprite from "/images/sprite.svg";
import {
  addToCart,
  deleteFromCart,
  getCartItems,
  getProductById,
} from "../../../redux/pharmacy/operations";
import { useNavigate } from "react-router-dom";
import styles from "./CartItems.module.css";

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [localCart, setLocalCart] = useState(null);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (!updatingProductId) {
      setLocalCart(cart);
    }
  }, [cart, updatingProductId]);

  const handleIncreaseAmount = (id) => {
    setUpdatingProductId(id);
    dispatch(addToCart({ productId: id, quantity: 1 })).then(() => {
      dispatch(getCartItems()).finally(() => {
        setUpdatingProductId(null);
      });
    });
  };

  const handleDecreaseAmount = (id, currentQuantity) => {
    setUpdatingProductId(id);
    if (currentQuantity === 1) {
      dispatch(deleteFromCart(id)).then(() => {
        dispatch(getCartItems()).finally(() => {
          setUpdatingProductId(null);
        });
      });
    } else {
      // updateCart yerine deleteFromCart + addToCart kombinasyonu
      dispatch(deleteFromCart(id)).then(() => {
        dispatch(addToCart({ productId: id, quantity: currentQuantity - 1 })).then(() => {
          dispatch(getCartItems()).finally(() => {
            setUpdatingProductId(null);
          });
        });
      });
    }
  };

  const handleDeleteProduct = (id) => {
    setUpdatingProductId(id);
    dispatch(deleteFromCart(id)).then(() => {
      dispatch(getCartItems()).finally(() => {
        setUpdatingProductId(null);
      });
    });
  };

  const handleProductClick = (id) => {
    dispatch(getProductById(id)).then(() => {
      navigate("/product");
    });
  };

  const displayCart = updatingProductId ? localCart : cart;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {displayCart?.cartProducts?.map((product) => (
          <li
            key={product.productId._id}
            className={styles.item}
            style={{ opacity: updatingProductId === product.productId._id ? 0.6 : 1 }}
            onClick={() => handleProductClick(product.productId._id)}
          >
            <div className={styles.imgBox}>
              <img 
                src={product.productId.photo} 
                alt={`${product.productId.name} ürün görseli`}
                loading="lazy"
                width="84"
                height="84"
              />
            </div>
            <div className={styles.textBox}>
              <div className={styles.mainTextWrap}>
                <div>
                  <h3 className={styles.subtitle}>{product.productId.name}</h3>
                  <p className={styles.text}>{product.productId.category}</p>
                </div>
                <p className={styles.price}>{`৳ ${product.productId.price}`}</p>
              </div>
              <div className={styles.btnBox}>
                <div className={styles.amountBox} role="group" aria-label="Miktar seçici">
                  <button
                    type="button"
                    disabled={updatingProductId === product.productId._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecreaseAmount(product.productId._id, product.quantity);
                    }}
                    aria-label={`${product.productId.name} miktarını azalt`}
                  >
                    <svg aria-hidden="true">
                      <use href={`${sprite}#minus`} />
                    </svg>
                  </button>
                  <p aria-live="polite">{product.quantity}</p>
                  <button
                    type="button"
                    disabled={updatingProductId === product.productId._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncreaseAmount(product.productId._id);
                    }}
                    aria-label={`${product.productId.name} miktarını artır`}
                  >
                    <svg aria-hidden="true">
                      <use href={`${sprite}#plus`} />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  disabled={updatingProductId === product.productId._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.productId._id);
                  }}
                  aria-label={`${product.productId.name} ürününü sepetten kaldır`}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
