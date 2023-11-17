import { faker } from '@faker-js/faker';

export function drive_state(fast_driver: boolean) {

    const lat = faker.location.latitude()
    const lon = faker.location.longitude()

    const moderate_speed = faker.number.int({ min: 10, max: 60 })
    console.log("fast_driver", fast_driver)
    const high_speed = faker.number.int({ min: 50, max: 100 })

    const speed = fast_driver? high_speed : moderate_speed
    const result = {
    "active_route_latitude": lat,
    "active_route_longitude": lon,
    "active_route_traffic_minutes_delay": faker.number.int(120),
    "gps_as_of": 1692137422,
    "heading": faker.number.int(500),
    "latitude": lat,
    "longitude": lon,
    "native_latitude": lat,
    "native_location_supported": 1,
    "native_longitude": lon,
    "native_type": "wgs",
    "power": 1,
    "shift_state": null,
    "speed": speed,
    "timestamp": Date.now()
   }
    return result; 
}