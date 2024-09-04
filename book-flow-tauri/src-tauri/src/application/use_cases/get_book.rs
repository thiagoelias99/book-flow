use crate::domain::{entities::book::Book, services::book_services::BookServices};

pub fn get_all(services: &BookServices) -> Result<Vec<Book>, String> {
    services.get_all()
}
