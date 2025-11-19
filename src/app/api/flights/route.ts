import { getFlightByNumber } from '@/utils/aviationStack';
import { Flight } from '@/utils/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json([]);
    }

    const flight = await getFlightByNumber(query);

    if (!flight) {
        return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    // Return as an array to match the expected format of the frontend for now, 
    // or we can update frontend to expect a single object. 
    // The previous mock data returned an array of matches.
    // The API utility returns a single Flight object (the first match).
    // Let's return an array containing the single flight.
    return NextResponse.json([flight]);
}
