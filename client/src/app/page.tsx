import { Hero } from "@/types/heroes";
import heroes from "../data/heroes.json";
import { HeroCard } from "./components/HeroCard";
import styles from "./page.module.css"

export default function Home() {
  const heroData: Hero[] = heroes;
  
  return (
    <main>
      <div>
      <div className={styles["hero-card-container"]}>
        {heroData.map((hero) => (
          <HeroCard key={hero.id} id={hero.id} name={hero.name} />
        ))}
      </div>
      </div>
    </main>
  );
}
