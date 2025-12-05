use tauri::{ WebviewUrl, WebviewWindowBuilder };

#[tauri::command]
fn greet(name: &str) -> String {
	format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder
		::default()
		.plugin(tauri_plugin_dialog::init())
		.plugin(tauri_plugin_fs::init())
		.plugin(tauri_plugin_opener::init())
		.invoke_handler(tauri::generate_handler![greet])
		.setup(|app| {
			let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
				.title("")
				.inner_size(1200.0, 800.0);

			#[cfg(target_os = "macos")]
			let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

			let window = win_builder.build()?;

			#[cfg(target_os = "macos")]
			{
				if let Ok(theme) = window.theme() {
					let color = match theme {
						Theme::Light => Color(247, 250, 252, 255),
						Theme::Dark => Color(26, 32, 44, 255),
						_ => Color(247, 250, 252, 255),
					};
					let _ = window.set_background_color(Some(color));
				} else {
					let _ = window.set_background_color(Some(Color(247, 250, 252, 255)));
				}
			}

			window.on_window_event(move |event| {
				if let tauri::WindowEvent::ThemeChanged(_theme) = event {
					#[cfg(target_os = "macos")]
					{
						let color = match theme {
							Theme::Light => Color(247, 250, 252, 255),
							Theme::Dark => Color(26, 32, 44, 255),
							_ => Color(247, 250, 252, 255),
						};
						let _ = window_clone.set_background_color(Some(color));
					}
				}
			});

			Ok(())
		})
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
