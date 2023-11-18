import { NextRequest, NextResponse } from 'next/server';
import { vehicle_data } from '@/lib/vehicle_data';

// import { Buffer } from 'safe-buffer';
// import { BigInteger } from 'bigi';
// import {schnorr} from 'bip-schnorr';

const Buffer = require('safe-buffer').Buffer; 
const BigInteger = require('bigi');
const schnorr = require('bip-schnorr');
const convert = schnorr.convert;


// Implement toJSON for BigInt so we can include values in response
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

function getVehicleData(carId: string){
  // const PRIVATE_KEY = "1zkp2wdKteRJeFKm4dEgGBHDbKCRk39WQ6MQWp95xQwWRCqC"
  const PRIVATE_KEY_HEX = 'B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF';


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

// let privKeyHex = BigInteger.fromHex(PRIVATE_KEY);
const odometer= BigInt(result["vehicle_state"]["odometer"])
const odometerHex = odometer.toString(16)
//const message = Buffer.from(odometerHex, 'hex');
const message = Buffer.from('243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89', 'hex');
const createdSignature = schnorr.sign(PRIVATE_KEY_HEX, message);

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
    "vehicle_data": result, 
    "signature": createdSignature.toString('hex')
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