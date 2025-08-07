import {
  AccessibleLoadingEgg,
  PhoneTextContent,
  TipCard,
} from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import { useEffect, useRef, useState } from "react";

import { TextInput } from "@/components/TextInput";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import { getAssetPath } from "@/lib/get-asset-path";

import { EmailVerificationFormProps } from "./formValues";

const NUM_FIELDS = 6;

export const EmailVerificationForm = ({
  verificationSection,
  isVerified = false,
  isCodeValid,
  onVerificationSuccess,
  currentEmail,
  handleBack,
  handleCodeChange,
  handleResendCode,
  userVerificationErrorMessage,
  emailCodeLoading,
  validationAttempts = 0,
}: EmailVerificationFormProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const scrollToTop = useScrollToElement("#personalDetailsContainer");
  const [code, setCode] = useState<string[]>(Array(NUM_FIELDS).fill(""));

  const {
    title,
    description,
    tipCardText,
    inputLabelText,
    loadingText,
    codeSentText,
    validCodeText,
    errorCardText,
    resendButtonText,
    changeEmailText,
  } = verificationSection;

  useEffect(() => {
    scrollToTop();
  }, []);

  // Skip this page if already verified
  useEffect(() => {
    if (isVerified && onVerificationSuccess) {
      onVerificationSuccess();
    }
  }, [isVerified, onVerificationSuccess]);

  const handleInput = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < NUM_FIELDS - 1) {
      inputRefs.current[index + 1]?.focus();
    } else {
      const joinedCode = newCode.join("");
      const lastFilledIndex = newCode.findIndex((char) => char === "") - 1;
      const indexToPass =
        lastFilledIndex >= 0 ? lastFilledIndex : NUM_FIELDS - 1;

      if (joinedCode.length === NUM_FIELDS && !newCode.includes("")) {
        handleCodeChange(joinedCode, indexToPass);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }

      event.preventDefault();
    }
  };

  useEffect(() => {
    const handlePaste = async (ev: ClipboardEvent) => {
      if ((ev.target as HTMLElement).localName !== "input") return;
      ev.preventDefault();

      let paste = ev.clipboardData?.getData("text") || "";
      paste = paste.replace(/[^a-z0-9]/gi, "");

      if (paste.length !== NUM_FIELDS) return;

      const pasteArray = paste.split("");
      setCode(pasteArray);

      inputRefs.current[NUM_FIELDS - 1]?.focus();

      handleCodeChange(paste, NUM_FIELDS - 1);
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handleCodeChange]);

  const handleResendCodeWrapper = () => {
    setCode(Array(NUM_FIELDS).fill(""));
    handleResendCode();
  };

  return (
    <div>
      {errorCardText && validationAttempts > 3 && !isCodeValid && (
        <TipCard
          image={getAssetPath("/images/stop-hand.svg")}
          backgroundColor="peach"
          className="mt-10 md:mt-0 mb-10 md:mb-6 justify-center md:w-full items-center"
          textStyling="font-semibold"
          hideImageOnMobile
        >
          <PhoneTextContent text={errorCardText} className="text-ui-link" />
        </TipCard>
      )}
      <h2 className="text-md font-bold mb-6">{title}</h2>
      <p className="text-md mb-6">{description}</p>
      <TipCard
        image={getAssetPath("/images/envelope.svg")}
        backgroundColor="green"
        className="mt-10 md:mt-0 mb-10 md:mb-6 justify-center md:w-full items-center"
        hideImageOnMobile
      >
        <span>
          {tipCardText} <span className="font-medium">{currentEmail}</span>.
          Also, here’s our{" "}
          <a href="" className="text-ui-link">
            Privacy Notice.
          </a>
        </span>
      </TipCard>
      <div className="mb-6">
        <p className="font-semibold mb-6">{inputLabelText}</p>
        <div className="flex gap-2 md:gap-4">
          {[...Array(NUM_FIELDS)].map((_, idx) => (
            <TextInput
              key={idx}
              type="text"
              maxLength={1}
              className="w-12 md:w-20 h-10 md:h-15 rounded-sm md:rounded-lg text-center"
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              value={code[idx]}
              onChange={(event) => handleInput(idx, event)}
              onKeyDown={(event) => handleKeyDown(idx, event)}
              id={String(idx)}
              aria-invalid={isCodeValid === false}
              autoComplete="off"
              hasSubmitted={isCodeValid !== undefined}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap mb-6 items-center gap-2">
        {emailCodeLoading && <AccessibleLoadingEgg height={22} />}
        {!userVerificationErrorMessage && !emailCodeLoading && (
          <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
        )}
        <span
          className={
            userVerificationErrorMessage && !emailCodeLoading
              ? "text-ui-error"
              : ""
          }
        >
          {emailCodeLoading
            ? loadingText
            : isCodeValid
              ? validCodeText
              : userVerificationErrorMessage
                ? userVerificationErrorMessage
                : codeSentText}
        </span>
        {!emailCodeLoading && !isCodeValid && (
          <button
            type="button"
            onClick={handleResendCodeWrapper}
            className="text-ui-link underline font-medium cursor-pointer"
          >
            {resendButtonText}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleBack();
        }}
        className="leading-[1.6] underline font-medium cursor-pointer text-ui-link"
      >
        {changeEmailText}
      </button>
    </div>
  );
};
