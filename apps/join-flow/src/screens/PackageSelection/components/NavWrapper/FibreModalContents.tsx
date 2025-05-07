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
        <img
          src={image}
          alt="Modal Image"
          className="ds:my-8 ds:md:my-4 ds:w-full"
        />
      )}
      {subtitle && (
        <p
          id="modal-subtitle"
          className="ds:text-xs ds:md:text-sm ds:font-semibold ds:leading-relaxed ds:text-core-black ds:pb-4"
        >
          {subtitle}
        </p>
      )}
      <p
        id="modal-content"
        className="ds:text-core-black ds:leading-relaxed ds:pb-8 ds:md:pb-6 ds:font-normal ds:text-xs ds:md:text-sm"
      >
        {content}
      </p>
    </>
  );
};
