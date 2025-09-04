# Satellite Trajectory Visualization with CesiumJS

This project calculates and visualizes satellite trajectories using **Two-Line Element (TLE)** data. It provides an interactive 3D experience with **CesiumJS**, running on a **Node.js** server bundled with **webpack**.

## ✨ Features

- **Trajectory Calculation**  
  Computes satellite paths based on provided TLE data and a given "head-up" time.

- **CesiumJS Visualization**  
  - Interactive 3D globe with terrain (disabled by default for performance reasons).  
  - Realistic Earth model with accurate orbital paths.  
  - Single 3D satellite model for performance, with additional satellites shown as graphical icons.  

- **Supported Satellites**  
  The visualization focuses on the **Sentinel satellite family**:
  - Sentinel-1A  
  - Sentinel-1C  
  - Sentinel-2A  
  - Sentinel-2B  
  - Sentinel-2C  

- **View Switching**  
  Easily switch perspectives to inspect exact crossing points of trajectories.
