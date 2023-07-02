/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useRef, useState } from 'react';
import { Image, ImageURISource } from 'react-native';

import { createCache } from '../utils';

const CACHE_SIZE = 50;
const imageDimensionsCache = createCache(CACHE_SIZE);

const useImageDimensions = (
  image: HourChat.Type.ImageSource
): HourChat.Type.Dimensions | null => {
  const isImageUnmounted = useRef(false);
  const [dimensions, setDimensions] = useState<HourChat.Type.Dimensions | null>(
    null
  );

  const getImageDimensions = (
    image: HourChat.Type.ImageSource
  ): Promise<HourChat.Type.Dimensions> => {
    return new Promise((resolve) => {
      if (typeof image === 'number') {
        const cacheKey = `${image}`;
        let imageDimensions = imageDimensionsCache.get(cacheKey);

        if (!imageDimensions) {
          const { width, height } = Image.resolveAssetSource(image);
          imageDimensions = { width, height };
          imageDimensionsCache.set(cacheKey, imageDimensions);
        }

        resolve(imageDimensions);

        return;
      }

      if (image.uri!) {
        const source = image as ImageURISource;

        const cacheKey = source.uri as string;

        const imageDimensions = imageDimensionsCache.get(cacheKey);

        if (imageDimensions) {
          resolve(imageDimensions);
        } else {
          Image.getSizeWithHeaders(
            source.uri!,
            source.headers!,
            (width: number, height: number) => {
              imageDimensionsCache.set(cacheKey, { width, height });
              resolve({ width, height });
            },
            () => {
              resolve({ width: 0, height: 0 });
            }
          );
        }
      } else {
        resolve({ width: 0, height: 0 });
      }
    });
  };

  useEffect(() => {
    getImageDimensions(image).then((dimensions) => {
      if (!isImageUnmounted.current) {
        setDimensions(dimensions);
      }
    });

    return () => {
      isImageUnmounted.current = true;
    };
  }, [image]);

  return dimensions;
};

export default useImageDimensions;
