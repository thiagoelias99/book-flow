-- This file should undo anything in `up.sql`
-- DropTable
DROP TABLE "loans";

-- DropTable
DROP TABLE "loan_status";

-- DropIndex
DROP INDEX "loans_book_id_user_id_idx";