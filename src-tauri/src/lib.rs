pub mod utility;

// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

#[tauri::command]
fn generate_key() -> String {
    utility::encryption::generate_key()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
