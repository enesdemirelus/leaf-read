import { NextRequest, NextResponse } from 'next/server';
import { Book } from '@/types/book';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("title");

  if (!query) {
    return NextResponse.json([], { status: 400 });
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.items || json.items.length === 0) {
    return NextResponse.json([], { status: 404 });
  }

  const books: Book[] = json.items.slice(0, 10).map((item: any) => {
    const volumeInfo = item.volumeInfo;
    const identifiers = volumeInfo.industryIdentifiers;
    const isbn = identifiers?.[0]?.identifier;

    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors || [],
      pageCount: volumeInfo.pageCount,
      coverImage: `https://placehold.co/160x240?text=${volumeInfo.title}`,
      isbn13: isbn,
    };
  });

  return NextResponse.json(books);
}
