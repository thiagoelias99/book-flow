// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod application;
pub mod domain;
pub mod infrastructure;
pub mod schema;

use application::use_cases;
use domain::services;
use infrastructure::repositories::user_repository;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_user_by_user_name(user_name: &str) -> String {
    println!("User name: {}", user_name);
    // Must always receive and return a string

    // Create dependencies
    let user_repository = user_repository::UserRepository::new();
    let user_services = services::user_services::UserServices::new(user_repository);

    // Call use case
    let user = use_cases::get_user::get_user_by_user_name(user_name, &user_services);
    serde_json::to_string(&user).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_user_by_user_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
