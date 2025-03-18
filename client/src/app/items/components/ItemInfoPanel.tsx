import Image from "next/image";
import styles from "./ItemInfoPanel.module.css"
import { Item } from "@/types/items";
import { ItemCategories } from "../items.types";
import { joinAndCapitalizeArrayOfString, splitCamelCase } from "@/app/utility/utility";

const PassiveBlock = ({ passiveData }: { passiveData: Item["passive"] }) => {
  if (passiveData) {
    return (
      <>
        <div
          className={`${styles["item-info-tab--background-wrapper--passive-title"]}`}
        >
          <div
            className={styles["item-info-tab--title"]}
          >
            <span><i>Passive</i></span>
            <div
              className={styles["item-info-tab--title-cooldown"]}
              style={{ visibility: passiveData.cooldown ? "visible" : "hidden" }}
            >
              {passiveData.cooldown}s
            </div>
          </div>
        </div>
        <div
          className={`${styles["item-info-tab--background-wrapper--stats"]}`}
        >
          <div className={styles["item-info-tab"]}>
            <div dangerouslySetInnerHTML={{
              __html: passiveData.description,
            }} />
            <div
              className={styles["item-info-tab--passive-stats-container"]}
              style={{
                gridTemplateColumns: `repeat(${passiveData.statPanel?.generalStats?.length}, 1fr)`
              }}
            >
              {passiveData.statPanel?.generalStats?.map((stat, index) => (
                <div
                  key={index}
                  className={`${styles["item-info-tab--background-wrapper--stats-individual"]}`}
                >
                  <div className={styles["item-info-tab--passive-stats--general-container"]}>
                    <div className={styles["item-info-tab--passive-stats--general-row"]}>
                      {stat.symbol &&
                        <Image
                          width={20}
                          height={20}
                          src={`/miscellaneous/item_symbol_${stat.symbol}.${stat.symbol !== "health" ? "svg" : "webp"}`}
                          alt=""
                          style={{
                            filter: `var(--item-${stat.symbol}-symbol-color)`,
                          }}
                        />}{stat.valueType !== "%" && "+"}{stat.value}{stat.valueType}
                    </div>
                    <div className={styles["item-info-tab--passive-stats--general-row"]}>
                      <div
                        style={{
                          filter: `var(--item-${stat.textColor}-symbol-color)`,
                        }}
                      >
                        {stat.text}
                      </div>
                    </div>
                    <div className={styles["item-info-tab--passive-stats--general-row"]}>
                      {stat.conditional && <i>Conditional</i>}
                    </div>
                  </div>
                </div>
              ))}
              {passiveData.statPanel?.extraStats &&
                <div className={styles["item-info-tab--passive-stats--extra-container"]}>

                </div>}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

interface ItemInfoPanelProps {
  itemData: Item;
  cost: number;
  innate: number;
  category: ItemCategories;
  displayModifiesPanel?: boolean;
}

const ItemInfoPanel = (props: ItemInfoPanelProps) => {
  const { itemData, cost, innate, category, displayModifiesPanel } = props;

  const formatTypes = {
    fireRate: "%",
    weaponDamage: "%",
    bulletResist: "%",
    spiritResist: "%",
  };

  const extraStyles = {
    backgroundColor: `var(--item-${category}--header)`,
  };

  return (
    <div
      className={styles["container"]}
    >
      <div
        className={`${styles["container--general"]} ${styles["container--item"]}`}
        style={extraStyles}
      >
        <div
          className={`${styles["item-info-tab"]}`}
          style={extraStyles}
        >
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
        <div
          className={`${styles["item-info-tab--background-wrapper--stats"]}`.trim()}
          style={extraStyles}
        >
          <div
            className={`${styles["item-info-tab"]}`}
          >
            <div className={styles["item-info-tab--stats"]}>
              {itemData.stats && (Object.keys(itemData.stats)).map((stat) => {
                return (
                  Object.entries(itemData.stats[stat as keyof Item["stats"]]).map(([key, value]) => {
                    const formattedKey = joinAndCapitalizeArrayOfString(splitCamelCase(key));

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
        </div>
        <PassiveBlock passiveData={itemData.passive} />
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