use crate::{
    domain::{
        entities::loan::Loan,
        services::{book_services::BookServices, loan_services::LoanServices},
    },
    presentation::dto::loan_register_dto::LoanRegisterDto,
};

pub fn register_loan(
    data: LoanRegisterDto,
    loan_services: &LoanServices,
    book_service: &BookServices,
) -> Result<Loan, String> {
    let loan = loan_services.register_loan(data);

    let loan_copy = loan.clone();

    if loan_copy.is_ok() {
        let selected_book_id = loan_copy.unwrap().book_id.clone();
        let book = book_service.set_book_status(&selected_book_id, "borrowed");

        if book.is_err() {
            return Err(book.unwrap_err());
        }
    }
    return loan;
}
