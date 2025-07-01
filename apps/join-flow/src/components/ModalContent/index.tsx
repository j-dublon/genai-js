export interface ModalContent {
  title: string;
  text: string;
}

interface ModalContentProps {
  content: ModalContent[];
  className?: string;
  titleClassName?: string;
  textClassName?: string;
}

export const ModalContent = ({
  content,
  className,
  textClassName,
  titleClassName,
}: ModalContentProps) => {
  return (
    <div
      className={`bg-ui-grey-100 rounded-sm p-4 my-8 ${className}`}
      data-testid="modal-content-container"
    >
      {content.map((item, index) => (
        <div key={index}>
          <p
            id={`modal-subtitle-${index}`}
            className={`text-xs md:text-sm font-semibold leading-relaxed text-core-black pb-4 ${titleClassName}`}
          >
            {item.title}
          </p>
          <p
            id={`modal-content-${index}`}
            className={`text-core-black leading-relaxed pb-8 md:pb-6 font-normal text-xs md:text-sm ${textClassName}`}
          >
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
};
