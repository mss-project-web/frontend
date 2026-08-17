"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, {
  FileExtension,
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShapeSelector, ShapeOption } from "./ShapeSelector";
import {
  Globe,
  Brush,
  Image as ImageIcon,
  LayoutGrid,
  Plus,
  Minus,
  Loader2,
  Upload,
  Link,
  Type,
  Mail,
  Phone,
  Wifi,
  Copy,
  Check,
} from "lucide-react";

const bodyShapes: ShapeOption[] = [
  {
    id: "square",
    label: "Square",
    renderShape: () => <div className="w-5 h-5 bg-black" />,
  },
  {
    id: "dots",
    label: "Dots",
    renderShape: () => <div className="w-5 h-5 rounded-full bg-black" />,
  },
  {
    id: "rounded",
    label: "Rounded",
    renderShape: () => <div className="w-5 h-5 rounded-md bg-black" />,
  },
  {
    id: "extra-rounded",
    label: "Extra",
    renderShape: () => <div className="w-5 h-5 rounded-xl bg-black" />,
  },
  {
    id: "classy",
    label: "Classy",
    renderShape: () => (
      <div className="w-5 h-5 rounded-tl-lg rounded-br-lg bg-black" />
    ),
  },
  {
    id: "classy-rounded",
    label: "Classy R",
    renderShape: () => (
      <div className="w-5 h-5 rounded-tr-lg rounded-bl-lg bg-black" />
    ),
  },
];
const eyeFrameShapes: ShapeOption[] = [
  {
    id: "square",
    label: "Square",
    renderShape: () => <div className="w-8 h-8 border-[5px] border-black" />,
  },
  {
    id: "dot",
    label: "Dot",
    renderShape: () => (
      <div className="w-8 h-8 border-[5px] border-black rounded-full" />
    ),
  },
  {
    id: "extra-rounded",
    label: "Extra",
    renderShape: () => (
      <div className="w-8 h-8 border-[5px] border-black rounded-xl" />
    ),
  },
];
const eyeBallShapes: ShapeOption[] = [
  {
    id: "square",
    label: "Square",
    renderShape: () => <div className="w-4 h-4 bg-black" />,
  },
  {
    id: "dot",
    label: "Dot",
    renderShape: () => <div className="w-4 h-4 bg-black rounded-full" />,
  },
];

type ContentType = "url" | "text" | "email" | "phone" | "wifi";
const contentTypes: {
  id: ContentType;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { id: "url", label: "URL", icon: Link },
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "wifi", label: "WiFi", icon: Wifi },
];

function buildQRData(
  type: ContentType,
  fields: Record<string, string>,
): string {
  switch (type) {
    case "url":
      return fields.url || "";
    case "text":
      return fields.text || "";
    case "email": {
      const params: string[] = [];
      if (fields.subject)
        params.push(`subject=${encodeURIComponent(fields.subject)}`);
      if (fields.body) params.push(`body=${encodeURIComponent(fields.body)}`);
      return `mailto:${fields.email || ""}${params.length ? "?" + params.join("&") : ""}`;
    }
    case "phone":
      return `tel:${fields.phone || ""}`;
    case "wifi":
      return `WIFI:T:${fields.security || "WPA"};S:${fields.ssid || ""};P:${fields.password || ""};;`;
    default:
      return "";
  }
}

const qrCode = useRef<any>(null);
const getPNGBlob = async (): Promise<Blob | null> => {
  if (!qrCode.current) return null;

  const rawData = await qrCode.current.getRawData("png");

  if (!rawData) return null;

  if (rawData instanceof Blob) {
    return rawData;
  }

  return new Blob([rawData], { type: "image/png" });
};

