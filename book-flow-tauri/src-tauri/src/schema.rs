// @generated automatically by Diesel CLI.

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

diesel::joinable!(users -> user_levels (level));

diesel::allow_tables_to_appear_in_same_query!(
    user_levels,
    users,
);
