pub fn find_closest_color(target_color: (u8, u8, u8), palette: &[String]) -> String {
    if palette.is_empty() {
        return "#000000".to_string();
    }

    let mut best_color = &palette[0];
    let mut best_distance = f64::MAX;

    for color_hex in palette {
        if let Some(rgb) = hex_to_rgb(color_hex) {
            let distance = color_distance(target_color, rgb);
            if distance < best_distance {
                best_distance = distance;
                best_color = color_hex;
            }
        }
    }

    best_color.clone()
}

fn hex_to_rgb(hex: &str) -> Option<(u8, u8, u8)> {
    let hex = hex.trim_start_matches('#');
    if hex.len() != 6 {
        return None;
    }

    let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
    let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
    let b = u8::from_str_radix(&hex[4..6], 16).ok()?;

    Some((r, g, b))
}

fn color_distance(c1: (u8, u8, u8), c2: (u8, u8, u8)) -> f64 {
    // Simple Euclidean distance in RGB space
    // TODO: Implement CIE Lab color space and Delta E 2000 for better accuracy
    let dr = c1.0 as f64 - c2.0 as f64;
    let dg = c1.1 as f64 - c2.1 as f64;
    let db = c1.2 as f64 - c2.2 as f64;
    (dr * dr + dg * dg + db * db).sqrt()
}

