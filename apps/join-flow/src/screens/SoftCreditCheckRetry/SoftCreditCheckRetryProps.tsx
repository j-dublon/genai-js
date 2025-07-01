export const softCreditCheckRetryProps = {
  heading: "Joining Cuckoo",
  tipCard: {
    heading: "We need a bit more info.",
    paragraph:
      "Sorry, we couldn't match your details with the info we currently have. Make sure you've provided accurate info to help us process your credit check quickly and without any snags!",
  },
  dobSection: {
    heading: "Please confirm the account holder's date of birth:",
  },
  addressSection: {
    heading: "The address you gave us.",
    modalButtonText: "Why we ask for your address history?",
    modalContent: {
      title: "Why we ask for your address history",
      buttonText: "Okay, got it",
      cardContent: [
        {
          title:
            "We need to know your address history to match details accurately",
          text: "We use your address history to check your details match against official records - even if you're not getting service there",
        },
        {
          title: "We need to run a soft credit check",
          text: "This is to verify your identity, prevent fraud and check eligibility - without affecting your credit score",
        },
      ],
    },
    residencyOptions: [
      {
        value: "over-year",
        label: "I've lived at this address for more than 1 year",
      },
      {
        value: "under-year",
        label: "Haven't moved in yet or living here for less than 1 year",
      },
    ],
    heading2: "Please provide us with your current or previous address:",
    fieldPlaceholders: {
      addressLine1: "House number/name",
      addressLine2: "First line of your address",
      addressLine3: "Second line of your address",
      postcode: "Postcode",
    },
  },
  summarySection: {
    paragraph: (
      <>
        <p>
          By clicking &quot;<strong>retry</strong>&quot;, you:
        </p>
        <p>
          Confirm that you are the account holder and have provided accurate and
          up-to-date information;
        </p>
        <p>
          You also acknowledge that you have read and understood the{" "}
          <a
            href="https://www.transunion.co.uk/legal/privacy-centre/pc-bureau"
            target="_blank"
            className="cursor-pointer text-ui-link"
          >
            Transunion Privacy Notice
          </a>
          , which explains how your information will be used.
        </p>
      </>
    ),
    buttonText: "Retry",
  },
};
