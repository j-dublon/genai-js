import { useRouter } from "next/navigation";
import { useState } from "react";

export const usePostcode = () => {
  const router = useRouter();
  const [postcode, setPostcode] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPostcode = postcode.trim();

    if (!trimmedPostcode) {
      router.push("/join/find-your-address");
    } else {
      const encodedInput = encodeURIComponent(trimmedPostcode).replace(
        /%20/g,
        "+",
      );
      router.push(`/join/choose-your-address?postcode=${encodedInput}`);
    }
  };

  return { handleFormSubmit, postcode, setPostcode };
};
