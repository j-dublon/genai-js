"use client";

import { Button } from "@react-component-library/ui";
import { mockAddressLookupResponse } from "@store/mockData";
import useJoinFlowStore, { Address } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Stepper from "@/components/molecules/Stepper";

const PersonalDetails = () => {
  const router = useRouter();
  const { setPersonalDetails, personalDetails, setCurrentStep } =
    useJoinFlowStore();

  const [formData, setFormData] = useState({
    firstName: personalDetails?.firstName || "",
    lastName: personalDetails?.lastName || "",
    email: personalDetails?.email || "",
    phone: personalDetails?.phone || "",
    postcode: personalDetails?.address?.postcode || "",
  });

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >(personalDetails?.selectedAddressId);
  const [showAddresses, setShowAddresses] = useState(false);
  const [addressWarning, setAddressWarning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindAddress = () => {
    setAddressWarning(false);
    setTimeout(() => {
      setAddresses(mockAddressLookupResponse.addresses);
      setShowAddresses(true);
    }, 500);
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    setAddressWarning(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId && showAddresses) {
      setAddressWarning(true);
      return;
    }

    const selectedAddress = addresses.find(
      (addr) => addr.addressKey === selectedAddressId,
    );

    if (selectedAddress) {
      setPersonalDetails({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: selectedAddress,
        selectedAddressId,
      });

      setCurrentStep(2);
      router.push("/join-flow/eero-selection");
    }
  };

  const handleBack = () => {
    setCurrentStep(0);
    router.push("/join-flow");
  };

  const handleContinueClick = () => {
    if (showAddresses && !selectedAddressId) {
      setAddressWarning(true);
      return;
    }

    const form = document.querySelector("form");
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Stepper />

      <div className="max-w-2xl mx-auto p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Personal Details</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2" htmlFor="postcode">
              Postcode
            </label>
            <div className="flex">
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
                required
              />
              <Button
                onClick={handleFindAddress}
                tint="white"
                variant="outline"
                className="rounded-l-none"
              >
                Find Address
              </Button>
            </div>
          </div>
          {addressWarning && (
            <div className="mb-6 p-4 text-core-red rounded-md">
              Please select an address before continuing.
            </div>
          )}
          {showAddresses && (
            <div className="mb-6">
              <label className="block mb-2">Select Your Address</label>
              <div className="border rounded-md divide-y">
                {addresses.map((address) => (
                  <div
                    key={address.addressKey}
                    className={`p-3 cursor-pointer ${
                      selectedAddressId === address.addressKey
                        ? "bg-core-yellow"
                        : ""
                    }`}
                    onClick={() => handleSelectAddress(address.addressKey)}
                  >
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    {address.line3 && <p>{address.line3}</p>}
                    <p>{address.postcode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} tint="white" variant="outline">
              Back
            </Button>

            <Button onClick={handleContinueClick} tint="yellow" variant="solid">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
