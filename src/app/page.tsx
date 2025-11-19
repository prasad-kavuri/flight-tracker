import FlightLookup from '@/components/FlightLookup';

export default function Home() {
  return (
    <main style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <FlightLookup />
    </main>
  );
}
