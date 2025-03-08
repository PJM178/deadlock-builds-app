export interface TabProps {
  name: string;
  searchParam: string | undefined;
  icon?: React.ReactNode;
}

export interface TabsContainerProps {
  children: React.ReactNode;
}

export interface ItemProps {
  searchParams: Promise<{ category: string | undefined }>
}

export type ItemCategories = "weapon" | "vitality" | "spirit" | undefined;