use crate::{application::use_cases, domain::{entities::book::Book, services::book_services}, infrastructure::repositories::book_repository};

#[tauri::command]
pub fn get_all_books() -> Result<Vec<Book>, String> {
    let repository = book_repository::BookRepository::new();
    let services = book_services::BookServices::new(repository);

    use_cases::get_book::get_all(&services)
}