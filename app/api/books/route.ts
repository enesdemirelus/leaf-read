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

  const item = json.items?.[0]?.volumeInfo;
  const identifiers = json.items?.[0]?.volumeInfo?.industryIdentifiers;

  if (!item) {
    return NextResponse.json([], { status: 404 });
  }

  const isbn = identifiers?.[0]?.identifier;

  const googleThumbnail = item.imageLinks?.thumbnail?.replace('http://', 'https://');
  const openLibCover = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null;

  const book: Book = {
    title: item.title,
    authors: item.authors || [],
    pageCount: item.pageCount,
    coverImage: googleThumbnail || openLibCover || `https://placehold.co/600x400?text=${encodeURIComponent(item.title)}`,
    isbn13: isbn,
  };

  return NextResponse.json([book]);
}
