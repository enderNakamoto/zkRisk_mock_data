import { faker } from '@faker-js/faker';

export function vehicle_state(high_mileage: boolean) {

    // demo time since car buy date 1st Jan 2023
    const time_elapsed_ms = Date.now() - Date.parse('01 Jan 2023 00:00:00 GMT')
    const time_elapsed_days = Math.ceil(time_elapsed_ms/(1000*60*60*24))

    console.log("high_mileage", high_mileage)
    // if high, then car drives 211 miles /day, otherwise 15/day 
    const miles = high_mileage ? time_elapsed_days* 211 :  time_elapsed_days* 15


    const result = {
        "vehicle_name": faker.vehicle.vrm(),
        "odometer": miles
   }
    return result; 
}