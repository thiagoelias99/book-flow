-- CreateTable
CREATE TABLE "books" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "isbn" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  CONSTRAINT "books_status_fkey" FOREIGN KEY ("status") REFERENCES "book_status" ("slug") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "book_status" (
  "slug" TEXT NOT NULL PRIMARY KEY,
  "description" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "books_title_author_idx" ON "books"("title", "author");

-- Insert status data
INSERT INTO
  book_status (slug, description)
VALUES
  ('available', 'Available'),
  ('borrowed', 'Borrowed'),
  ('lost', 'Lost'),
  ('reserved', 'Reserved');