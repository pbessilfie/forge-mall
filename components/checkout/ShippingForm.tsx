"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import SortDropdown from "@/components/ui/sort-dropdown";

export interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ShippingFormProps {
  onSubmit?: (data: ShippingFormData) => void;
  className?: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingFormData>>({});

  const countryOptions = [
    { label: "United States", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "United Kingdom", value: "UK" },
    { label: "Australia", value: "AU" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Italy", value: "IT" },
    { label: "Spain", value: "ES" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ShippingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
    // Clear error when user selects country
    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ShippingFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit?.(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      <h2 className="text-xl md:text-2xl font-bold text-black mb-5">
        Shipping Information
      </h2>

      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          error={!!errors.firstName}
          errorMessage={errors.firstName}
        />
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          error={!!errors.lastName}
          errorMessage={errors.lastName}
        />
      </div>

      {/* Email */}
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        error={!!errors.email}
        errorMessage={errors.email}
      />

      {/* Phone */}
      <Input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        error={!!errors.phone}
        errorMessage={errors.phone}
      />

      {/* Address */}
      <Input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Street Address"
        error={!!errors.address}
        errorMessage={errors.address}
      />

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          error={!!errors.city}
          errorMessage={errors.city}
        />
        <Input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          error={!!errors.state}
          errorMessage={errors.state}
        />
        <Input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="ZIP Code"
          error={!!errors.zipCode}
          errorMessage={errors.zipCode}
        />
      </div>

      {/* Country */}
      <div>
        <SortDropdown
          options={countryOptions}
          value={formData.country}
          onValueChange={handleCountryChange}
          placeholder="Select Country"
          className={cn("w-full border border-black/10 focus:border-black/30", errors.country && "border-red-500")}
        />
        {errors.country && (
          <p className="text-red-600 text-xs mt-1">{errors.country}</p>
        )}
      </div>
    </form>
  );
};

export default ShippingForm;
