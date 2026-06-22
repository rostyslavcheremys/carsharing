import { useState, useRef, useLayoutEffect, useCallback } from "react";

import { ArrowBackIcon, ArrowForwardIcon } from "../../libs/mui-icons";
import { ActionIconButton, ImageItem } from "../../components";

export const CarImages = ({ images }) => {
    const sliderRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const el = sliderRef.current;

        if (!el) return;

        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < maxScrollLeft);
    }, []);

    const scrollLeft = () => {
        const el = sliderRef.current;
        if (!el) return;

        el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    };

    const scrollRight = () => {
        const el = sliderRef.current;
        if (!el) return;

        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    };

    useLayoutEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        const raf = requestAnimationFrame(() => {
            checkScroll();
        });

        const resizeObserver = new ResizeObserver(() => {
            checkScroll();
        });

        resizeObserver.observe(el);

        return () => {
            cancelAnimationFrame(raf);
            resizeObserver.disconnect();
        };
    }, [images, checkScroll]);

    return (
        <div className="car-images">
            <div className="car-images__container">
                <div className="car-images__wrapper">
                    <div
                        className="car-images__slider"
                        ref={sliderRef}
                        onScroll={checkScroll}
                    >
                        {images.map((item) => (
                            <ImageItem
                                key={item}
                                src={item}
                                alt="car"
                                onLoad={checkScroll}
                            />
                        ))}
                    </div>

                    <div className="car-images__overlay">
                        <ActionIconButton
                            Icon={ArrowBackIcon}
                            className="car-images__button"
                            disabled={!canScrollLeft}
                            onClick={scrollLeft}
                        />

                        <ActionIconButton
                            Icon={ArrowForwardIcon}
                            className="car-images__button"
                            disabled={!canScrollRight}
                            onClick={scrollRight}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};