use crate::{application::use_cases, domain::{entities::book::Book, services::book_services}, infrastructure::repositories::book_repository, presentation::dto::book_register_dto::BookRegisterDto};

#[tauri::command]
pub fn register_book(data: BookRegisterDto) -> Result<Book, String> {
    let repository = book_repository::BookRepository::new();
    let services = book_services::BookServices::new(repository);
    use_cases::register_book::register_book(data, &services)
}
