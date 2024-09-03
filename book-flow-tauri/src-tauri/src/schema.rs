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
diesel::joinable!(users -> user_levels (level));

diesel::allow_tables_to_appear_in_same_query!(
    book_status,
    books,
    user_levels,
    users,
);
