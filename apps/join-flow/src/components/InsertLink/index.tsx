import Link from "next/link";

export const InsertLink = ({
  text,
  searchText,
  href,
  openInNewTab = false,
}: {
  text: string;
  searchText: string;
  href: string;
  openInNewTab?: boolean;
}) => {
  const index = text.indexOf(searchText);

  if (index === -1 || !text || !searchText || !href) {
    return <>{text}</>;
  }

  const beforeText = text.substring(0, index);
  const afterText = text.substring(index + searchText.length);

  return (
    <>
      {beforeText}
      <Link
        href={href}
        className="text-ui-link font-medium underline"
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {searchText}
      </Link>
      {afterText}
    </>
  );
};
