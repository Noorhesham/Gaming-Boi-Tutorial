"use client";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperType from "swiper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Autoplay } from "swiper/modules"; // Correct import for Autoplay
import GridContainer from "./defaults/GridContainer";
import FlexWrapper from "./defaults/FlexWrapper";

const SwiperCards = ({
  items,
  className,
  slidesPerView,
  spaceBetween,
  btns,
  paginationImage,
  rounded = false,
  logo,
  samePhone,
  contain,
  autoplay,
}: {
  items: any;
  className?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  btns?: boolean;
  paginationImage?: boolean;
  rounded?: boolean;
  logo?: boolean;
  samePhone?: boolean;
  contain?: boolean;
  autoplay?: boolean;
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const progressRef = React.useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (autoplay) {
      progressRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 3.7));
      }, 110);

      return () => {
        if (progressRef.current) clearInterval(progressRef.current);
      };
    }
  }, [autoplay]);

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setProgress(0);
      setActiveIndex(swiper.realIndex);
    });
  }, [swiper]);
  const handleManualSlide = (index: number) => {
    if (swiper) {
      swiper.autoplay.stop();
      swiper.slideTo(index);
      setActiveIndex(index);
      setProgress(0);
      clearInterval(progressRef.current);
    }
  };

  return (
    <div className="relative h-full gap-3 w-full flex flex-col">
      <Swiper
        modules={[Autoplay]}
        autoplay={autoplay ? { delay: 3000 } : false}
        loop={autoplay}
        breakpoints={{
          0: { slidesPerView: logo ? 2 : samePhone ? slidesPerView : 1, centeredSlides: logo ? false : true },
          768: { slidesPerView: slidesPerView || 2 },
          1024: { slidesPerView: slidesPerView || 3 },
          1280: { slidesPerView: slidesPerView || 3.4 },
        }}
        centeredSlides={false}
        initialSlide={0}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={spaceBetween || 10}
        slidesPerView={slidesPerView || 3.4}
        className={`w-full    ${className || "h-96"}`}
      >
        {items.map(({ card }: { card: ReactNode }, i: number) => (
          <SwiperSlide className={`w-full h-full overflow-hidden ${rounded ? "rounded-2xl" : ""}`} key={i}>
            {card}
          </SwiperSlide>
        ))}
      </Swiper>
      {btns && (
        <div className=" flex mb-4 items-center gap-20  md:gap-10 justify-between lg:justify-center  mt-5 ">
          <Button
            onClick={() => swiper?.slidePrev()}
            className={`rounded-full flex px-6 py-4 items-center  border  border-main bg-white text-main duration-150 hover:text-white hover:bg-main `}
          >
            <ArrowLeft className="mr-1" />
            {t("previous")}
          </Button>
          <Button
            onClick={() => {
              swiper?.slideNext();
            }}
            className={` rounded-full flex px-6 py-4 items-center  border border-main bg-white text-main duration-150 hover:text-white hover:bg-main`}
          >
            {t("next")} <ArrowRight />
          </Button>
        </div>
      )}
      {paginationImage && (
        <div className="p-3   hidden justify-center md:flex  flex-row z-10 mt-4 relative items-center gap-2">
          {items.map(({ src }: { src: string }, i: number) => (
            <div
              className={cn(
                "overflow-hidden cursor-pointer   hover:opacity-95 duration-200 relative aspect-square h-32 w-full rounded-xl",
                { "opacity-80": i !== activeIndex },
                { "border border-rose-500": i === activeIndex }
              )}
              key={i}
              onClick={() => handleManualSlide(i)}
            >
              {i === activeIndex && (
                <div
                  style={{ width: `${progress}%` }}
                  className=" duration-150 absolute inset-0 h-full bg-gray-400/50"
                ></div>
              )}
              <Image
                fill
                loading="eager"
                src={src}
                alt="product image"
                className="-z-10 h-full absolute w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperCards;
