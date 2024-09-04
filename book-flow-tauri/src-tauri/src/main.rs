// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod application;
pub mod domain;
pub mod infrastructure;
pub mod presentation;
pub mod schema;

use application::use_cases;
use domain::{entities::user::User, services};
use infrastructure::repositories::user_repository;
use presentation::dto::{login::LoginDto, updated_user_role_dto::UpdatedUserRoleDto, user_register_dto::UserRegisterDto};

#[tauri::command]
fn get_all_users() -> Result<Vec<User>, String> {
    // Create dependencies
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);

    // Call use case
    use_cases::get_user::get_all(&user_services)
}

#[tauri::command]
fn get_user_by_user_name(user_name: &str) -> Option<User> {
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);
    use_cases::get_user::get_user_by_user_name(user_name, &user_services)
}

#[tauri::command]
fn register_user(user_register_dto: UserRegisterDto) -> Result<User, String> {
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);
    use_cases::register_user::register_user_from_dto(user_register_dto, &user_services)
}

#[tauri::command]
fn update_user_role(data: UpdatedUserRoleDto) -> Result<User, String> {
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);
    use_cases::update_user::update_user_role(data, &user_services)
}

#[tauri::command]
fn login(data: LoginDto) -> Result<User, String> {
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);
    use_cases::login::login_from_user_name(data, &user_services)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_all_users,
            get_user_by_user_name,
            register_user,
            update_user_role,
            login,
            application::commands::register_book::register_book,
            application::commands::get_book::get_all_books,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
