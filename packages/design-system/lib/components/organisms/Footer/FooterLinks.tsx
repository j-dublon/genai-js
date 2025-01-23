import React from "react";

export interface FooterLinksProps {
  sections: {
    header: string;
    links: { label: string; href: string }[];
  }[];
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ sections }) => {
  return (
    <div className="w-[600px] flex space-x-8 py-4">
      {sections.map((section, index) => (
        <div key={index} className="flex-1">
          <h3 className="font-sans text-[12px] font-normal leading-[19.2px] core-ui-grey-500 text-left">
            {section.header}
          </h3>
          <ul className="mt-4 space-y-[16px]">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="font-sans text-[14px] font-normal leading-[22.4px] text-left no-underline hover:underline underline-offset-2 decoration-gray-600 hover:text-gray-800 transition-colors duration-200"
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
