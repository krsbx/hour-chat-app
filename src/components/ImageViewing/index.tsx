/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ModalProps,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';

import ImageItem from './component/ImageItem';

import useAnimatedComponents from './hooks/useAnimatedComponents';
import useImageIndexChange from './hooks/useImageIndexChange';
import useRequestClose from './hooks/useRequestClose';

const DEFAULT_ANIMATION_TYPE = 'fade';
const DEFAULT_BG_COLOR = '#000';
const DEFAULT_DELAY_LONG_PRESS = 800;
const SCREEN = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN.width;

const ImageViewing: React.FC<Props> = ({
  items,
  keyExtractor,
  viewIndex,
  visible,
  onRequestClose,
  onLongPress = () => {},
  onIndexChange,
  animationType = DEFAULT_ANIMATION_TYPE,
  backgroundColor = DEFAULT_BG_COLOR,
  presentationStyle,
  swipeToCloseEnabled,
  doubleTapToZoomEnabled,
  delayLongPress = DEFAULT_DELAY_LONG_PRESS,
  HeaderComponent,
  FooterComponent,
  renderItem: RenderItem,
}) => {
  const itemList = useRef<VirtualizedList<HourChat.Type.ImageSource>>(null);
  const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
  const [currentIndex, onScroll] = useImageIndexChange(viewIndex, SCREEN);
  const [headerTransform, footerTransform, toggleBarsVisible] =
    useAnimatedComponents();

  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const onZoom = useCallback(
    (isScaled: boolean) => {
      // @ts-ignore
      itemList?.current?.setNativeProps?.({ scrollEnabled: !isScaled });
      toggleBarsVisible(!isScaled);
    },
    [toggleBarsVisible]
  );

  if (!visible) return null;

  return (
    <Modal
      transparent={presentationStyle === 'overFullScreen'}
      visible={visible}
      presentationStyle={presentationStyle}
      animationType={animationType}
      onRequestClose={onRequestCloseEnhanced}
      supportedOrientations={['portrait']}
      hardwareAccelerated
    >
      <View style={[styles.container, { opacity, backgroundColor }]}>
        {HeaderComponent && (
          <Animated.View
            style={[styles.header, { transform: headerTransform }]}
          >
            <HeaderComponent fileIndex={currentIndex} />
          </Animated.View>
        )}
        <VirtualizedList
          ref={itemList}
          data={items}
          horizontal
          pagingEnabled
          windowSize={2}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={viewIndex}
          getItem={(_, index: number) => items[index]}
          getItemCount={() => items.length}
          getItemLayout={(_, index: number) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          renderItem={({ item, index }) => {
            if (RenderItem) {
              const RenderedItem = RenderItem({
                index,
                item,
                swipeToCloseEnabled,
                onRequestClose: onRequestCloseEnhanced,
              });

              if (RenderedItem) return RenderedItem;
            }

            return (
              <ImageItem
                onZoom={onZoom}
                imageSrc={item}
                onRequestClose={onRequestCloseEnhanced}
                onLongPress={onLongPress}
                delayLongPress={delayLongPress}
                swipeToCloseEnabled={swipeToCloseEnabled}
                doubleTapToZoomEnabled={doubleTapToZoomEnabled}
              />
            );
          }}
          onMomentumScrollEnd={onScroll}
          //@ts-ignore
          keyExtractor={(item, index) =>
            keyExtractor
              ? keyExtractor(item, index)
              : typeof item === 'number'
              ? `${item}`
              : item.uri
          }
        />
        {FooterComponent && (
          <Animated.View
            style={[styles.footer, { transform: footerTransform }]}
          >
            <FooterComponent fileIndex={currentIndex} />
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 0,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: 0,
  },
});

type Props = {
  items: HourChat.Type.ImageSource[];
  keyExtractor?: (item: HourChat.Type.ImageSource, index: number) => string;
  viewIndex: number;
  visible: boolean;
  onRequestClose: () => void;
  onLongPress?: (image: HourChat.Type.ImageSource) => void;
  onIndexChange?: (fileIndex: number) => void;
  presentationStyle?: ModalProps['presentationStyle'];
  animationType?: ModalProps['animationType'];
  backgroundColor?: string;
  swipeToCloseEnabled?: boolean;
  doubleTapToZoomEnabled?: boolean;
  delayLongPress?: number;
  HeaderComponent?: React.FC<{ fileIndex: number }>;
  FooterComponent?: React.FC<{ fileIndex: number }>;
  renderItem?: (Props: {
    index: number;
    item: HourChat.Type.ImageSource;
    onRequestClose?: () => void;
    swipeToCloseEnabled?: boolean;
  }) => JSX.Element | null;
};

const EnhancedImageViewing: React.FC<Props> = (props) => (
  <ImageViewing key={props.viewIndex} {...props} />
);

export default EnhancedImageViewing;
