// @generated automatically by Diesel CLI.

diesel::table! {
    book_status (slug) {
        slug -> Text,
        description -> Text,
    }
}

diesel::table! {
    books (id) {
        id -> Text,
        title -> Text,
        author -> Text,
        isbn -> Text,
        status -> Text,
    }
}

diesel::table! {
    loan_status (slug) {
        slug -> Text,
        description -> Text,
    }
}

diesel::table! {
    loans (id) {
        id -> Text,
        book_id -> Text,
        user_id -> Text,
        loan_date -> Timestamp,
        return_date -> Timestamp,
        status -> Text,
    }
}

diesel::table! {
    user_levels (slug) {
        slug -> Text,
        description -> Text,
    }
}

diesel::table! {
    users (id) {
        id -> Text,
        name -> Text,
        user_name -> Text,
        password -> Text,
        level -> Text,
    }
}

diesel::joinable!(books -> book_status (status));
diesel::joinable!(loans -> books (book_id));
diesel::joinable!(loans -> loan_status (status));
diesel::joinable!(loans -> users (user_id));
diesel::joinable!(users -> user_levels (level));

diesel::allow_tables_to_appear_in_same_query!(
    book_status,
    books,
    loan_status,
    loans,
    user_levels,
    users,
);
