# 🎨 Shader Processing

A lightweight WebGL shader sandbox built with vanilla HTML, CSS, and JavaScript. It renders a full-screen quad driven by custom GLSL vertex and fragment shaders, currently showcasing a procedural pulsing solar sphere generated with 5-octave Fractional Brownian Motion (FBM) noise and a glowing corona.

## ✨ Features

- **Pure WebGL Pipeline**: Compiles and links vertex/fragment shaders directly using the WebGL API without external libraries.
- **CORS-Free Local Execution**: Shader sources are wrapped inside JavaScript template literals (`vertexShader.js` and `fragmentShader.js`) so `index.html` can be opened directly via `file://` without requiring a local HTTP server.
- **Procedural FBM Noise**: Implements a 2D value noise and 5-octave FBM in GLSL, along with a signed distance segment helper (`sdSegment`) ready for further experimentation.
- **Interactive Panning**: Smooth keyboard-driven viewport offset (`u_offsetScreen`).

## 📂 Project Structure

```text
Shader-Processing/
├── index.html
└── Files/
    └── Scripts/
        ├── css/
        │   └── main.css
        └── js/
            ├── vertexShader.js     # GLSL vertex shader wrapped in JS
            ├── fragmentShader.js   # GLSL fragment shader wrapped in JS
            ├── shaderManager.js    # WebGL context, shader compilation, buffers & uniforms
            └── main.js             # Render loop & keyboard input handling
```

## ⌨️ Controls

| Key | Action |
| :--- | :--- |
| `W` / `ArrowUp` | Pan view up |
| `S` / `ArrowDown` | Pan view down |
| `A` / `ArrowLeft` | Pan view left |
| `D` / `ArrowRight` | Pan view right |

## 🖥️ Requirements & Platform

- Any modern web browser with **WebGL** support (Chrome, Firefox, Edge, Safari).
- Runs directly by opening `index.html` in a browser—no build step or server required.

## ⚠️ Notes & Limitations

- Panning uses a fixed step (`0.01` per animation frame) rather than delta-time scaling, so movement speed depends on the display refresh rate.
- Shaders are stored in `.js` files rather than standalone `.glsl` files to avoid `file://` CORS restrictions; `.gitattributes` is configured so GitHub still recognizes them as GLSL.

## 🛠️ Details

The project has been created the February 2nd of 2026.
