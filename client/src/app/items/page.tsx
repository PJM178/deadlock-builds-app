import styles from "./items.module.css";
import { ItemCategories, ItemProps, TabProps, TabsContainerProps } from "./items.types";
import items from "../../data/items.json"
// import Image from "next/image";
import ItemTier from "./components/ItemTier";
import ItemCard from "./components/ItemCard";
import Link from "next/link";

const Tab = (props: TabProps) => {
  const { name, searchParam, icon } = props;
  const toLink = name.toLowerCase();

  return (
    <Link
      href={`/items?category=${toLink}`}
      prefetch={true}
      className={styles["tab-container"]}
      style={{ backgroundColor: searchParam === name.toLocaleLowerCase() ? `var(--${name.toLowerCase()}-background-color)` : "antiquewhite" }}
    >
      <span className={styles["tab-content--container"]}>
        {icon}
        <div className={`${(searchParam === name.toLocaleLowerCase()) ? styles["active"] : ""}`}>{name}</div>
      </span>
    </Link>
  );
};

const TabsContainer = (props: TabsContainerProps) => {
  const { children } = props;

  return (
    <div className={styles["tabs-container"]}>
      {children}
    </div>
  );
};

const ItemsHome = async ({ searchParams }: ItemProps) => {
  const itemCategory = (await searchParams).category as ItemCategories;
  const isSearchParamItem = ["weapon", "vitality", "spirit"].includes(itemCategory ?? "");

  const handleTabsIcon = (name: ItemCategories) => {
    if (name === "weapon") {
      return (
        <span>
          W
        </span>
      );
    }

    if (name === "vitality") {
      return (
        <span>
          V
        </span>
      );
    }

    if (name === "spirit") {
      return (
        <span>
          S
        </span>
      );
    }

    return null;
  }

  return (
    <div>
      <TabsContainer>
        <Tab name="Weapon" icon={handleTabsIcon("weapon")} searchParam={(itemCategory && isSearchParamItem) ? itemCategory : "weapon"} />
        <Tab name="Vitality" icon={handleTabsIcon("vitality")} searchParam={itemCategory} />
        <Tab name="Spirit" icon={handleTabsIcon("spirit")} searchParam={itemCategory} />
      </TabsContainer>
      <div className={styles["items-container"]}>
        {items.map((category) => {
          if ((!isSearchParamItem || itemCategory === "weapon") && category.category === "weapon") {
            return (
              category.data.map((tier) => {
                return (
                  <ItemTier key={tier.tier} cost={tier.cost} tier={tier.tier} category={"weapon"}>
                    {(tier.items as { name: string }[]).map((item, index) => (
                      <ItemCard key={item.name ?? index} tier={tier.tier} name={(item.name as string) ?? ""} category={(category.category as ItemCategories)} />
                    ))}
                  </ItemTier>
                );
              })
            );
          }

          if (itemCategory === "vitality" && category.category === itemCategory) {
            return (
              category.data.map((tier) => {
                return (
                  <ItemTier key={tier.tier} cost={tier.cost} tier={tier.tier} category={(itemCategory as ItemCategories)}>
                    {(tier.items as { name: string }[]).map((item, index) => (
                      <ItemCard key={item.name ?? index} tier={tier.tier} name={(item.name as string) ?? ""} category={(category.category as ItemCategories)} />
                    ))}
                  </ItemTier>
                );
              })
            );
          }

          if (itemCategory === "spirit" && category.category === itemCategory) {
            return (
              category.data.map((tier) => {
                return (
                  <ItemTier key={tier.tier} cost={tier.cost} tier={tier.tier} category={(itemCategory as ItemCategories)}>
                    {(tier.items as { name: string }[]).map((item, index) => (
                      <ItemCard key={item.name ?? index} tier={tier.tier} name={(item.name as string) ?? ""} category={(category.category as ItemCategories)} />
                    ))}
                  </ItemTier>
                );
              })
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ItemsHome;