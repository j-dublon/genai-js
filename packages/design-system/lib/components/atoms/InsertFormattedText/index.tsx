export interface InsertFormattedTextProps {
  text: string;
  searchText: string;
  className: string;
}

export const InsertFormattedText = ({
  text,
  searchText,
  className,
}: InsertFormattedTextProps) => {
  const index = text.indexOf(searchText);

  if (index === -1 || !text || !searchText || !className) {
    return <>{text}</>;
  }

  const beforeText = text.substring(0, index);
  const afterText = text.substring(index + searchText.length);

  return (
    <>
      {beforeText}
      <span className={className}>{searchText}</span>
      {afterText}
    </>
  );
};
