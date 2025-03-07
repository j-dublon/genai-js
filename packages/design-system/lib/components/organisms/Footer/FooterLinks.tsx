export interface FooterLinksProps {
  sections: {
    header: string;
    links: { label: string; href: string }[];
  }[];
}

export const FooterLinks = ({ sections }: FooterLinksProps) => {
  return (
    <div className="ds:flex ds:flex-col ds:sm:flex-row ds:space-y-8 ds:sm:space-y-0 ds:sm:space-x-8">
      {sections.map((section, index) => (
        <div key={index} className="ds:flex-1">
          <h3 className="ds:text-xs ds:text-ui-grey-500 ds:text-left">
            {section.header}
          </h3>
          <ul className="ds:mt-4 ds:space-y-4">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="ds:text-sm ds:text-left ds:no-underline ds:hover:underline ds:underline-offset-2"
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
