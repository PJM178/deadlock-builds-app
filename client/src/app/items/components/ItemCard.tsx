"use client"

import { ItemCategories } from "../items.types";
import { useState } from "react";
import Image from "next/image";
import styles from "./ItemCard.module.css"
import Popover from "../../components/Popover";
import ItemInfoPanel from "./ItemInfoPanel";

interface ItemCardProps {
  name: string;
  category: ItemCategories;
  tier: number;
}

const ItemCard = (props: ItemCardProps) => {
  const { name, category, tier } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  console.log(tier, name)
  const handlePopoverOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className={styles["item-card-container"]}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        tabIndex={0}
      >
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
      <Popover
        isOpen={!!anchorEl}
        anchorEl={anchorEl}
        offset={{
          top: 0,
          left: 20,
        }}
      >
        <ItemInfoPanel name={name} cost={500} />
      </Popover>
    </>
  );
};

export default ItemCard;