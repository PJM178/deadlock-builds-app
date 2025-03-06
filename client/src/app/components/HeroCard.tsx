import { Hero } from "@/types/heroes";
import Image from "next/image";
import styles from "./HeroCard.module.css";
import Link from "next/link";

export const HeroCard = (props: Hero) => {
  const { name } = props;
  const parsedName = name.split(" ").join("_");

  return (
    <Link prefetch={true} href={`/hero/${parsedName}`} className={styles["portrait-container"]}>
      <Image
        className={styles["portrait-image"]}
        src={`/portraits/${parsedName}.webp`}
        width={280}
        height={380}
        alt={name}
      />
      <span className={styles["portrait-name"]}>
        {name}
      </span>
    </Link>
  )
};