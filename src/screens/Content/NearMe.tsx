import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Icon } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { CHAT_TYPE, RESOURCE_NAME } from '../../constants/common';
import { CHAT_STACK, MAIN_TAB } from '../../constants/screens';
import useDebounce from '../../hooks/useDebounce';
import { AppState } from '../../store';
import { setConfig as _setConfig } from '../../store/actions/config';
import {
  addUserPosition as _addUserPosition,
  getNearMe as _getNearMe,
} from '../../store/actions/location';
import { getUserCoordinate } from '../../store/selectors/location';
import { getResourceData } from '../../store/selectors/resources';
import { mapStyle } from '../../styles/map';
import { createFullName } from '../../utils/common';
import { COLOR_PALETTE } from '../../utils/theme';

const NearMe: React.FC<Props> = ({
  addUserPosition,
  setConfig,
  getNearMe,
  coordinate,
  users,
  navigation,
}) => {
  const [nearestUsers, setNearestUsers] = useState<
    HourChat.Resource.UserLocation[]
  >([]);
  const mapRef = useRef<MapView>(null);

  const navigateToChat = useCallback(
    (uuid: string) => {
      setConfig({
        name: createFullName(users[uuid]),
        type: CHAT_TYPE.PRIVATE,
        uuid,
      });
      navigation.navigate(MAIN_TAB.CHAT, {
        screen: CHAT_STACK.VIEW,
      });
    },
    [navigation, users, setConfig]
  );

  useDebounce(() => {
    if (!coordinate.latitude || !coordinate.longitude) return;

    addUserPosition();

    getNearMe()
      .then(({ data }) => {
        setNearestUsers(data);
      })
      .catch(() => {
        // Do nothing if there is an error
      });
  }, [addUserPosition, coordinate]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default />
      <MapView
        moveOnMarkerPress={false}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        mapPadding={{
          top: 0,
          right: 0,
          bottom: scale(100),
          left: scale(10),
        }}
        onMapLoaded={() => {
          if (!coordinate.latitude || !coordinate.longitude) return;

          mapRef.current?.animateToRegion?.({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          });
        }}
        style={{
          height: '100%',
          width: '100%',
        }}
        ref={mapRef}
      >
        {nearestUsers.map(({ user, location }) => {
          if (!user) return null;

          return (
            <Icon.Marker.User
              key={`${user.id}-marker`}
              user={user}
              coordinate={{
                latitude: location.coordinates[1],
                longitude: location.coordinates[0],
              }}
              onPress={() => navigateToChat(user.id)}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  coordinate: getUserCoordinate(state),
  users: getResourceData(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps, {
  addUserPosition: _addUserPosition,
  getNearMe: _getNearMe,
  setConfig: _setConfig,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.MainTabProps<typeof MAIN_TAB.NEAR_ME>;

export default connector(NearMe);
