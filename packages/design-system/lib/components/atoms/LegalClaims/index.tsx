import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import Link from "next/link";

export const LegalClaims = ({
  backgroundColor = "white",
}: {
  backgroundColor?: BackgroundColors;
}) => {
  const linkClass = "ds:text-core-purple ds:font-medium ds:underline ds:ml-1";

  return (
    <section
      aria-label="Legal"
      className={`ds:relative ds:flex ds:justify-center ds:sm:px-tablet ds:px-mobile ds:lg:px-desktop ${bgColorVariants[backgroundColor]}`}
    >
      <div className="ds:flex ds:flex-col ds:py-6 ds:md:py-15 ds:max-w-[1152px] ds:w-full">
        <h2 className="ds:text-xs ds:md:text-sm ds:font-semibold">
          Stats and claims
        </h2>
        <ul className="ds:text-xs ds:md:text-sm ds:list-disc ds:list-inside ds:marker:text-xs">
          <li>
            <b className="ds:font-medium">£0 set-up and installation:</b>
            <Link
              className={linkClass}
              href="https://www.cuckoo.co/legal/terms"
            >
              Terms apply
            </Link>
          </li>
          <li>
            <b className="ds:font-medium">
              UK's most reliable broadband technology:
            </b>{" "}
            Ofcom
            <Link
              className={linkClass}
              href="https://www.ofcom.org.uk/siteassets/resources/documents/consultations/category-1-10-weeks/254969-improving-broadband-information-for-customers-/associated-documents/broadband-info-terminology-report.pdf?v=321949"
            >
              Broadband Terminology Research 2022
            </Link>{" "}
            – Fibre to the premises (FTTP)
          </li>
          <li>
            <b className="ds:font-medium">15x faster:</b> Ofcom
            <Link
              className={linkClass}
              href="https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/multi-sector/infrastructure-research/connected-nations-2024/connected-nations-uk-report-2024.pdf?v=386497"
            >
              Connected Nations UK report 2024
            </Link>{" "}
            – FTTC Average maximum download speed
          </li>
          <li>
            <b className="ds:font-medium">Cuckoo Protect worth £199.98:</b> When
            purchased as part of the
            <Link className={linkClass} href="http://eero.com/eero-plus">
              eero Plus service
            </Link>{" "}
            on a 24-month plan
          </li>
          <li>
            <b className="ds:font-medium">
              eero Pro 6E included with every plan:
            </b>
            <Link
              className={linkClass}
              href="https://www.cuckoo.co/legal/terms"
            >
              Terms apply
            </Link>
            . Use of eero for contract period only
          </li>
          <li>
            <b className="ds:font-medium">eero Pro 6E worth £249.99:</b> RRP
            relates to current selling price on Amazon UK, March 2025
          </li>
          <li>
            <b className="ds:font-medium">Connected in 14 days:</b> Based on the
            median order to install time period for all OTS orders placed
            between 14-28 Feb 2025
          </li>
        </ul>
      </div>
    </section>
  );
};
