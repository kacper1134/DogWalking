import { Center, Heading, Spinner } from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import RadiusSlider from "./RadiusSlider";

interface LocalizationMapProps {
  currentRadius: number;
  setCurrentRadius: React.Dispatch<React.SetStateAction<number>>;
  currentCoordinates: {
    lat: number;
    lng: number;
  };
  setCurrentCoordinates: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const LocalizationMap = ({
  currentRadius,
  setCurrentRadius,
  currentCoordinates,
  setCurrentCoordinates,
}: LocalizationMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
  });

  useEffect(() => {
    setCurrentCoordinates({
      lat: coords?.latitude ?? 10,
      lng: coords?.longitude ?? 10,
    });
  }, [coords, setCurrentCoordinates]);

  if (!isLoaded)
    return (
      <Center h="100%" color="primary.900">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <>
      <Heading as={Center} py="30px" fontSize={25} color="white">
        Change Your Location
      </Heading>
      <RadiusSlider
        currentRadius={currentRadius}
        setCurrentRadius={setCurrentRadius}
      />
      <Map
        currentCoordinates={currentCoordinates}
        setCurrentCoordinates={setCurrentCoordinates}
        circleRadius={currentRadius}
      />
    </>
  );
};

interface MapProps {
  currentCoordinates: { lat: number; lng: number };
  setCurrentCoordinates: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  circleRadius: number;
}

const Map = ({
  currentCoordinates,
  setCurrentCoordinates,
  circleRadius,
}: MapProps) => {
  return (
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
        draggable
        onDragEnd={(e) =>
          setCurrentCoordinates({
            lat: e.latLng?.lat() ?? 10,
            lng: e.latLng?.lng() ?? 10,
          })
        }
      />
      <CircleF
        center={{
          lat: currentCoordinates.lat,
          lng: currentCoordinates.lng,
        }}
        radius={circleRadius}
        options={{ fillColor: "purple" }}
      />
    </GoogleMap>
  );
};

export default LocalizationMap;
