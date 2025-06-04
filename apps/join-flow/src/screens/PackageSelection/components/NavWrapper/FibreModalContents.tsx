export const FibreModalContents = ({
  image,
  subtitle,
  content,
}: {
  image?: string;
  subtitle?: string;
  content: string;
}) => {
  return (
    <>
      {image && (
        <img src={image} alt="Modal Image" className="my-8 md:my-4 w-full" />
      )}
      {subtitle && (
        <p
          id="modal-subtitle"
          className="text-xs md:text-sm font-semibold leading-relaxed text-core-black pb-4"
        >
          {subtitle}
        </p>
      )}
      <p
        id="modal-content"
        className="text-core-black leading-relaxed pb-8 md:pb-6 font-normal text-xs md:text-sm"
      >
        {content}
      </p>
    </>
  );
};
