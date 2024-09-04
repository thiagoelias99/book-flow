use uuid::Uuid;

use crate::{domain::entities::book::Book, infrastructure::repositories::book_repository::BookRepository, presentation::dto::book_register_dto::BookRegisterDto};

pub struct BookServices {
    book_repository: BookRepository,
}

impl BookServices {
    pub fn new(book_repository: BookRepository) -> Self {
        BookServices {
            book_repository: book_repository,
        }
    }

    pub fn register_book(&self, data: BookRegisterDto) -> Result<Book, String> {
        let id = Uuid::new_v4().to_string();
        
        let book = Book {
            id: id,
            title: data.title,
            author: data.author,
            isbn: data.isbn,
            status: data.status,
        };

        self.book_repository.save(book)
    }

    pub fn get_all(&self) -> Result<Vec<Book>, String> {
        self.book_repository.get_all()
    }
}
