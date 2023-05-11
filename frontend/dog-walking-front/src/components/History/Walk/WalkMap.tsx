import { Card, Center, Spinner, Text } from "@chakra-ui/react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import {
  mapCardWidth,
  walkDetailsCardHeight,
  walksDetailsFontSize,
} from "../HistoryDimensions";

const WalkMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
  });

  const [currentCoordinates, setCurrentCoordinates] = useState({
    lat: 51.065487,
    lng: 17.063,
  });

  useEffect(() => {
    setCurrentCoordinates({
      lat: coords?.latitude ?? 10,
      lng: coords?.longitude ?? 10,
    });
  }, [coords, setCurrentCoordinates]);
  
  useEffect(() => {
    const updateCords = setInterval(() => {
        const lngIncrement = Math.random() / 500000;
        const latIncrement = Math.random() / 500000;
        setCurrentCoordinates(prev => {
            return {
                lat: prev.lat + latIncrement,
                lng: prev.lng + lngIncrement,
            }
        })
    }, 100)
    return () => clearInterval(updateCords);
  }) 

  if (!isLoaded)
    return (
      <Center h="100%" color="primary.900">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Card
      w={mapCardWidth}
      h={walkDetailsCardHeight}
      bg="white"
      boxShadow="dark-lg"
      rounded="xl"
      as={Center}
      alignItems="flex-start"
      m="20px"
      p="20px"
    >
      <Text
        color="primary.600"
        fontWeight="bold"
        fontSize={walksDetailsFontSize}
        mb="20px"
      >
        Dogs Current Position:
      </Text>
      <GoogleMap
        zoom={17}
        center={{
          lat: currentCoordinates.lat,
          lng: currentCoordinates.lng,
        }}
        options={{
          fullscreenControl: false,
          zoomControl: false,
          minZoom: 8,
          maxZoom: 20,
        }}
        mapContainerClassName="map-container"
      >
        <MarkerF
          position={{
            lat: currentCoordinates.lat,
            lng: currentCoordinates.lng,
          }}
          icon={{
            url: require("./dog.svg").default,
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
          }}
        />
      </GoogleMap>
    </Card>
  );
};
export default WalkMap;