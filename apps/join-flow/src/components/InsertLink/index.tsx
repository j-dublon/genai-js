import Link from "next/link";

export const InsertLink = ({
  text,
  searchText,
  href,
}: {
  text: string;
  searchText: string;
  href: string;
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
      <Link href={href} className="text-ui-link font-medium underline">
        {searchText}
      </Link>
      {afterText}
    </>
  );
};
