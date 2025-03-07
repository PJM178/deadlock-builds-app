import { Hero } from "@/types/heroes";
import heroes from "../data/heroes.json";
import { HeroCard } from "./components/HeroCard";
import styles from "./page.module.css"

const HeroesContainer = () => {
  const heroData: Hero[] = heroes;

  return (
    <div className={styles["hero-card-container"]}>
      {heroData.map((hero) => (
        <HeroCard key={hero.id} id={hero.id} name={hero.name} />
      ))}
    </div>
  );
}

export default HeroesContainer;