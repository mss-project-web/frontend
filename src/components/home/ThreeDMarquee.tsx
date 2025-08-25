"use client";

import { motion } from "framer-motion";
import React, { memo } from "react";

export interface MarqueeImage {
  src: string;
  alt: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  onImageClick?: (image: MarqueeImage, index: number) => void;
  imageWidth?: number;
  imageHeight?: number;
}

// Main Component - Memoized for performance
const ThreeDMarqueeComponent: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  onImageClick,
}) => {
  // Divide images into 4 groups
  const groupSize = Math.ceil(images.length / 4);
  const imageGroups = Array.from({ length: 4 }, (_, index) =>
    images.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

return (
      <section
      className={
        'mx-auto block h-[700px] overflow-hidden rounded-none max-sm:h-[500px] bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 shadow-2xl shadow-blue-200/50 dark:shadow-blue-900/50 border border-blue-200/30 dark:border-blue-800/30 ' +
        className
      }
    >
      <div className="flex w-full h-full items-center justify-center relative">
        <div className="w-[1520px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: 'rotateX(55deg) rotateY(0deg) rotateZ(45deg)',
            }}
            className="relative grid w-full h-full origin-center grid-cols-4 gap-6 transform-3d place-items-center"
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={'column-' + idx}
                animate={{ y: idx % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: idx % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="flex flex-col items-center gap-6"
              >
                <VerticalGridLine extraStyles="-left-4" spacing="80px" />
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;
  
                  return (
                    <div key={'img-' + imgIdx} className="relative">
                      <HorizontalGridLine extraStyles="-top-4" spacing="20px" />
                      <motion.img
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        src={image.src}
                        alt={image.alt}
                        width={970}
                        height={700}
                        className={
                          'aspect-[970/700] rounded-xl object-cover ring-2 ring-blue-300/40 shadow-xl shadow-blue-300/20 hover:shadow-3xl hover:shadow-blue-400/40 transition-all duration-500 backdrop-blur-sm border border-blue-200/20 hover:border-blue-300/60' +
                          (isClickable ? 'cursor-pointer hover:ring-blue-400/60' : '')
                        }
                        onClick={() => handleImageClick(image, globalIndex)}
                      />
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
);
};

// Horizontal Grid Line
const HorizontalGridLine = ({
  extraStyles = "",
  spacing = "200px",
}: {
  extraStyles?: string;
  spacing?: string;
}) => {
const lineStyles: React.CSSProperties = {
      "--background": "rgba(239, 246, 255, 0.8)",
      "--color": "rgba(59, 130, 246, 0.3)",
      "--height": "1px",
      "--width": "5px",
      "--fade-stop": "90%",
      "--offset": spacing,
      "--color-dark": "rgba(147, 197, 253, 0.25)",
      maskComposite: "exclude",
      } as React.CSSProperties;

  const baseClasses = [
    "absolute",
    "left-[calc(var(--offset)/-2)]",
    "h-[var(--height)]",
    "w-[calc(100%+var(--offset))]",
    "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
    "[background-size:var(--width)_var(--height)]",
    "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
    "[mask-composite:exclude]",
    "z-30",
    "dark:bg-black",
    extraStyles,
  ].join(" ");

  return <div style={lineStyles} className={baseClasses}></div>;
};

// Vertical Grid Line
const VerticalGridLine = ({
  extraStyles = "",
  spacing = "150px",
}: {
  extraStyles?: string;
  spacing?: string;
}) => {
  const lineStyles: React.CSSProperties = {
    "--background": "#ffffff",
    "--color": "rgba(0, 0, 0, 0.2)",
    "--height": "5px",
    "--width": "1px",
    "--fade-stop": "90%",
    "--offset": spacing,
    "--color-dark": "rgba(0, 0, 0, 0.2)",
    maskComposite: "exclude",
  } as React.CSSProperties;

  const baseClasses = [
    "absolute",
    "top-[calc(var(--offset)/-2)]",
    "h-[calc(100%+var(--offset))]",
    "w-[var(--width)]",
    "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
    "[background-size:var(--width)_var(--height)]",
    "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
    "[mask-composite:exclude]",
    "z-30",
    "dark:bg-black",
    extraStyles,
  ].join(" ");

  return <div style={lineStyles} className={baseClasses}></div>;
};

// Export memoized component
export const ThreeDMarquee = memo(ThreeDMarqueeComponent);
export default ThreeDMarquee;