export default function QRCodeGenerator() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  const [openPanels, setOpenPanels] = useState<{ [key: string]: boolean }>({
    content: true,
    colors: false,
    logo: false,
    design: false,
  });
  const togglePanel = (panel: string) =>
    setOpenPanels((prev) => ({ ...prev, [panel]: !prev[panel] }));

  const [contentType, setContentType] = useState<ContentType>("url");
  const [fields, setFields] = useState<Record<string, string>>({
    url: "",
    text: "",
    email: "",
    subject: "",
    body: "",
    phone: "",
    ssid: "",
    password: "",
    security: "WPA",
  });
  const setField = (key: string, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const [dotsColor, setDotsColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [isBgTransparent, setIsBgTransparent] = useState<boolean>(false);
  const [markerBorderColor, setMarkerBorderColor] = useState<string>("#000000");
  const [markerCenterColor, setMarkerCenterColor] = useState<string>("#000000");
  const [isGradient, setIsGradient] = useState<boolean>(false);
  const [gradientColor1, setGradientColor1] = useState<string>("#000000");
  const [gradientColor2, setGradientColor2] = useState<string>("#1588c9");
  const [gradientType, setGradientType] = useState<string>("linear");
  const [customEyeColor, setCustomEyeColor] = useState<boolean>(false);

  const [dotsType, setDotsType] = useState<DotType>("square");
  const [cornersSquareType, setCornersSquareType] =
    useState<CornerSquareType>("square");
  const [cornersDotType, setCornersDotType] = useState<CornerDotType>("square");

  const [logoImage, setLogoImage] = useState<string>("");
  const [logoSize, setLogoSize] = useState<number>(0.4);
  const [resolution, setResolution] = useState<number>(1000);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 1000,
      height: 1000,
      margin: 20,
      type: "svg",
      data: "https://msspsuhatyai.org",
      dotsOptions: { color: "#000000", type: "square" },
      backgroundOptions: { color: "#ffffff" },
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
    });
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }
  }, []);

  const generateQRCode = () => {
    if (!qrCode.current) return;
    const qrData = buildQRData(contentType, fields);
    if (!qrData.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const gradientObj = isGradient
        ? {
            type: gradientType as "linear" | "radial",
            rotation: gradientType === "linear" ? Math.PI / 2 : 0,
            colorStops: [
              { offset: 0, color: gradientColor1 },
              { offset: 1, color: gradientColor2 },
            ],
          }
        : undefined;
      qrCode.current?.update({
        width: resolution,
        height: resolution,
        margin: 20,
        data: qrData,
        image: logoImage,
        dotsOptions: {
          type: dotsType,
          ...(isGradient ? { gradient: gradientObj } : { color: dotsColor }),
        },
        backgroundOptions: {
          color: isBgTransparent ? "transparent" : backgroundColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: logoSize,
        },
        cornersSquareOptions: {
          type: cornersSquareType,
          ...(customEyeColor
            ? { color: markerBorderColor }
            : isGradient
              ? { gradient: gradientObj }
              : { color: dotsColor }),
        },
        cornersDotOptions: {
          type: cornersDotType,
          ...(customEyeColor
            ? { color: markerCenterColor }
            : isGradient
              ? { gradient: gradientObj }
              : { color: dotsColor }),
        },
      });
      setIsGenerating(false);
      setHasGenerated(true);
    }, 400);
  };

  const handleCopyImage = async () => {
    if (!qrCode.current) return;

    try {
      const blob = await getPNGBlob();

      if (!blob) return;

      const item = new ClipboardItem({
        "image/png": blob,
      });

      await navigator.clipboard.write([item]);

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy image to clipboard", error);

      alert(
        "ไม่สามารถคัดลอกรูปภาพได้ เบราว์เซอร์ของคุณอาจไม่รองรับ หรือต้องใช้งานผ่าน HTTPS",
      );
    }
  };

  const handleDownload = async (ext: string) => {
    if (!qrCode.current) return;
    if (ext === "pdf") {
      const blob = await getPNGBlob();

      if (!blob) return;

      const { jsPDF } = await import("jspdf");

      const reader = new FileReader();

      reader.onload = () => {
        const b64 = reader.result as string;

        const doc = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [resolution, resolution],
        });

        doc.addImage(b64, "PNG", 0, 0, resolution, resolution);

        doc.save("mss-qr-code.pdf");
      };

      reader.readAsDataURL(blob);
      return;
    }
    if (ext === "jpg") {
      qrCode.current.download({ extension: "jpeg", name: "mss-qr-code" });
      return;
    }
    qrCode.current.download({
      extension: ext as FileExtension,
      name: "mss-qr-code",
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target && typeof ev.target.result === "string")
          setLogoImage(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const ColorPicker = ({
    value,
    onChange,
    disabled = false,
  }: {
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
  }) => (
    <div className="flex items-center gap-2">
      <div
        className={`border border-gray-300 p-0.5 rounded-sm w-10 h-10 ${disabled ? "opacity-40" : "bg-white"}`}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full h-full p-0 border-0 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-10 rounded-sm uppercase w-28 border-gray-300 bg-gray-50 disabled:opacity-50"
      />
    </div>
  );

  const AccordionHeader = ({
    id,
    title,
    icon: Icon,
  }: {
    id: string;
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }) => {
    const isOpen = openPanels[id];
    return (
      <button
        onClick={() => togglePanel(id)}
        className={`w-full flex items-center justify-between border-b ${isOpen ? "bg-[#1588c9] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
      >
        <div className="flex items-center">
          <div
            className={`p-4 flex items-center justify-center ${isOpen ? "bg-[#1176b0]" : "text-gray-500"}`}
          >
            <Icon size={20} className={isOpen ? "text-white" : ""} />
          </div>
          <span className="font-semibold text-sm tracking-wide ml-3 uppercase">
            {title}
          </span>
        </div>
        <div className="pr-5">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md flex flex-col lg:flex-row overflow-hidden border border-gray-200">
        {/* Left: Controls */}
        <div className="flex-1 flex flex-col border-r border-gray-200">
          {/* ENTER CONTENT */}
          <div className="flex flex-col">
            <AccordionHeader id="content" title="ENTER CONTENT" icon={Globe} />
            {openPanels.content && (
              <div className="p-5 bg-white border-b border-gray-100 space-y-4">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  {contentTypes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setContentType(id)}
                      className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-md text-[10px] font-semibold uppercase transition-all ${contentType === id ? "bg-white text-[#1588c9] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {contentType === "url" && (
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-500 uppercase">
                        Your URL
                      </Label>
                      <Input
                        id="qr-url"
                        value={fields.url}
                        onChange={(e) => setField("url", e.target.value)}
                        placeholder="https://example.com"
                        className="h-10 rounded border-gray-300"
                      />
                    </div>
                  )}
                  {contentType === "text" && (
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-500 uppercase">
                        Text
                      </Label>
                      <textarea
                        value={fields.text}
                        onChange={(e) => setField("text", e.target.value)}
                        placeholder="Enter your text here..."
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1588c9]/40"
                      />
                    </div>
                  )}
                  {contentType === "email" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-500 uppercase">
                          Email Address
                        </Label>
                        <Input
                          value={fields.email}
                          onChange={(e) => setField("email", e.target.value)}
                          placeholder="example@email.com"
                          className="h-10 rounded border-gray-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-500 uppercase">
                          Subject (optional)
                        </Label>
                        <Input
                          value={fields.subject}
                          onChange={(e) => setField("subject", e.target.value)}
                          placeholder="Subject"
                          className="h-10 rounded border-gray-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-500 uppercase">
                          Body (optional)
                        </Label>
                        <textarea
                          value={fields.body}
                          onChange={(e) => setField("body", e.target.value)}
                          placeholder="Message body..."
                          rows={2}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1588c9]/40"
                        />
                      </div>
                    </>
                  )}
                  {contentType === "phone" && (
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-gray-500 uppercase">
                        Phone Number
                      </Label>
                      <Input
                        value={fields.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="+66812345678"
                        className="h-10 rounded border-gray-300"
                      />
                    </div>
                  )}
                  {contentType === "wifi" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-500 uppercase">
                          Network Name (SSID)
                        </Label>
                        <Input
                          value={fields.ssid}
                          onChange={(e) => setField("ssid", e.target.value)}
                          placeholder="MyWiFiNetwork"
                          className="h-10 rounded border-gray-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-500 uppercase">
                          Password
                        </Label>
                        <Input
                          value={fields.password}
                          onChange={(e) => setField("password", e.target.value)}
                          placeholder="Password"
                          type="password"
                          className="h-10 rounded border-gray-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-500 uppercase">
                          Security
                        </Label>
                        <div className="flex gap-3">
                          {["WPA", "WEP", "nopass"].map((s) => (
                            <label
                              key={s}
                              className="flex items-center gap-1.5 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="wifi-security"
                                checked={fields.security === s}
                                onChange={() => setField("security", s)}
                                className="accent-[#1588c9]"
                              />
                              <span className="text-sm text-gray-600">{s}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SET COLORS */}
          <div className="flex flex-col">
            <AccordionHeader id="colors" title="SET COLORS" icon={Brush} />
            {openPanels.colors && (
              <div className="p-6 bg-white border-b border-gray-100 space-y-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="colorType"
                      checked={!isGradient}
                      onChange={() => setIsGradient(false)}
                      className="accent-[#1588c9]"
                    />
                    <span className="text-sm text-gray-600">Single Color</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="colorType"
                      checked={isGradient}
                      onChange={() => setIsGradient(true)}
                      className="accent-[#1588c9]"
                    />
                    <span className="text-sm text-gray-600">
                      Color Gradient
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customEyeColor}
                      onChange={(e) => setCustomEyeColor(e.target.checked)}
                      className="accent-[#1588c9]"
                    />
                    <span className="text-sm text-gray-600">
                      Custom Eye Color
                    </span>
                  </label>
                </div>
                <div className="flex gap-8 flex-wrap">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-gray-500 uppercase">
                      Foreground Color
                    </Label>
                    {!isGradient ? (
                      <ColorPicker value={dotsColor} onChange={setDotsColor} />
                    ) : (
                      <div className="flex flex-col gap-2">
                        <ColorPicker
                          value={gradientColor1}
                          onChange={setGradientColor1}
                        />
                        <ColorPicker
                          value={gradientColor2}
                          onChange={setGradientColor2}
                        />
                        <div className="flex items-center gap-4 mt-1">
                          {["linear", "radial"].map((t) => (
                            <label
                              key={t}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="gradientType"
                                checked={gradientType === t}
                                onChange={() => setGradientType(t)}
                                className="accent-[#1588c9]"
                              />
                              <span className="text-xs text-gray-600 capitalize">
                                {t}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-gray-500 uppercase">
                      Background Color
                    </Label>
                    <div className="flex flex-col gap-2">
                      <ColorPicker
                        value={backgroundColor}
                        onChange={setBackgroundColor}
                        disabled={isBgTransparent}
                      />
                      <label className="flex items-center gap-2 mt-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isBgTransparent}
                          onChange={(e) => setIsBgTransparent(e.target.checked)}
                          className="accent-[#1588c9]"
                        />
                        <span className="text-xs text-gray-600">
                          Transparent
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {customEyeColor && (
                  <div className="flex gap-8 pt-4 border-t border-gray-100 flex-wrap">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-gray-500 uppercase">
                        Eye Frame Color
                      </Label>
                      <ColorPicker
                        value={markerBorderColor}
                        onChange={setMarkerBorderColor}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-gray-500 uppercase">
                        Eye Ball Color
                      </Label>
                      <ColorPicker
                        value={markerCenterColor}
                        onChange={setMarkerCenterColor}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ADD LOGO IMAGE */}
          <div className="flex flex-col">
            <AccordionHeader
              id="logo"
              title="ADD LOGO IMAGE"
              icon={ImageIcon}
            />
            {openPanels.logo && (
              <div className="p-6 bg-white border-b border-gray-100 space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-semibold uppercase shrink-0">
                    {logoImage ? (
                      <img
                        src={logoImage}
                        className="max-w-full max-h-full p-1 object-contain"
                        alt="Logo"
                      />
                    ) : (
                      "NO LOGO"
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-[#1588c9] hover:bg-[#1176b0] text-white rounded-sm h-10 px-6 font-semibold flex items-center gap-2"
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
                    >
                      <Upload className="w-4 h-4" /> Upload Image
                    </Button>
                    {logoImage && (
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-sm h-8"
                        onClick={() => setLogoImage("")}
                      >
                        Remove Logo
                      </Button>
                    )}
                    <input
                      id="logo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <Label className="text-xs font-semibold text-gray-500 uppercase">
                    Logo Size
                  </Label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.7"
                    step="0.05"
                    value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[#1588c9]"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 font-semibold uppercase">
                    <span>Small</span>
                    <span className="text-gray-600">
                      {Math.round(logoSize * 100)}%
                    </span>
                    <span>Large</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CUSTOMIZE DESIGN */}
          <div className="flex flex-col flex-1">
            <AccordionHeader
              id="design"
              title="CUSTOMIZE DESIGN"
              icon={LayoutGrid}
            />
            {openPanels.design && (
              <div className="p-6 bg-white space-y-8 flex-1">
                <ShapeSelector
                  label="Body Shape"
                  options={bodyShapes}
                  value={dotsType}
                  onChange={(v) => setDotsType(v as DotType)}
                />
                <ShapeSelector
                  label="Eye Frame Shape"
                  options={eyeFrameShapes}
                  value={cornersSquareType}
                  onChange={(v) => setCornersSquareType(v as CornerSquareType)}
                />
                <ShapeSelector
                  label="Eye Ball Shape"
                  options={eyeBallShapes}
                  value={cornersDotType}
                  onChange={(v) => setCornersDotType(v as CornerDotType)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview & Download */}
        <div className="w-full lg:w-[400px] bg-white p-8 flex flex-col items-center border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="relative w-full aspect-square mb-8">
            {isGenerating && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-3">
                <Loader2 className="w-10 h-10 text-[#1588c9] animate-spin" />
                <span className="text-sm text-gray-500 font-medium">
                  Generating QR Code...
                </span>
              </div>
            )}
            <div
              className="w-full h-full border border-gray-100 overflow-hidden [&>svg]:!w-full [&>svg]:!h-full [&>canvas]:!w-full [&>canvas]:!h-full"
              ref={qrRef}
            />
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={resolution}
                onChange={(e) => setResolution(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#1588c9]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-semibold uppercase">
                <span>Low Quality</span>
                <span className="text-gray-600">
                  {resolution} x {resolution} Px
                </span>
                <span>High Quality</span>
              </div>
            </div>

            <Button
              className="w-full bg-[#75b936] hover:bg-[#68a530] text-white rounded h-12 font-bold shadow-none disabled:opacity-70"
              onClick={generateQRCode}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" /> Generating...
                </span>
              ) : (
                "Create QR Code"
              )}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                className="bg-[#1588c9] hover:bg-[#1176b0] text-white rounded h-11 font-bold shadow-none disabled:opacity-50"
                onClick={() => handleDownload("png")}
                disabled={!hasGenerated || isGenerating}
              >
                Download PNG
              </Button>
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded h-11 font-bold shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={handleCopyImage}
                disabled={!hasGenerated || isGenerating}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Image
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "JPG", ext: "jpg" },
                { label: "SVG", ext: "svg" },
                { label: "PDF", ext: "pdf" },
              ].map(({ label, ext }) => (
                <Button
                  key={ext}
                  variant="outline"
                  className="border-[#1588c9] text-[#1588c9] hover:bg-[#1588c9] hover:text-white rounded-sm h-9 text-xs font-semibold disabled:opacity-50"
                  onClick={() => handleDownload(ext)}
                  disabled={!hasGenerated || isGenerating}
                >
                  .{label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
