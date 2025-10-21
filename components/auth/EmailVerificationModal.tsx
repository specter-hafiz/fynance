"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function EmailVerificationModal({
  isOpen,
  onClose,
  email,
}: EmailVerificationModalProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend email");
      }

      setResendSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (err: unknown) {
      setResendError(
        (err as Error).message || "Failed to resend email. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
          {/* Close Button */}
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-sm md:text-lg lg:text-xl">
              Email confirmation
            </h2>
            <button
              onClick={onClose}
              className="text-gray hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Icon */}
          <div className="relative w-full h-48 flex justify-center my-6">
            <Image
              src="/images/email.png"
              alt="Email Verification"
              fill
              className="object-contain"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray text-sm leading-relaxed">
              We&lsquo;ve sent an email{" "}
              <span className="text-green font-semibold text-sm">{email}</span>{" "}
              to confirm validity of your email address.
            </p>
            <p className="text-gray text-sm mt-3 leading-relaxed">
              Check your inbox and follow the link to complete your
              registration.
            </p>
          </div>

          {/* Success/Error Messages */}
          {resendSuccess && (
            <div className="bg-green/10 border border-green text-green px-4 py-3 rounded-lg text-sm mb-4">
              ✓ Verification email sent successfully!
            </div>
          )}

          {resendError && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-4">
              {resendError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              className="w-full bg-green text-black font-medium py-3 px-6 rounded-full hover:bg-input hover:opacity-90 transition-all flex items-center justify-center gap-2"
              href="/login"
            >
              Back to Login
            </Link>
          </div>

          {/* Helper Text */}
          <div className="mt-6 text-center flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-darkgray">
              Didn&lsquo;t receive any email?{" "}
            </p>
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="text-lightgray/80 text-xs hover:text-green underline transition-colors disabled:opacity-50"
            >
              Resend confirmation email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
