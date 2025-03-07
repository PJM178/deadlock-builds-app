import { ItemCategories } from "../items.types";
import Image from "next/image";
import styles from "./ItemCard.module.css"

interface ItemCardProps {
  name: string;
  category: ItemCategories;
}

const ItemCard = (props: ItemCardProps) => {
  const { name, category } = props;

  return (
    <div className={styles["item-card-container"]}>
      <Image
        className={styles["portrait-image"]}
        src={`/items/${category}/${(name).replace(/[^a-zA-Z0-9]/g, "_")}.webp`}
        width={100}
        height={100}
        alt={name}
      />
      <span>{name}</span>
    </div>
  );
};

export default ItemCard;