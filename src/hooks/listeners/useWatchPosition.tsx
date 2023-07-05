import GeoLocation from '@react-native-community/geolocation';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateLocation } from '../../store/actions/location';

const useWatchPosition = () => {
  const dispatch = useDispatch<AppDispatch>();

  const watchRef = useRef<ReturnType<typeof GeoLocation.watchPosition>>();

  useEffect(() => {
    watchRef.current = GeoLocation.watchPosition(
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
      const ref = watchRef.current;

      if (!ref) return;

      GeoLocation.clearWatch(ref);
    };
  }, [dispatch]);
};

export default useWatchPosition;
