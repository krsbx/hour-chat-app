import GeoLocation from '@react-native-community/geolocation';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { updateLocation } from '../store/actions/location';

const useWatchPosition = () => {
  const dispatch = useDispatch<AppDispatch>();

  const watchPositionRef =
    useRef<ReturnType<typeof GeoLocation.watchPosition>>();

  useEffect(() => {
    watchPositionRef.current = GeoLocation.watchPosition(
      (position) => {
        updateLocation(position)(dispatch);
      },
      (err) => {
        console.log(err.message);
      },
      {
        enableHighAccuracy: false,
      }
    );

    return () => {
      const ref = watchPositionRef.current;

      if (!ref) return;

      GeoLocation.clearWatch(ref);
    };
  }, [dispatch]);
};

export default useWatchPosition;
