import { Button } from "@react-component-library/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface DocumentItemProps {
  text: string;
  href: string;
}

const DocumentItem = ({
  text,
  href,
}: DocumentItemProps): React.ReactElement => {
  return (
    <div className="flex items-center gap-4 md:gap-24 p-4 self-stretch mb-4 last content-center [&:not(:last-child)]:border-b-[0.5]">
      <div className="text-sm md:text-medium font-bold">{text}</div>
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
  const router = useRouter();

  useEffect(() => {
    const hasInvalidHref = items.some(
      (page) => !page.href || page.href === "/",
    );
    if (hasInvalidHref) {
      router.push("/join-flow/payment-details/contract-retrieval-failed");
    }
  }, [items, router]);

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
        <div className="flex flex-col md:gap-[10] md:p-4 p-2 bg-core-white rounded-sm">
          {documents}
        </div>
      </div>
    </>
  );
};
