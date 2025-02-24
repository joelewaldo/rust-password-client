pub mod utility;

use tauri::{Builder, Manager};
use std::sync::Mutex;

use tauri::AppHandle;

use tauri::Wry;
use tauri_plugin_store::StoreExt;
use serde_json::json;

#[tauri::command]
fn get_db_url(app: AppHandle) -> Result<Option<String>, tauri_plugin_store::Error> {
    let store = app.app_handle().store("store.json")?;

    Ok(store
        .get("db-url")
        .and_then(|value| value.as_str().map(|s| s.to_string())))
}
#[tauri::command]
fn set_db_url(app: AppHandle, url: String) -> Result<bool, tauri_plugin_store::Error> {
    let store = app.app_handle().store("store.json")?;
    store.set("db-url", url);
    store.save()?;
    Ok(true)
}

#[tauri::command]
fn generate_key() -> String {
    utility::encryption::generate_key()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_db_url, set_db_url, generate_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
