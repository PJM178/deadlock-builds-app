import Image from "next/image";
import styles from "./ItemInfoPanel.module.css"
import { Item, StatKeys } from "@/types/items";
import { ItemCategories } from "../items.types";
import { joinAndCapitalizeArrayOfString, splitCamelCase } from "@/app/utility/utility";
import TestFetchData from "./TestFetchData";

interface ItemInfoPanelProps {
  itemData: Item;
  cost: number;
  innate: number;
  category: ItemCategories;
  displayModifiesPanel?: boolean;
}

const ItemInfoPanel = (props: ItemInfoPanelProps) => {
  const { itemData, cost, innate, category, displayModifiesPanel } = props;
  const string = "Deal additional <b>Weapon Damage</b> when in <b>close range</b> to your target.<br />\n <i>JORMAA</i>"

  const formatTypes = {
    fireRate: "%",
    weaponDamage: "%",
    bulletResist: "%",
    spiritResist: "%",
  };

  return (
    <div className={styles["container"]}>
      <TestFetchData />
      <div className={`${styles["container--general"]} ${styles["container--item"]}`}>
        <div className={styles["item-info-tab"]}>
          <div className={styles["basic-info--container"]}>
            <div className={styles["basic-info--name"]}>
              <span>{itemData.name}</span>
              <span className={styles["basic-info--name-cost"]}>
                <Image
                  className={styles["souls-icon"]}
                  src={"/miscellaneous/icon_soul.svg"}
                  alt="souls"
                  width={20}
                  height={20}
                />
                {cost}
              </span>

            </div>
            {displayModifiesPanel &&
              <div className={styles["basic-info--stats"]}>
                <div>
                  {innate}
                </div>
                <div>
                  {category}
                </div>
              </div>}
          </div>
        </div>
        <div className={styles["item-info-tab"]}>
          <div className={styles["item-info-tab--stats"]}>
            {itemData.stats && (Object.keys(itemData.stats)).map((stat, index) => {
              return (
                Object.entries(itemData.stats[stat as keyof Item["stats"]]).map(([key, value]) => {
                  const formattedKey = joinAndCapitalizeArrayOfString(splitCamelCase(key));
                  console.log()
                  return (
                    <div
                      key={key}
                      className={styles["item-info-tab--stats-row"]}
                    >
                      <div>{value > 0 ? "+" : "-"}{value}{formatTypes[key as keyof typeof formatTypes]}</div>
                      <div>{formattedKey}</div>
                    </div>
                  );
                })
              );
            })}
          </div>
        </div>
        {itemData.passive &&
          <>
            <div className={styles["item-info-tab--title"]}>
              <span><i>Passive</i></span>
              {itemData.passive.cooldown &&
                <div className={styles["item-info-tab--title-cooldown"]}>
                  {itemData.passive.cooldown}s
                </div>}
            </div>
          </>}
        {itemData.active &&
          <>
            <div className={styles["item-info-tab--title"]}>
              <span><b>Active</b></span>
            </div>
            <div className={styles["item-info-tab"]}>

            </div>
          </>}
        <div className={styles["item-info-tab"]}>

          active
          <span dangerouslySetInnerHTML={{
            __html: string,
          }} />
        </div>
        {itemData.componentOf &&
          <div className={styles["item-info-tab"]}>
            <div className={styles["item-info-tab--component-container"]}>
              <div>IS COMPONENT OF:</div>
              <div className={styles["item-info-tab--component-icon--container"]}>
                <div className={styles["item-info-tab--component-icon--icon-container"]}>
                  <Image
                    className={styles["item-info-tab--component-icon--icon"]}
                    src={`/items/${category}/${itemData.componentOf.split(" ").join("_")}.webp`}
                    alt={itemData.componentOf}
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles["item-info-tab--component-icon--name"]}>{itemData.componentOf}</div>
              </div>
            </div>
          </div>}
      </div>
      {displayModifiesPanel && <div className={`${styles["container--general"]} ${styles["container--modifies"]}`}>
        Modifies stats
      </div>}
    </div>
  );
};

export default ItemInfoPanel;