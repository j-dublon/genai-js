export interface DocumentItemProps {
  text: string;
  href: string;
}

import { Button } from "@react-component-library/ui";

const DocumentItem = ({
  text,
  href,
}: DocumentItemProps): React.ReactElement => {
  return (
    <div className="flex items-center gap-6 p-4 self-stretch mb-4 content-center border-b-1">
      <div className="font-bold">{text}</div>
      <div>
        <Button
          size="small"
          data-testid={text}
          target="_blank"
          variant="outline"
          href={href}
          tint="white"
          aria-label={text}
          className="w-full md:w-auto"
          type="button"
        >
          {" "}
          View and Download{" "}
        </Button>
      </div>
    </div>
  );
};

interface PaymentDocumentProps {
  title: string;
  disclaimer: string;
  items: DocumentItemProps[];
}

export const PaymentDocuments = ({
  title,
  disclaimer,
  items,
}: PaymentDocumentProps): React.ReactElement => {
  const documents = items.map(
    (item: DocumentItemProps, index: number): React.ReactElement => (
      <DocumentItem key={index} text={item.text} href={item.href} />
    ),
  );

  return (
    <>
      <p className="text-md font-bold mb-6">{title}</p>
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <div className="font-semibold mb-4">{disclaimer}</div>
        <div className="flex flex-col gap-[10] p-4 bg-core-white rounded-sm">
          <>{documents}</>
        </div>
      </div>
    </>
  );
};
