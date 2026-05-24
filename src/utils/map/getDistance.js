export const getDistance = (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude
) => {
    const earthRadiusKm = 6371;

    const latitudeDifference = (endLatitude - startLatitude) * (Math.PI / 180);
    const longitudeDifference = (endLongitude - startLongitude) * (Math.PI / 180);

    const haversineValue =
        Math.sin(latitudeDifference / 2) ** 2 +
        Math.cos(startLatitude * (Math.PI / 180)) *
        Math.cos(endLatitude * (Math.PI / 180)) *
        Math.sin(longitudeDifference / 2) ** 2;

    const centralAngle = 2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

    return earthRadiusKm * centralAngle;
};