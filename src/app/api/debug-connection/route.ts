
import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        return NextResponse.json({
            status: 'error',
            message: 'NEXT_PUBLIC_API_URL is undefined in process.env'
        }, { status: 500 });
    }

    try {
        const targetUrl = `${apiUrl}/blog/groups`;
        console.log(`Testing connection to: ${targetUrl}`);

        const startTime = Date.now();
        const response = await axios.get(targetUrl, { timeout: 5000 });
        const duration = Date.now() - startTime;

        return NextResponse.json({
            status: 'success',
            envVar: apiUrl,
            targetUrl,
            duration: `${duration}ms`,
            responseStatus: response.status,
            data: response.data
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            envVar: apiUrl,
            message: error.message,
            code: error.code,
            responseStatus: error.response?.status,
            responseData: error.response?.data,
            stack: error.stack
        }, { status: 500 });
    }
}
