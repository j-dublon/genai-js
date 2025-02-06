export interface FooterLinksProps {
  sections: {
    header: string;
    links: { label: string; href: string }[];
  }[];
}

export const FooterLinks = ({ sections }: FooterLinksProps) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 py-4">
      {sections.map((section, index) => (
        <div key={index} className="flex-1">
          <h3 className="text-xs text-ui-grey-500 text-left">
            {section.header}
          </h3>
          <ul className="mt-4 space-y-4">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="text-sm text-left no-underline hover:underline underline-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
