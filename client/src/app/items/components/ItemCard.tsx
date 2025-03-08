import { ItemCategories } from "../items.types";
import Image from "next/image";
import styles from "./ItemCard.module.css"

interface ItemCardProps {
  name: string;
  category: ItemCategories;
  tier: number;
}

const ItemCard = (props: ItemCardProps) => {
  const { name, category, tier } = props;
  console.log(tier, name)
  return (
    <div className={styles["item-card-container"]}>
      <div
        className={styles["item-card-image--container"]}
        style={{ backgroundColor: `var(--${category}-background-color)` }}
      >
        <Image
          className={styles["item-card-image--image"]}
          src={`/items/${category}/${(name).replace(/[^a-zA-Z0-9]/g, "_")}.webp`}
          width={50}
          height={50}
          alt={name}
        />
      </div>
      <div className={styles["item-card-name--container"]}>
        <span className={styles["item-card-name--text"]}>{name}</span>
      </div>
    </div>
  );
};

export default ItemCard;