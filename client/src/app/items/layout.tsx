import styles from "./layout.module.css"

interface ItemsLayoutProps {
  children: React.ReactNode;
}

const ItemsLayout = async (props: ItemsLayoutProps) => {
  const { children } = props;

  return (
    <main className={styles["main"]}>
      {children}
    </main>
  );
};

export default ItemsLayout;