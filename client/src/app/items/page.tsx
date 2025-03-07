import styles from "./items.module.css";
import { ItemCategories, TabProps } from "./items.types";
import heroes from "../../data/heroes.json";
import itemsWeapon from "../../data/items_weapon.json";
import Image from "next/image";
import ItemTier from "./components/ItemTier";
import ItemCard from "./components/ItemCard";

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
      {itemsWeapon.map((tier) => (
        <ItemTier key={tier.tier} cost={tier.cost} tier={tier.tier} category={(itemCategory as ItemCategories) ?? "weapon"}>
          {itemCategory && isSearchParamItem ?
            (tier.items as { name: string }[]).map((item, index) => (
              <ItemCard key={item.name ?? index} name={(item.name as string) ?? ""} category={(itemCategory as ItemCategories) ?? "weapon"} />
            )) :
            (tier.items as { name: string }[]).map((item, index) => (
              <ItemCard key={item.name ?? index} name={(item.name as string) ?? ""} category={(itemCategory as ItemCategories) ?? "weapon"} />
            ))
          }
        </ItemTier>
      ))}
    </div>
  );
};

export default ItemsHome;