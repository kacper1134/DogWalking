import React, { useEffect, useState } from "react";
import { useDimensions } from "@chakra-ui/react";
import useWindowDimensions from "./useWindowDimensions";

export interface ClosedRange {
  from: number;
  to: number;
}

function useVerticalViewportOffset(
  ref: React.RefObject<HTMLElement>,
  offsetRange: ClosedRange
) {
  const [offset, setOffset] = useState(0);
  const dimensions = useDimensions(ref, true);
  const viewport = useWindowDimensions();

  useEffect(() => {
    if (
      dimensions?.borderBox.top! < viewport.height &&
      dimensions?.borderBox.bottom! > 0
    ) {
      setOffset(
        Utils.rescale(
          dimensions?.borderBox.top!,
          viewport.height,
          -dimensions?.borderBox.height!,
          offsetRange.from,
          offsetRange.to
        )
      );
    }
  }, [dimensions, viewport]);

  return offset;
}

class Utils {
    static range(from: number, to: number): number[] {
        if (from > to) return [];
        else if(from === to) return [from];
        else return [from, ...Utils.range(from + 1, to)];
    }
    static rescale(value: number, min: number, max: number, targetMin: number, targetMax: number) {
        return targetMin + ((value - min) / (max - min)) * (targetMax - targetMin);
    }
}

export default useVerticalViewportOffset;
