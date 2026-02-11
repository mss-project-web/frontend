
export default function DebugPage() {
    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Server Environment Debug</h1>
            <p><strong>API_URL (Server):</strong> {process.env.NEXT_PUBLIC_API_URL || 'UNDEFINED'}</p>
        </div>
    );
}
