// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod application;
pub mod domain;
pub mod infrastructure;
pub mod schema;
pub mod presentation;

use application::use_cases;
use domain::{entities::user::User, services};
use infrastructure::repositories::user_repository;
use presentation::dto::user_register_dto::UserRegisterDto;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_user_by_user_name(user_name: &str) -> Option<User> {
    // Create dependencies
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);

    // Call use case
    use_cases::get_user::get_user_by_user_name(user_name, &user_services)
}

#[tauri::command]
fn register_user(user_register_dto: UserRegisterDto) -> Result<User, String> {
    // Create dependencies
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);

    // Call use case
    use_cases::register_user::register_user_from_dto(user_register_dto, &user_services)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_user_by_user_name, register_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
