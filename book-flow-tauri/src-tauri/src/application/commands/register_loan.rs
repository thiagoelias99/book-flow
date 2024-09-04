use crate::{
    application::use_cases,
    domain::{entities::loan::Loan, services::{book_services, loan_services}},
    infrastructure::repositories::{book_repository, loan_repository},
    presentation::dto::loan_register_dto::LoanRegisterDto,
};

#[tauri::command]
pub fn register_loan(data: LoanRegisterDto) -> Result<Loan, String> {
    let repository = loan_repository::LoanRepository::new();
    let services = loan_services::LoanServices::new(repository);

    let book_repository = book_repository::BookRepository::new();
    let book_services = book_services::BookServices::new(book_repository);
    use_cases::register_loan::register_loan(data, &services, &book_services)
}
