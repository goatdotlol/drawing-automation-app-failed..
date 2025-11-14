// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod drawing_engine;
mod mouse_control;
mod image_processing;

use drawing_engine::{DrawingMethod, DrawingConfig, DrawingPoint, CanvasBounds, DrawingEngine};
use drawing_engine::matrix_dot::MatrixDotEngine;
use mouse_control::automation::MouseAutomation;
use mouse_control::path_optimizer::optimize_path;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize)]
struct StartDrawingRequest {
    image_data: Vec<u8>,
    method: String,
    speed: u8,
    canvas_bounds: CanvasBoundsRequest,
    color_palette: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CanvasBoundsRequest {
    x: i32,
    y: i32,
    width: u32,
    height: u32,
}

static AUTOMATION: Mutex<Option<MouseAutomation>> = Mutex::new(None);

#[tauri::command]
fn start_drawing(request: StartDrawingRequest) -> Result<String, String> {
    let method = match request.method.as_str() {
        "matrix-dot" => DrawingMethod::MatrixDot,
        "floyd-steinberg" => DrawingMethod::FloydSteinberg,
        "continuous-line" => DrawingMethod::ContinuousLine,
        "spiral-raster" => DrawingMethod::SpiralRaster,
        _ => return Err("Unknown drawing method".to_string()),
    };

    let config = DrawingConfig {
        method,
        speed: request.speed,
        canvas_bounds: CanvasBounds {
            x: request.canvas_bounds.x,
            y: request.canvas_bounds.y,
            width: request.canvas_bounds.width,
            height: request.canvas_bounds.height,
        },
        color_palette: request.color_palette,
    };

    // Process image based on method
    let engine: Box<dyn DrawingEngine> = match config.method {
        DrawingMethod::MatrixDot => Box::new(MatrixDotEngine),
        _ => return Err("Method not yet implemented".to_string()),
    };

    let points = engine.process_image(request.image_data, &config);
    let optimized_points = optimize_path(points);

    // Start mouse automation (in a separate thread)
    std::thread::spawn(move || {
        let mut automation = MouseAutomation::new();
        let _ = automation.start_drawing(optimized_points, config.speed, |current, total| {
            // Progress callback - could emit event to frontend
            println!("Progress: {}/{}", current, total);
        });
    });

    Ok("Drawing started".to_string())
}

#[tauri::command]
fn stop_drawing() -> Result<String, String> {
    if let Ok(mut automation) = AUTOMATION.lock() {
        if let Some(ref auto) = *automation {
            // Stop logic
        }
    }
    Ok("Drawing stopped".to_string())
}

#[tauri::command]
fn pause_drawing() -> Result<String, String> {
    Ok("Drawing paused".to_string())
}

#[tauri::command]
fn resume_drawing() -> Result<String, String> {
    Ok("Drawing resumed".to_string())
}

#[tauri::command]
fn capture_screenshot() -> Result<Vec<u8>, String> {
    // TODO: Implement screenshot capture using screenshots crate
    Err("Not implemented yet".to_string())
}

#[tauri::command]
fn detect_color_palette(image_data: Vec<u8>) -> Result<Vec<String>, String> {
    // TODO: Implement color palette detection
    Ok(vec!["#000000".to_string(), "#FFFFFF".to_string()])
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_drawing,
            stop_drawing,
            pause_drawing,
            resume_drawing,
            capture_screenshot,
            detect_color_palette
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
