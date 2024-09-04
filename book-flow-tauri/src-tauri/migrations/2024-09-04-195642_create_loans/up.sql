-- Your SQL goes here
-- CreateTable
CREATE TABLE "loans" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "book_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "loan_date" DATETIME NOT NULL,
  "return_date" DATETIME NOT NULL,
  "status" TEXT NOT NULL,
  CONSTRAINT "loans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "loans_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "loans_status_fkey" FOREIGN KEY ("status") REFERENCES "loan_status" ("slug") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "loan_status" (
  "slug" TEXT NOT NULL PRIMARY KEY,
  "description" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "loans_book_id_user_id_idx" ON "loans"("book_id", "user_id");

--InsertData
INSERT INTO
  "loan_status" ("slug", "description")
VALUES
  ('approved', 'Approved'),
  ('returned', 'Returned');