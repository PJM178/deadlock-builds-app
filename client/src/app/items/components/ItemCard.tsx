"use client"

import { ItemCategories } from "../items.types";
import { useState } from "react";
import Image from "next/image";
import styles from "./ItemCard.module.css"
import Popover from "../../components/Popover";
import ItemInfoPanel from "./ItemInfoPanel";
import { Item } from "@/types/items";

interface ItemCardProps {
  itemData: Item;
  category: ItemCategories;
  innate: number;
  cost: number;
}

const ItemCard = (props: ItemCardProps) => {
  const { itemData, category, innate, cost } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(!anchorEl ? e.currentTarget : null);
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
        onClick={handlePopoverOpen}
        onBlur={handlePopoverClose}
        aria-haspopup="true"
        role="button"
        tabIndex={0}
      >
        <div
          className={styles["item-card-image--container"]}
          style={{ backgroundColor: `var(--${category}-background-color)` }}
        >
          <Image
            className={styles["item-card-image--image"]}
            src={`/items/${category}/${(itemData.name ?? "").replace(/[^a-zA-Z0-9]/g, "_")}.webp`}
            width={50}
            height={50}
            alt={itemData.name ?? ""}
          />
        </div>
        <div className={styles["item-card-name--container"]}>
          <span className={styles["item-card-name--text"]}>{itemData.name}</span>
        </div>
      </div>
      <Popover
        isOpen={!!anchorEl}
        anchorEl={anchorEl}
        offset={{
          top: 0,
          left: 20,
        }}
        position="center"
      >
        <ItemInfoPanel itemData={itemData} cost={cost} innate={innate} category={category} />
      </Popover>
      <ItemInfoPanel itemData={itemData} cost={cost} innate={innate} category={category} />
    </>
  );
};

export default ItemCard;