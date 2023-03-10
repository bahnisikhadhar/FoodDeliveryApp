import { IMG_BASE_URL } from "../utils/constants";
import styles from "./Cart.module.css";
import foodPlaceholder from '../assets/restaurant.png';


export default function CartItem({ name, description, cloudinaryImageId, price, id, quantity, onAdd, onRemove }) {
  
  const itemImg = cloudinaryImageId ? IMG_BASE_URL + cloudinaryImageId : foodPlaceholder;
  return (
    <div className={styles.cartDetails}>
      <div className={styles.leftCart}>
        <img src={itemImg} alt="" />
        <h2>{name}</h2>
      </div>
        <div className={styles.quantityContainer}>
          <button onClick={onRemove}>-</button>
          <button>{quantity}</button>
          <button onClick={onAdd}>+</button>
        </div>
      <h4>₹{price / 100* quantity}</h4>
    </div>
  )
}
