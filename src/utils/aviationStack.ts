/**
 * AviationStack API Utility
 * Handles flight data fetching and formatting from the AviationStack API
 */

interface FlightData {
    flight_date: string;
    flight_status: string;
    departure: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string | null;
        gate: string | null;
        delay: number | null;
        scheduled: string;
        estimated: string;
        actual: string | null;
    };
    arrival: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string | null;
        gate: string | null;
        baggage: string | null;
        delay: number | null;
        scheduled: string;
        estimated: string;
        actual: string | null;
    };
    airline: {
        name: string;
        iata: string;
        icao: string;
    };
    aircraft: {
        registration: string;
        iata: string;
        icao: string;
        icao24: string;
    };
    codeshare: {
        airline_iata: string;
        airline_name: string;
        flight_number: string;
    }[];
}

interface FlightSearchParams {
    departure?: string; // Airport IATA code
    arrival?: string; // Airport IATA code
    flightIata?: string; // Flight number
    status?: string; // Flight status
    date?: string; // Flight date (YYYY-MM-DD)
    limit?: number;
}

interface ApiResponse {
    data: FlightData[];
    pagination?: {
        limit: number;
        offset: number;
        count: number;
        total: number;
    };
}

/**
 * Fetch flights from AviationStack API
 * @param params - Search parameters
 * @returns Flight data
 */
export async function fetchFlights(params: FlightSearchParams): Promise<FlightData[]> {
    const apiKey = process.env.NEXT_PUBLIC_FLIGHT_API_KEY;
    const baseUrl = process.env.FLIGHT_API_BASE_URL || "https://api.aviationstack.com/v1";

    if (!apiKey) {
        throw new Error("Flight API key is not configured");
    }

    try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append("access_key", apiKey);

        if (params.departure) queryParams.append("dep_iata", params.departure);
        if (params.arrival) queryParams.append("arr_iata", params.arrival);
        if (params.flightIata) queryParams.append("flight_iata", params.flightIata);
        if (params.status) queryParams.append("flight_status", params.status);
        if (params.date) queryParams.append("flight_date", params.date);
        if (params.limit) queryParams.append("limit", params.limit.toString());

        const url = `${baseUrl}/flights?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (!data.data) {
            return [];
        }

        return data.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
    }
}

/**
 * Format flight data for display
 * @param flight - Raw flight data
 * @returns Formatted flight information
 */
export function formatFlightData(flight: FlightData) {
    return {
        flightNumber: `${flight.airline.iata}${flight.codeshare?.[0]?.flight_number || ""}`,
        airline: flight.airline.name,
        status: flight.flight_status,
        departure: {
            airport: flight.departure.airport,
            code: flight.departure.iata,
            time: flight.departure.scheduled,
            actualTime: flight.departure.actual,
            delay: flight.departure.delay,
        },
        arrival: {
            airport: flight.arrival.airport,
            code: flight.arrival.iata,
            time: flight.arrival.scheduled,
            actualTime: flight.arrival.actual,
            delay: flight.arrival.delay,
        },
        aircraft: flight.aircraft.iata,
        date: flight.flight_date,
    };
}