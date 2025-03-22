import Image from "next/image";
import styles from "./ItemInfoPanel.module.css"
import { Item, PassiveAndActive } from "@/types/items";
import { ItemCategories } from "../items.types";
import { joinAndCapitalizeArrayOfString, splitCamelCase } from "@/app/utility/utility";

const PassiveBlock = ({ passiveData }: { passiveData: Item["passive"] }) => {
  if (passiveData) {
    return (
      <>
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
        <StatPanel data={passiveData} />
      </>
    );
  }

  return null;
};

const ActiveBlock = ({ activeData }: { activeData: Item["active"] }) => {
  if (activeData) {
    return (
      <>
        <div
          className={styles["item-info-tab--title"]}
        >
          <span><b>Active</b></span>
          <div
            className={styles["item-info-tab--title-cooldown"]}
            style={{ visibility: activeData.cooldown ? "visible" : "hidden" }}
          >
            {activeData.cooldown}s
          </div>
        </div>
        <StatPanel data={activeData} />
      </>
    );
  }

  return null;
};

const StatPanel = (props: { data: PassiveAndActive }) => {
  const { data } = props;

  const handleStatsGridColumns = (extraStat?: boolean): React.CSSProperties => {
    if (data?.statPanel.generalStats?.length === 1) {
      if (!data.statPanel.extraStats) {
        return { gridTemplateColumns: "repeat(1, 1fr)" };
      }

      if (extraStat) {
        return { gridColumn: "span 2" };
      }

      return { gridTemplateColumns: "repeat(3, 1fr)" };
    }

    if (data?.statPanel.generalStats?.length === 2) {
      if (extraStat) {
        return { gridColumn: "1 / -1" };
      }

      return { gridTemplateColumns: "repeat(2, 1fr)" };
    }

    return { gridTemplateColumns: "repeat(1, 1fr)" };
  };

  return (
    <div className={`${styles["item-info-tab"]} ${styles["stats"]}`.trim()}>
      <div dangerouslySetInnerHTML={{
        __html: data.description,
      }} />
      {data.statPanel?.generalStats && <div
        className={styles["item-info-tab--passive-stats-container"]}
        style={handleStatsGridColumns()}
      >
        {data.statPanel.generalStats.map((stat, index) => (
          <div key={index} className={styles["item-info-tab--passive-stats--general-container"]}>
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
        ))}
        {data.statPanel.extraStats &&
          <div
            className={styles["item-info-tab--passive-stats--extra-container"]}
            style={handleStatsGridColumns(true)}
          >

          </div>}
      </div>}
    </div >
  );
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
    slideDistance: "%",
  };

  return (
    <div
      className={`${styles["container"]} ${styles[category ?? "weapon"]}`.trim()}
    >
      <div
        className={`${styles["container--general"]} ${styles["container--item"]}`.trim()}
      >
        <div
          className={`${styles["item-info-tab"]}`}
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
          className={`${styles["item-info-tab"]} ${styles["stats"]}`}
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
        <PassiveBlock passiveData={itemData.passive} />
        <ActiveBlock activeData={itemData.active} />
        {itemData.componentOf &&
          <div className={`${styles["item-info-tab"]} ${styles["component"]}`}>
            <div className={styles["item-info-tab--component-container"]}>
              <div>IS COMPONENT OF:</div>
              <div className={styles["item-info-tab--component-icon--container"]}>
                <div
                  className={`${styles["item-info-tab--component-icon--icon-container"]} ${styles[category ?? "weapon"]}`.trim()}
                >
                  <Image
                    className={`${styles["item-info-tab--component-icon--icon"]} ${styles[category ?? "weapon"]}`.trim()}
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