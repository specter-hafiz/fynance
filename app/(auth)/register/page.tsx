"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/lib/validations/auth";
import { FormInput } from "@/components/forms/FormInput";
import { Checkbox } from "@/components/forms/Checkbox";
import { EmailVerificationModal } from "@/components/auth/EmailVerificationModal";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToPolicy: boolean;
  subscribeNewsletter: boolean;
}

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToPolicy: false,
    subscribeNewsletter: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof RegisterFormData];
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement
    if (!formData.agreeToPolicy) {
      newErrors.agreeToPolicy =
        "You must agree to the terms and privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      // API call to register
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     firstName: formData.firstName,
      //     lastName: formData.lastName,
      //     email: formData.email,
      //     password: formData.password,
      //     subscribeNewsletter: formData.subscribeNewsletter,
      //   }),
      // });

      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Registration failed");
      // }

      // const data = await response.json();

      // // Store access token if provided
      // if (data.accessToken) {
      //   localStorage.setItem("accessToken", data.accessToken);
      // }

      // Show email verification modal
      setShowVerificationModal(true);
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrors({
        email: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowVerificationModal(false);
    // Redirect to onboarding welcome page
    router.push("/onboarding/welcome");
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col lg:flex-row justify-between min-h-screen">
          {/* Left Side - Form */}
          <div className="flex-1 flex flex-col items-start justify-start padding py-8">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Logo />

              <button
                onClick={handleBack}
                className="inline-flex gap-2 items-center my-6 text-lightgray/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6">
                Create your account
              </h1>

              {/* Step 1: Name */}
              {step === 1 && (
                <>
                  <h2 className="text-base sm:text-lg md:text-xl font-medium mb-2">
                    What's your name?
                  </h2>
                  <p className="text-sm text-lightgray/80 mb-6">
                    We'd love to know what to call you
                  </p>

                  <form onSubmit={handleStep1Submit}>
                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                      <FormInput
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        error={errors.firstName}
                      />

                      <FormInput
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        error={errors.lastName}
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-green w-full py-3 px-12 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Continue
                    </button>

                    <p className="text-xs sm:text-sm mt-6 text-center sm:text-left">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-green hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  </form>
                </>
              )}

              {/* Step 2: Email & Password */}
              {step === 2 && (
                <>
                  <h2 className="text-base sm:text-lg md:text-xl font-medium mb-4">
                    Almost there, {formData.firstName}!
                  </h2>
                  <form onSubmit={handleStep2Submit}>
                    <div className="flex flex-col gap-6 mb-6">
                      <FormInput
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        error={errors.email}
                        disabled={isLoading}
                      />

                      <div>
                        <FormInput
                          id="password"
                          name="password"
                          label="Password"
                          type="password"
                          value={formData.password}
                          showPasswordToggle={true}
                          onChange={handleInputChange}
                          placeholder="Create a password"
                          error={errors.password}
                          disabled={isLoading}
                        />
                        <p className="text-xs text-lightgray/60 mt-2 mb-1">
                          Must have at least 8 characters and contain:
                        </p>
                        <ul className="text-xs text-lightgray/60 list-disc list-inside">
                          <li>Uppercase and lowercase letters</li>
                          <li>A number or special character</li>
                        </ul>
                      </div>

                      <FormInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        showPasswordToggle={true}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        error={errors.confirmPassword}
                        disabled={isLoading}
                      />

                      <Checkbox
                        name="agreeToPolicy"
                        checked={formData.agreeToPolicy}
                        onChange={handleInputChange}
                        error={errors.agreeToPolicy}
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-green hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-green hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Checkbox>

                      <Checkbox
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleInputChange}
                      >
                        I want to receive newsletters with tips and updates
                      </Checkbox>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green py-3 px-6 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Progress Indicator */}
          <div className="hidden lg:flex bg-lightblue/10 flex-1 flex flex-col items-center justify-center padding py-12 lg:py-8">
            <div className="max-w-lg">
              <h3 className="text-center font-medium text-base sm:text-lg mb-8">
                Just two steps to get started
              </h3>

              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="flex gap-3 items-center">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      step >= 1
                        ? "border-green bg-green/20"
                        : "border-lightgray/30"
                    }`}
                  >
                    {step > 1 ? (
                      <span className="text-green text-sm font-bold">✓</span>
                    ) : (
                      <span className="text-green text-sm font-bold">1</span>
                    )}
                  </div>
                  <p className="text-sm">Let's get acquainted</p>
                </div>

                <MoveRight className="text-lightgray/50" />

                <div className="flex gap-3 items-center">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      step >= 2
                        ? "border-green bg-green/20"
                        : "border-lightgray/30"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        step >= 2 ? "text-green" : "text-lightgray/50"
                      }`}
                    >
                      2
                    </span>
                  </div>
                  <p className="text-sm">Setup your account</p>
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full max-w-md mx-auto">
                <Image
                  src="/images/account.png"
                  alt="Account signup illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={handleModalClose}
        email={formData.email}
      />
    </>
  );
};

export default Register;
