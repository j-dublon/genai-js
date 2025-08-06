import { getAssetPath } from "@/lib/get-asset-path";

export const props = {
  titleText: "Fast, fair, feel-good broadband",
  trustPilotLogo: {
    altText: "Trustpilot logo",
    imgSrc: getAssetPath("/images/trustpilot-logo.svg"),
  },
  footerDisclaimerText:
    "© 2025 Cuckoo Fibre Ltd is a company registered in England and Wales (No 15060036). \n Our registered address is Milford House, Pynes Hill, Exeter, EX2 5AZ. \n Our VAT number is 451054916. \n Cuckoo Fibre Ltd is regulated by Ofcom.",
  footerSections: [
    {
      header: "Company",
      links: [
        { label: "About", href: "https://www.cuckoo.co/about" },
        { label: "Careers", href: "https://careers.cuckoo.co/" },
        {
          label: "Cuckoo Community Referral Scheme",
          href: "https://www.cuckoo.co/partner-with-us",
        },
        {
          label: "Gender Pay Gap Report",
          href: "https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/Z-MGundAxsiBv5lD_GenderPayGapreport25031.pdf",
        },
      ],
    },
    {
      header: "Help & Contact",
      links: [
        {
          label: "Support",
          href: "https://help.cuckoo.co/en/",
        },
        {
          label: "Contact Us",
          href: "https://help.cuckoo.co/en/articles/9123655-contact-the-team",
        },
        { label: "Blog", href: "https://www.cuckoo.co/blog" },
        { label: "Press", href: "mailto:press@cuckoo.co" },
        { label: "999 Emergency (BSL)", href: "https://999bsl.co.uk/" },
      ],
    },
    {
      header: "Useful Links",
      links: [
        {
          label: "Terms & Conditions",
          href: "https://www.cuckoo.co/legal/terms",
        },
        {
          label: "Promotional Terms & Conditions",
          href: "https://www.cuckoo.co/legal/promotional-terms",
        },
        {
          label: "Privacy Notice",
          href: "https://www.cuckoo.co/legal/privacy",
        },
        {
          label: "Cookie Policy",
          href: "https://www.cuckoo.co/legal/cookie-policy",
        },
        {
          label: "Complaints Code",
          href: "https://www.cuckoo.co/legal/complaints",
        },
        {
          label: "Prices & Charge List",
          href: "https://www.cuckoo.co/legal/price-list",
        },
        {
          label: "Vulnerable Customer Policy",
          href: "https://www.cuckoo.co/legal/vulnerable-customer-policy",
        },
        {
          label: "Acceptable Use Policy",
          href: "https://www.cuckoo.co/legal/fair-usage-policy",
        },
        {
          label: "Website Acceptable Use",
          href: "https://www.cuckoo.co/legal/website-acceptable-use",
        },
        {
          label: "Website Terms",
          href: "https://www.cuckoo.co/legal/website-terms",
        },
        {
          label: "Cookie Preferences",
          href: "https://www.cuckoo.co/index#cookie-notice",
        },
        {
          label: "Business Terms",
          href: "https://www.cuckoo.co/legal/terms-business-customers",
        },
        {
          label: "Legacy Brand Documents",
          href: "https://www.cuckoo.co/legal/legacy-brand-documents",
        },
      ],
    },
  ],
};
