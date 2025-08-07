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
    <div className="flex items-center justify-between p-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-ui-grey-300 md:-mt-2 gap-2 md:gap-3">
      <div className="text-xs md:text-sm font-bold">{text}</div>
      <Button
        size="small"
        data-testid={text}
        target="_blank"
        variant="outline"
        href={href}
        tint="white"
        aria-label={text}
        className="w-auto font-normal max-[389px]:text-wrap max-[389px]:w-[100px]"
        type="button"
      >
        View and download
      </Button>
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
      <p className="text-sm md:text-md font-bold mb-4 md:mb-6">{title}</p>
      <div className="bg-ui-grey-100 p-5 md:p-6 rounded-md">
        <div className="text-xs md:text-sm font-medium mb-6">{disclaimer}</div>
        <div className="flex flex-col md:gap-[10] md:pt-2 bg-core-white rounded-sm">
          {documents}
        </div>
      </div>
    </>
  );
};
