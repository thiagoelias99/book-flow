use diesel::{RunQueryDsl, Table};

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
}
