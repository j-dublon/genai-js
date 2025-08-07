export interface LinkData {
  searchText: string;
  href: string;
  openInNewTab?: boolean;
}

export interface InsertMultipleLinksProps {
  text: string;
  links: LinkData[];
}

export const InsertMultipleLinks = ({
  text,
  links,
}: InsertMultipleLinksProps) => {
  const validLinks = links.filter((link) => link.searchText.trim().length > 0);
  if (validLinks.length === 0) return <>{text}</>;

  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = links.map((link) => escapeRegExp(link.searchText)).join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const link = links.find((l) => l.searchText === part);
        if (link) {
          return (
            <a
              key={index}
              href={link.href}
              className="ds:text-ui-link ds:text-xs ds:md:text-sm ds:underline"
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {part}
            </a>
          );
        }
        return (
          <span key={index} className="ds:text-xs ds:md:text-sm">
            {part}
          </span>
        );
      })}
    </>
  );
};
