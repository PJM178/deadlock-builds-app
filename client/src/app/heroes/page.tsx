import HeroesContainer from "../HeroesContainer";
import styles from "./heroes.module.css";

const Heroes = () => {
  return (
    <div className={styles["page-container"]}>
      <HeroesContainer />
    </div>
  );
};

export default Heroes;