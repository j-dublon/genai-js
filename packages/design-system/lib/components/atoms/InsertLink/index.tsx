export interface InsertLinkProps {
  text: string;
  searchText: string;
  href: string;
  openInNewTab?: boolean;
}

export const InsertLink = ({
  text,
  searchText,
  href,
  openInNewTab = false,
}: InsertLinkProps) => {
  const index = text.indexOf(searchText);

  if (index === -1 || !text || !searchText || !href) {
    return <>{text}</>;
  }

  const beforeText = text.substring(0, index);
  const afterText = text.substring(index + searchText.length);

  return (
    <>
      {beforeText}
      <a
        href={href}
        className="ds:text-ui-link ds:font-medium ds:underline"
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {searchText}
      </a>
      {afterText}
    </>
  );
};
