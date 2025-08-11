export interface LinkOrButtonData {
  searchText: string;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
  className?: string;
}

export interface InsertLinksOrButtonsProps {
  text: string;
  items: LinkOrButtonData[];
  defaultClassName?: string;
}

export const InsertLinksOrButtons = ({
  text,
  items,
  defaultClassName,
}: InsertLinksOrButtonsProps) => {
  const validItems = items.filter((item) => item.searchText.trim().length > 0);

  if (validItems.length === 0) return <>{text}</>;

  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = validItems
    .map((item) => escapeRegExp(item.searchText))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const item = validItems.find((i) => i.searchText === part);
        if (item) {
          if (item.href) {
            const styling = `ds:text-ui-link ds:font-medium ds:underline ds:cursor-pointer ${item.className || defaultClassName || ""}`;
            return (
              <a
                key={index}
                href={item.href}
                className={styling}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              >
                {part}
              </a>
            );
          } else if (item.onClick) {
            const styling = `ds:text-ui-link ds:font-medium ds:underline ds:cursor-pointer ${item.className || defaultClassName || ""}`;
            return (
              <button key={index} onClick={item.onClick} className={styling}>
                {part}
              </button>
            );
          } else {
            return (
              <span
                key={index}
                className={item.className || defaultClassName || ""}
              >
                {part}
              </span>
            );
          }
        }

        return (
          <span key={index} className={defaultClassName || ""}>
            {part}
          </span>
        );
      })}
    </>
  );
};
