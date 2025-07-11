"use client";
import {
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";

import { ErrorHeading } from "./components/ErrorHeading";
import { ErrorParagraph } from "./components/ErrorParagraph";
import { ErrorWrapper } from "./components/ErrorWrapper";
import { ContractRetrievalFailedProps } from "./ContractRetrievalFailedProps";

export const ContractRetrievalFailed = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};
  const { heading, paragraphs } = ContractRetrievalFailedProps;

  const errorParagraphs = paragraphs.map((value, index) => (
    <ErrorParagraph key={index}>{value}</ErrorParagraph>
  ));

  return (
    <ErrorWrapper>
      <ErrorHeading heading={heading} />
      {errorParagraphs}

      {trustScore && (
        <div className="mt-6 md:mt-12">
          <TrustpilotHorizontal
            trustScore={trustScore}
            numberOfReviews={numberOfReviews}
            className="align-self-center"
          />
        </div>
      )}
    </ErrorWrapper>
  );
};
