import { useCallback } from "react";

import { getDistance, getCarName } from "../../utils";

export const useNearestCar = (
    filteredCars,
    setIndex,
    mapRef,
    showMessage
) => {
    return useCallback(() => {
        if (!navigator.geolocation) {
            showMessage("Геолокація не підтримується!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const userLatitude = coords.latitude;
                const userLongitude = coords.longitude;

                let nearestCar = null;
                let minDistance = Infinity;

                filteredCars.forEach((car, originalIndex) => {
                    if (car.status === "unavailable" || !car.lat || !car.lng) return;

                    const distance = getDistance(
                        userLatitude,
                        userLongitude,
                        Number(car.lat),
                        Number(car.lng)
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestCar = {
                            ...car,
                            index: originalIndex
                        };
                    }
                });

                if (!nearestCar) {
                    showMessage("Доступних автомобілів не знайдено!");
                    return;
                }

                setIndex(nearestCar.index);

                mapRef.current?.panTo({
                    lat: Number(nearestCar.lat),
                    lng: Number(nearestCar.lng)
                });

                showMessage(`${getCarName(nearestCar)} за ${minDistance.toFixed(2)} км`);
            },
            () => {
                showMessage("Неможливо визначити місцезнаходження");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, [filteredCars, setIndex, mapRef, showMessage]);
};