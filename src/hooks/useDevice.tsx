import { useEffect, useState } from "react";

export interface DeviceBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const MD = 768;
const XL = 1100;

const useDevice = (): DeviceBreakpoints => {
  const [width, setWidth] = useState(window.innerWidth);

  const listener = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return {
    isMobile: width < MD,
    isTablet: width >= MD && width < XL,
    isDesktop: width >= XL,
  };
};

export default useDevice;
