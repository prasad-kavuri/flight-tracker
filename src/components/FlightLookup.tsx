'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './FlightLookup.module.css';
import { Flight } from '@/utils/types';

export default function FlightLookup() {
  const [query, setQuery] = useState('');
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setFlight(null);

    try {
      const res = await fetch(`/api/flights?query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError('Flight not found. Please try another flight number (e.g., UA1).');
        } else {
          setError('An error occurred while fetching flight details.');
        }
        return;
      }
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setFlight(data[0]);
      } else {
        setError('Flight not found.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeStr: string, timeZone: string) => {
    try {
      return new Date(timeStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
        timeZoneName: 'short',
      });
    } catch (e) {
      return timeStr;
    }
  };

  const formatDate = (timeStr: string, timeZone: string) => {
    try {
      return new Date(timeStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone,
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Image src="/logo.png" alt="Flight Tracker Logo" width={40} height={40} />
        <h1 className={styles.title} style={{ margin: 0 }}>Flight Tracker</h1>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSearch} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="flightNumber" className={styles.label}>
              Flight Number
            </label>
            <input
              id="flightNumber"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              placeholder="e.g. UA1"
              className={styles.input}
              autoComplete="off"
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Searching...' : 'Track Flight'}
          </button>
        </form>

        {error && <div style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}

        {flight && (
          <a
            href={(() => {
              const startTime = new Date(flight.departure.scheduled).toISOString().replace(/-|:|\.\d+/g, '');
              const endTime = new Date(flight.arrival.scheduled).toISOString().replace(/-|:|\.\d+/g, '');
              const text = `Flight ${flight.flight.iata}: ${flight.departure.iata} to ${flight.arrival.iata}`;
              const details = `Flight Status: ${flight.flight_status}\nAirline: ${flight.airline.name}\nFlight: ${flight.flight.iata}`;
              const location = `${flight.departure.airport} to ${flight.arrival.airport}`;

              return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
            })()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.result}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
          >
            <div className={styles.route}>
              <span className={styles.airport}>{flight.departure.iata}</span>
              <span className={styles.arrow}>✈</span>
              <span className={styles.airport}>{flight.arrival.iata}</span>
            </div>

            <div className={styles.flightInfo}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Departure</span>
                <span className={styles.infoValue}>
                  {formatTime(flight.departure.scheduled, flight.departure.timezone)}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  {formatDate(flight.departure.scheduled, flight.departure.timezone)}
                </span>
              </div>

              <div className={styles.infoBlock} style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                <span className={styles.infoLabel}>Arrival</span>
                <span className={styles.infoValue}>
                  {formatTime(flight.arrival.scheduled, flight.arrival.timezone)}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  {formatDate(flight.arrival.scheduled, flight.arrival.timezone)}
                </span>
              </div>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
              Status: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{flight.flight_status}</span>
            </div>
            <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#3b82f6' }}>
              Click to add to Google Calendar
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
