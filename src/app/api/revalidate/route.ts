import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');
    
    // Optional: Secret token for securing the endpoint
    // We check if SANITY_REVALIDATE_SECRET is configured, otherwise we allow it (for ease of setup, though less secure)
    const envSecret = process.env.SANITY_REVALIDATE_SECRET;
    
    if (envSecret && secret !== envSecret) {
      return NextResponse.json({ message: 'Invalid secret parameter' }, { status: 401 });
    }

    // Revalidate the entire layout and all pages below it.
    revalidatePath('/', 'layout');
    
    // Explicitly revalidate specific pathways to be absolutely sure Vercel Edge Cache purges them
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/work');
    revalidatePath('/gallery');
    revalidatePath('/blog');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
