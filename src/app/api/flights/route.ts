import { NextRequest, NextResponse } from 'next/server';
import { fetchFlights, formatFlightData } from '@/utils/aviationStack';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;

        const departure = searchParams.get('departure') || undefined;
        const arrival = searchParams.get('arrival') || undefined;
        const date = searchParams.get('date') || undefined;
        const flightIata = searchParams.get('flightIata') || undefined;

        // Validate search parameters
        if (!departure && !arrival && !date && !flightIata) {
            return NextResponse.json(
                { error: 'At least one search parameter is required' },
                { status: 400 }
            );
        }

        // Fetch flights from AviationStack API
        const rawFlights = await fetchFlights({
            departure,
            arrival,
            date,
            flightIata,
            limit: 20,
        });

        // Format the flights for display
        const formattedFlights = rawFlights.map(formatFlightData);

        return NextResponse.json({
            success: true,
            flights: formattedFlights,
            count: formattedFlights.length,
        });
    } catch (error) {
        console.error('API Error:', error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to fetch flights',
            },
            { status: 500 }
        );
    }
}
