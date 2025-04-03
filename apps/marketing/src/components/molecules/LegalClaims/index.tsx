import Link from "next/link";

export const LegalClaims = () => {
  const linkClass = "text-core-purple font-medium underline ml-1";

  return (
    <section
      aria-label="Legal"
      className="relative flex justify-center sm:px-tablet px-mobile  lg:px-desktop"
    >
      <div className="flex flex-col py-6 md:py-15 max-w-[1152px] w-full">
        <h2 className="text-xs md:text-sm font-semibold">Stats and claims</h2>
        <ul className="text-xs md:text-sm list-disc list-inside marker:text-xs">
          <li>
            <b className="font-medium">£0 set-up and installation:</b>
            <Link
              className={linkClass}
              href="https://www.cuckoo.co/legal/terms"
            >
              Terms apply
            </Link>
          </li>
          <li>
            <b className="font-medium">
              UK’s most reliable broadband technology:
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
            <b className="font-medium">15x faster:</b> Ofcom
            <Link
              className={linkClass}
              href="https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/multi-sector/infrastructure-research/connected-nations-2024/connected-nations-uk-report-2024.pdf?v=386497"
            >
              Connected Nations UK report 2024
            </Link>{" "}
            – FTTC Average maximum download speed
          </li>
          <li>
            <b className="font-medium">Cuckoo Protect worth £199.98:</b> When
            purchased as part of the
            <Link className={linkClass} href="http://eero.com/eero-plus">
              eero Plus service
            </Link>{" "}
            on a 24-month plan
          </li>
          <li>
            <b className="font-medium">eero Pro 6E included with every plan:</b>
            <Link
              className={linkClass}
              href="https://www.cuckoo.co/legal/terms"
            >
              Terms apply
            </Link>
            . Use of eero for contract period only
          </li>
          <li>
            <b className="font-medium">eero Pro 6E worth £249.99:</b> RRP
            relates to current selling price on Amazon UK, March 2025
          </li>
          <li>
            <b className="font-medium">Connected in 14 days:</b> Based on the
            median order to install time period for all OTS orders placed
            between 14-28 Feb 2025
          </li>
        </ul>
      </div>
    </section>
  );
};
