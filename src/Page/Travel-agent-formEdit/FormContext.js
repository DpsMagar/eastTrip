// FormContext.js
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    basic: {
      stayType: "",
      propertyName: "",
      rating: "",
      builtYear: "",
      startedYear: "",
      email: "",
      mobile: "",
      imageUrl: "",
    },
    amenities: {
      airConditioning: "",
      laundry: "",
      newspaper: "",
      parking: "",
      roomService: "",
      lounge: "",
      restaurant: "",
      fireExtinguishers: "",
      cctv: "",
      childcareService: "",
      petService: "",
      securityGuard: "",
      healthService: "",
      swimmingPool: "",
      tv: "",
      spa: "",
    },
    location: {
      province: "",
      district: "",
      attraction: "",
      postalCode: "",
      areaName: "",
      buildingNumber: "",
      totalRooms: "",
      pricingStart: "",
    },
  });

  const [errors, setErrors] = useState({});

  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear error when field is updated
    if (errors[section]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: undefined,
        },
      }));
    }
  };

  const validateSection = (section) => {
    const sectionErrors = {};
    const sectionData = formData[section];

    Object.keys(sectionData).forEach((field) => {
      if (!sectionData[field]) {
        sectionErrors[field] = "This field is required";
      }
    });

    setErrors((prev) => ({
      ...prev,
      [section]: sectionErrors,
    }));

    return Object.keys(sectionErrors).length === 0;
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, errors, validateSection }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);