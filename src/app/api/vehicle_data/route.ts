import { NextRequest, NextResponse } from 'next/server';

import { vehicle_data } from '@/lib/vehicle_data';

// Implement toJSON for BigInt so we can include values in response
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

function getVehicleData(carId: string){
  // const privateKey = "EKFLHx273j3WU9rJg6ndchQgoZ4Hk1cp35bhrZYM8ivrjb3LmNYM"

  let fast_driver = false
  let high_mileage = false

  if (carId == "1"){
    fast_driver = true
    high_mileage = false 
  }

  if (carId == "2"){
    fast_driver = true
    high_mileage = true 
  }

  if (carId == "3"){
    fast_driver = true
    high_mileage = true 
  }

  const result = vehicle_data(carId, high_mileage, fast_driver);
  
  // const signature = client.signFields(
  //   [BigInt(carId), BigInt(result["vehicle_state"]["odometer"])],
  //   privateKey
  // );
  
  // return {
  //   "vehicle_data": result, 
  //   "signature":  signature.signature, 
  //   "publicKey":  signature.publicKey
  // }

  return {
    "vehicle_data": result
  }
}

export function GET(request: NextRequest) {

  const searchParams = new URLSearchParams(request.nextUrl.search);
  const carId = searchParams.get("id") ?? "0"
  const data = getVehicleData(carId);

  return new Response(JSON.stringify(
    data
  ))
}