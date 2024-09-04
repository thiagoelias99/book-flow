use diesel::{prelude::Insertable, Queryable, Selectable};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::loans)] // Set the table name
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Loan {
    // Must be in same order as in schema.rs
    pub id: String,
    pub book_id: String,
    pub user_id: String,
    pub loan_date: String,
    pub return_date: String,
    pub status: String,
}
