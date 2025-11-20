'use client';

import { useState, FormEvent } from 'react';

interface FlightResult {
  flightNumber: string;
  airline: string;
  status: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    actualTime: string | null;
    delay: number | null;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    actualTime: string | null;
    delay: number | null;
  };
  aircraft: string;
  date: string;
}

export default function FlightLookup() {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFlights([]);

    try {
      const params = new URLSearchParams();
      if (departureAirport) params.append('departure', departureAirport);
      if (arrivalAirport) params.append('arrival', arrivalAirport);
      if (flightDate) params.append('date', flightDate);

      const response = await fetch(`/api/flights?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      setFlights(data.flights || []);

      if (data.flights.length === 0) {
        setError('No flights found. Try different search criteria.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching for flights');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'landed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Flight Tracker</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
              Departure Airport
            </label>
            <input
              id="departure"
              type="text"
              placeholder="e.g., JFK"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-1">
              Arrival Airport
            </label>
            <input
              id="arrival"
              type="text"
              placeholder="e.g., LAX"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Flight Date
            </label>
            <input
              id="date"
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Flight Results */}
      {flights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Results ({flights.length} flight{flights.length !== 1 ? 's' : ''})
          </h2>

          {flights.map((flight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{flight.flightNumber}</h3>
                  <p className="text-gray-600">{flight.airline}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(flight.status)}`}>
                  {flight.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Departure */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Departure</h4>
                  <p className="text-gray-900 font-bold">{flight.departure.code}</p>
                  <p className="text-gray-600 text-sm">{flight.departure.airport}</p>
                  <p className="text-gray-900 mt-2">
                    {new Date(flight.departure.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {flight.departure.delay !== null && flight.departure.delay > 0 && (
                    <p className="text-red-600 text-sm">Delay: +{flight.departure.delay} min</p>
                  )}
                </div>

                {/* Arrival */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Arrival</h4>
                  <p className="text-gray-900 font-bold">{flight.arrival.code}</p>
                  <p className="text-gray-600 text-sm">{flight.arrival.airport}</p>
                  <p className="text-gray-900 mt-2">
                    {new Date(flight.arrival.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {flight.arrival.delay !== null && flight.arrival.delay > 0 && (
                    <p className="text-red-600 text-sm">Delay: +{flight.arrival.delay} min</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 text-sm text-gray-600">
                <p>Aircraft: {flight.aircraft} | Date: {flight.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results State */}
      {!loading && flights.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Enter your search criteria and click "Search" to find flights.</p>
        </div>
      )}
    </div>
  );
}
