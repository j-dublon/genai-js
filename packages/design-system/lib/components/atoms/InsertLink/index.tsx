export interface InsertLinkProps {
  text: string;
  searchText: string;
  href: string;
  openInNewTab?: boolean;
  className?: string;
}

export const InsertLink = ({
  text,
  searchText,
  href,
  openInNewTab = false,
  className,
}: InsertLinkProps) => {
  const index = text.indexOf(searchText);

  if (index === -1 || !text || !searchText || !href) {
    return <>{text}</>;
  }

  const beforeText = text.substring(0, index);
  const afterText = text.substring(index + searchText.length);

  return (
    <>
      <span className={className}>{beforeText}</span>
      <a
        href={href}
        className={`ds:text-ui-link ds:font-medium ds:underline ${className}`}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {searchText}
      </a>
      <span className={className}>{afterText}</span>
    </>
  );
};
