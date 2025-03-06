import styles from "./items.module.css";
import { TabProps } from "./items.types";
import heroes from "../../data/heroes.json";
import itemsWeapon from "../../data/items_weapon.json";
import Image from "next/image";

type ItemCategories = "weapon" | "vitality" | "spirit" | undefined;

const Tab = (props: TabProps) => {
  const { name, searchParam } = props;
  console.log(searchParam)
  return (
    <div className={`${(searchParam === name.toLocaleLowerCase()) ? styles["active"] : ""}`}>{name}</div>
  );
};

interface ItemProps {
  searchParams: Promise<{ item: string | undefined }>
}

const ItemsHome = async ({ searchParams }: ItemProps) => {
  const itemCategory = (await searchParams).item;
  const isSearchParamItem = ["weapon", "vitality", "spirit"].includes(itemCategory ?? "");

  return (
    <div>
      <Tab name="Weapon" searchParam={itemCategory && isSearchParamItem ? itemCategory : "weapon"} />
      <Tab name="Vitality" searchParam={itemCategory} />
      <Tab name="Spirit" searchParam={itemCategory} />
      {itemCategory && isSearchParamItem &&
        itemsWeapon[0].items.map((item) => (
          <div key={item.name}>
            <Image
              className={styles["portrait-image"]}
              src={`/items/${itemCategory}/${(item.name as string).replace(/[^a-zA-Z0-9]/g, "_")}.webp`}
              width={100}
              height={100}
              alt={item.name}
            />
            <span>{item.name}</span>
          </div>
        ))
      }
    </div>
  );
};

export default ItemsHome;