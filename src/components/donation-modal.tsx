"use client";

import { useState, useEffect, useCallback } from "react";
import { X, HeartHandshake, Check, Copy } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { useSettings } from "@/hooks/useSettings";
import { useClickTracking } from "@/hooks/use-click-tracking";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { settings } = useSettings();
  const { trackEvent } = useClickTracking();

  const bank = settings?.donation?.bankName || CONTACT.bank;
  const accountName = settings?.donation?.accountName || CONTACT.accountName;
  const accountNumber = settings?.donation?.accountNumber || CONTACT.accountNumber;
  const qrImage = settings?.donation?.qrImage || "/qr-promptpay-mss.jpg";

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const copyAccountNumber = () => {
    trackEvent("copy_account_number");
    navigator.clipboard.writeText(accountNumber).then(
      () => setIsCopied(true),
      () => console.error("Failed to copy account number")
    );
  };

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4"
      onClick={handleBackdropClick}
    >
      <div
        className="modal-content bg-white rounded-t-2xl rounded-b-none sm:rounded-2xl shadow-2xl w-full sm:max-w-sm p-6 relative animate-in slide-in-from-bottom duration-300 sm:slide-in-from-bottom-4 sm:fade-in-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xl font-bold text-center text-gray-800 mb-6 flex flex-col items-center gap-2 mt-2">
          สนับสนุนการทำงานของชมรม
        </div>

        <div className="flex flex-col items-center">
          {/* QR Code */}
          <div className="w-48 h-48 mb-6 p-2 bg-white rounded-xl border border-gray-100 shadow-sm relative">
            <Image
              src={qrImage}
              alt="QR พร้อมเพย์"
              fill
              className="rounded-lg object-contain p-2"
            />
          </div>

          {/* Details */}
          <div className="w-full space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">ธนาคาร</span>
              <span className="font-semibold text-gray-800">{bank}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">ชื่อบัญชี</span>
              <span className="font-semibold text-gray-800">{accountName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">เลขบัญชี</span>
              <span className="font-bold text-blue-600 text-base">
                {accountNumber}
              </span>
            </div>
          </div>

          {/* Copy Button */}
          <Button
            onClick={copyAccountNumber}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-medium transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                คัดลอกสำเร็จ
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                คัดลอกเลขบัญชี
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
