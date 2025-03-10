import Image from "next/image";
import styles from "./ItemInfoPanel.module.css"

interface Stats {
  value: number;
  type: string;
}

interface Passive {
  description: string;
  cooldown: number | null;
  stats: null
}

interface Active {
  description: string;
  cooldown: number | null;
  stats: null
}

interface ItemInfoPanelProps {
  name: string;
  cost: number;
  stats: Record<string, number>;
  passive: Passive | null;
  active: Active | null;
  isComponentOf: string;
  displayModifiesPanel?: boolean;
}

const ItemInfoPanel = (props: ItemInfoPanelProps) => {
  const { name, cost, displayModifiesPanel } = props;
  const string = "Deal additional <b>Weapon Damage</b> when in <b>close range</b> to your target.<br />\n <i>JORMAA</i>"

  return (
    <div className={styles["container"]}>
      <div className={`${styles["container--general"]} ${styles["container--item"]}`}>
        <div className={styles["item-info-tab"]}>
          <div className={styles["basic-info--container"]}>
            <div className={styles["basic-info--name"]}>
              <span>{name}</span>
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
            <div className={styles["basic-info--stats"]}>
              <div>
                basic stat bonus
              </div>
              <div>
                basic bonus type
              </div>
            </div>
          </div>
        </div>
        <div className={styles["item-info-tab"]}>
          {/* <span>{parseHTMLToJSX(string)}</span> */}
          passive
        </div>
        <div className={styles["item-info-tab"]}>
          active
          <span dangerouslySetInnerHTML={{
            __html: string,
          }} />
          {/* <span>{parseHTMLToJSX(string)}</span>
          <span>{parseHTMLToJSX(string)}</span>
          <span>{parseHTMLToJSX(string)}</span>
          <span>{parseHTMLToJSX(string)}</span>
          <span>{parseHTMLToJSX(string)}</span>
          <span>{parseHTMLToJSX(string)}</span> */}
        </div>
        <div className={styles["item-info-tab"]}>
          is component of
        </div>
      </div>
      {displayModifiesPanel && <div className={`${styles["container--general"]} ${styles["container--modifies"]}`}>
        Modifies stats
      </div>}
    </div>
  );
};

export default ItemInfoPanel;