pub mod matrix_dot;
pub mod dithering;
pub mod continuous_line;
pub mod spiral_raster;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DrawingMethod {
    MatrixDot,
    FloydSteinberg,
    ContinuousLine,
    SpiralRaster,
    Scanline,
    Stippling,
    ContourVector,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DrawingPoint {
    pub x: i32,
    pub y: i32,
    pub color: String, // Hex color
    pub size: u8,      // Dot size (0-255)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DrawingConfig {
    pub method: DrawingMethod,
    pub speed: u8, // 1-10
    pub canvas_bounds: CanvasBounds,
    pub color_palette: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CanvasBounds {
    pub x: i32,
    pub y: i32,
    pub width: u32,
    pub height: u32,
}

pub trait DrawingEngine: Send + Sync {
    fn process_image(&self, image_data: Vec<u8>, config: &DrawingConfig) -> Vec<DrawingPoint>;
}

