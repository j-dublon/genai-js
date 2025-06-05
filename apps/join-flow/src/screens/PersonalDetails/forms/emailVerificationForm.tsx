import { TipCard } from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import { useEffect, useRef, useState } from "react";

import { getAssetPath } from "@/lib/get-asset-path";

import { TextInput } from "../components/textInput";
import { EmailVerificationFormProps } from "./formValues";

const NUM_FIELDS = 6;

export const EmailVerificationForm = ({
  verificationSection,
  isVerified = false,
  isCodeValid,
  onVerificationSuccess,
  currentEmail,
  handleBack,
  validateCode,
  handleCodeChange,
}: EmailVerificationFormProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [code, setCode] = useState<string[]>(Array(NUM_FIELDS).fill(""));

  // Skip this page if already verified
  useEffect(() => {
    if (isVerified && onVerificationSuccess) {
      onVerificationSuccess();
    }
  }, [isVerified, onVerificationSuccess]);

  useEffect(() => {
    const joinedCode = code.join("");
    const lastFilledIndex = code.findIndex((char) => char === "") - 1;
    const indexToPass = lastFilledIndex >= 0 ? lastFilledIndex : NUM_FIELDS - 1;

    handleCodeChange(joinedCode, indexToPass);

    if (joinedCode.length === NUM_FIELDS && !code.includes("")) {
      validateCode(joinedCode);
    }
  }, [code, handleCodeChange, validateCode]);

  const handleInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value.toUpperCase();

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < NUM_FIELDS - 1) {
      inputRefs.current[index + 1]?.focus();
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
    const handlePaste = (ev: ClipboardEvent) => {
      if ((ev.target as HTMLElement).localName !== "input") return;
      ev.preventDefault();

      let paste = ev.clipboardData?.getData("text") || "";
      paste = paste.toUpperCase().replace(/[^A-Z0-9]/g, "");

      if (paste.length !== NUM_FIELDS) return;

      const pasteArray = paste.split("");
      setCode(pasteArray);

      inputRefs.current[NUM_FIELDS - 1]?.focus();

      validateCode(paste);
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [validateCode]);

  return (
    <div>
      <h2 className="text-md font-bold mb-6">{verificationSection.title}</h2>
      <p className="text-md mb-6">{verificationSection.description}</p>
      <TipCard
        image={{
          src: getAssetPath("/images/envelope.svg"),
          alt: "Envelope icon",
        }}
        className="mt-10 md:mt-0 mb-10 md:mb-6 bg-secondary-green justify-center md:w-full items-center"
      >
        <span>
          {verificationSection.tipCardText}{" "}
          <span className="font-medium">{currentEmail}</span>. Also, here’s our{" "}
          <a href="" className="text-ui-link">
            Privacy Notice.
          </a>
        </span>
      </TipCard>
      <div className="mb-6">
        <p className="font-semibold mb-6">
          {verificationSection.inputLabelText}
        </p>
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
      <div className="flex gap-2 mb-6">
        <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
        {isCodeValid ? (
          <span>Lovely – that&apos;s just the code we&apos;re after</span>
        ) : (
          <span>
            You should receive your code within 2 minutes.{" "}
            <a href="" className="text-ui-link underline font-medium">
              Resend
            </a>
          </span>
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
        I want to use a different email address
      </button>
    </div>
  );
};
