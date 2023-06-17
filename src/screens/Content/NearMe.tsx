import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect, ConnectedProps } from 'react-redux';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import useDebounce from '../../hooks/useDebounce';
import { AppState } from '../../store';
import {
  addUserPosition as _addUserPosition,
  getNearMe as _getNearMe,
} from '../../store/actions/location';
import { getUserCoordinate } from '../../store/selectors/location';
import { mapStyle } from '../../styles/map';
import { COLOR_PALETTE } from '../../utils/theme';

const NearMe: React.FC<Props> = ({
  addUserPosition,
  getNearMe,
  coordinate,
}) => {
  const [nearestUsers, setNearestUsers] = useState<
    HourChat.Resource.UserLocation[]
  >([]);
  const mapRef = useRef<MapView>(null);

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
        backgroundColor={COLOR_PALETTE.WHITE}
        barStyle={'dark-content'}
      />
      <MapView
        showsUserLocation
        showsPointsOfInterest={false}
        showsBuildings={false}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
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
        {nearestUsers.map((user) => {
          console.log(user);
          return null;
        })}
      </MapView>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  coordinate: getUserCoordinate(state),
});

const connector = connect(mapStateToProps, {
  addUserPosition: _addUserPosition,
  getNearMe: _getNearMe,
});

type Props = ConnectedProps<typeof connector>;

export default connector(NearMe);
