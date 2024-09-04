use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, Table};

use crate::{domain::entities::book::Book, infrastructure::db::connection::establish_connection};

pub struct BookRepository {}

impl BookRepository {
    pub fn new() -> Self {
        BookRepository {}
    }

    pub fn save(&self, data: Book) -> Result<Book, String> {
        let connection = &mut establish_connection();

        let book = diesel::insert_into(crate::schema::books::table)
            .values(&data)
            .returning(crate::schema::books::dsl::books::all_columns())
            .get_result(connection)
            .expect("Error saving user");

        Ok(book)
    }

    pub fn get_all(&self) -> Result<Vec<Book>, String> {
        let connection = &mut establish_connection();

        let books = crate::schema::books::dsl::books
            .load::<Book>(connection)
            .expect("Error loading books");

        Ok(books)
    }

    pub fn set_status(&self, id: &String, status: &str) -> Result<Book, String> {
        let connection = &mut establish_connection();

        let book = diesel::update(crate::schema::books::dsl::books.find(id))
            .set(crate::schema::books::dsl::status.eq(status))
            .get_result(connection)
            .expect("Error updating book");

        Ok(book)
    }
}
