import React from "react";

export interface FooterLinksProps {
  sections: {
    header: string;
    links: { label: string; href: string }[];
  }[];
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ sections }) => {
  return (
    <div className="absolute top-[85px] left-[calc(144px+313px+275px)] w-[600px] flex space-x-8">
      {sections.map((section, index) => (
        <div key={index} className="flex-1">
          <h3 className="font-garnett font-normal text-[12px] leading-[19.2px] text-gray-800">
            {section.header}
          </h3>
          <ul className="mt-4 space-y-[16px]">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
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
