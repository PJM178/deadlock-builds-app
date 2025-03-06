interface ItemsLayoutProps {
  children: React.ReactNode;
}

const ItemsLayout = async (props: ItemsLayoutProps) => {
  const { children } = props;

  return (
    <section>
      <div>this is layout</div>
      {children}
    </section>
  );
};

export default ItemsLayout;