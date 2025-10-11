import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // 检查环境变量
    const envCheck = {
      AUTH_PASSWORD: !!process.env.AUTH_PASSWORD,
      USERNAME: !!process.env.USERNAME,
      NEXT_PUBLIC_STORAGE_TYPE: process.env.NEXT_PUBLIC_STORAGE_TYPE,
      NODE_ENV: process.env.NODE_ENV,
    };

    // 检查D1数据库绑定
    const dbCheck = {
      hasDB: !!(globalThis as any).DB,
      dbType: typeof (globalThis as any).DB,
    };

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: envCheck,
      db: dbCheck,
      runtime: 'edge',
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Debug test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
