import Image from "next/image";
import styles from "./ItemInfoPanel.module.css"

interface ItemInfoPanelProps {
  name: string;
  cost: number;
}

const ItemInfoPanel = (props: ItemInfoPanelProps) => {
  const { name, cost } = props;

  return (
    <div className={styles["container"]}>
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
        basic stats
      </div>
      <div className={styles["item-info-tab"]}>
        is component of
      </div>
    </div>
  );
};

export default ItemInfoPanel;