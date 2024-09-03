use crate::{
    domain::{entities::book::Book, services::book_services::BookServices},
    presentation::dto::book_register_dto::BookRegisterDto,
};

pub fn register_book(data: BookRegisterDto, services: &BookServices) -> Result<Book, String> {
    services.register_book(data)
}
