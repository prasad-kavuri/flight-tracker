import { Flight, AviationStackResponse } from './types';

const API_KEY = process.env.AVIATION_STACK_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

export async function getFlightByNumber(flightIata: string): Promise<Flight | null> {
    if (!API_KEY) {
        throw new Error('AVIATION_STACK_API_KEY is not defined');
    }

    try {
        const response = await fetch(
            `${BASE_URL}/flights?access_key=${API_KEY}&flight_iata=${flightIata}&limit=1`
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: AviationStackResponse = await response.json();

        if (data.data && data.data.length > 0) {
            return data.data[0];
        }

        return null;
    } catch (error) {
        console.error('Error fetching flight data:', error);
        return null;
    }
}
