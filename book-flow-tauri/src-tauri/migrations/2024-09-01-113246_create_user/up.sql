-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    CONSTRAINT "users_level_fkey" FOREIGN KEY ("level") REFERENCES "user_levels" ("slug") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "user_levels" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE INDEX "user_name" ON "users"("user_name");

-- InsertData
INSERT INTO
    user_levels (slug, description)
VALUES
    ('admin', 'Administrator'),
    ('manager', 'Manager'),
    ('student', 'Student'),
    ('teacher', 'Teacher'),
    ('guest', 'Guest');

-- INSERT INTO
--     users (id, name, user_name, PASSWORD, LEVEL)
-- VALUES
--     ('1', 'Admin', 'admin', 'admin', 'admin');