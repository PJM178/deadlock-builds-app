import Image from "next/image";
import { ItemCategories } from "../items.types";
import styles from "./ItemTier.module.css";
import { formatNumber } from "@/app/utility/utility";

interface ItemTierProps {
  children: React.ReactNode;
  tier: number;
  cost: number;
  category: ItemCategories
}

const ItemTier = (props: ItemTierProps) => {
  const { children, tier, cost, category } = props;
  const isOdd = (tier + 1) % 2 !== 0;

  return (
    <div className={`${styles["tier-container"]} ${isOdd ? styles["even-tier-container"] : ""}`.trim()} style={{ backgroundColor: `var(--${category}-background-color)` }}>
      <div className={styles["souls-container"]}>
        <Image className={styles["souls-icon"]} src={"/miscellaneous/icon_soul.svg"} alt="souls" width={25} height={25} />
        <span className={styles["souls-cost"]}>{formatNumber(cost)}</span>
        {tier > 2 && <span>+</span>}
      </div>
      <div className={styles["item-container"]}>
        {children}
      </div>
    </div>
  );
};

export default ItemTier;