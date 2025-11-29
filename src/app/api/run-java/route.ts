/**
 * Java Execution API
 * 
 * Server-side Java execution endpoint
 */

import { NextRequest, NextResponse } from 'next/server'
import { Injector } from '@/visualizer/backend/trace/Injector'
import { JavaCompiler } from '@/visualizer/backend/compiler/JavaCompiler'
import { JavaSandbox } from '@/visualizer/backend/sandbox/JavaSandbox'
import { TraceParser } from '@/visualizer/backend/trace/TraceParser'
import { ExecutionSnapshot } from '@/visualizer/core/tracking/Snapshot'

export const runtime = 'nodejs' // Force Node.js runtime for Vercel

export async function POST(request: NextRequest) {
  try {
    const javaServiceUrl = process.env.JAVA_SERVICE_URL;

    if (!javaServiceUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Configuration Error',
          message: 'JAVA_SERVICE_URL environment variable is not set. Please deploy the java-service and configure this variable.'
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    try {
      const response = await fetch(`${javaServiceUrl}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });

    } catch (fetchError: any) {
      return NextResponse.json(
        {
          success: false,
          error: 'Service Unavailable',
          message: `Failed to connect to Java execution service: ${fetchError.message}`
        },
        { status: 503 }
      );
    }

  } catch (error: any) {
    console.error('[Run API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

