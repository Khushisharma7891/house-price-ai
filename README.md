# House Price AI

<p align="center">
  <img src="https://1drv.ms/i/c/cbddefed6e0a6274/IQCj35OSpGjcSLG9TDqBXZp9AQjt1HxfaEKnML4xNeCN1Gg?e=C8bZ1X" alt="House Price AI Banner" width="100%" />
</p>

<p align="center">
  <strong>AI-Powered California House Price Prediction using Machine Learning</strong>
</p>

<p align="center">
  A full-stack Machine Learning web application built to predict California house prices using multiple regression models and deployed with React + Flask.
</p>

---

## Overview

**House Price AI** is an end-to-end Machine Learning project developed as a **Full stack developer**.

This project demonstrates a complete machine learning workflow — starting from raw data collection and preprocessing to model training, evaluation, and deployment as a real-world web application.

The project uses the **California Housing Dataset** from the **1990 US Census**, where each record represents a block group in California, including:

- Location
- Housing age
- Total rooms
- Population
- Median income

The main objective of this project is to **predict median house prices using Machine Learning algorithms** and compare model performance to select the most accurate prediction model.

---

## Live Demo

**Website:**  
[House Price AI Live Demo](https://house-price-ai-beta.vercel.app/)

---

## Features

- Real-time house price prediction
- Full-stack Machine Learning integration
- Interactive and responsive UI
- California Housing Dataset implementation
- Data preprocessing and feature engineering
- Exploratory Data Analysis (EDA)
- Correlation analysis and visualizations
- Comparison of multiple ML models
- Model evaluation and accuracy comparison
- Random Forest model deployment
- Responsive modern frontend using React + Tailwind CSS
- Flask backend API integration

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Flask (Python)

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Matplotlib
- Seaborn

### Database
- MongoDB Atlas

### Development Tools
- Jupyter Notebook
- Visual Studio Code
- Git & GitHub
- Figma
- Excel

### Deployment
- Vercel
- Render

---

## Machine Learning Models Used

The following regression models were trained and compared:

### 1. Linear Regression
Used as a baseline model for prediction.

### 2. Decision Tree Regressor
Used for non-linear pattern learning.

### 3. Random Forest Regressor
Selected as the best-performing model with:

**R² Score: 78.5%**

### 4. Gradient Boosting Regressor
Used for comparison and performance evaluation.

After comparing all models, **Random Forest Regressor** delivered the best prediction accuracy and was selected for deployment.

---

## Project Workflow

The project follows a complete end-to-end machine learning pipeline:

```text
Dataset Collection
        ↓
Data Understanding
        ↓
Data Preprocessing
        ↓
Exploratory Data Analysis (EDA)
        ↓
Feature Engineering
        ↓
Model Training
        ↓
Model Comparison
        ↓
Model Evaluation
        ↓
Best Model Selection
        ↓
Flask API Development
        ↓
React Frontend Development
        ↓
Deployment
```

---

## Dataset Information

The dataset was collected from **Kaggle** and converted into CSV format for analysis.

The dataset contains housing-related information from the California housing market including:

- Longitude
- Latitude
- Housing Median Age
- Total Rooms
- Total Bedrooms
- Population
- Households
- Median Income

Target Variable:

**Median House Value**

---

## Data Preprocessing

The following preprocessing techniques were applied:

- Data cleaning
- Missing value handling
- Feature selection
- Data transformation
- Data formatting
- Correlation analysis

---

## Exploratory Data Analysis (EDA)

EDA was performed to understand hidden patterns and feature relationships using:

- Heatmaps
- Correlation Matrix
- Data Visualization
- Statistical Analysis
- Distribution Graphs

---

## Project Structure

```bash
House-Price-AI/
│── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── requirements.txt
│
│── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│
│── notebook/
│   ├── data_preprocessing.ipynb
│   ├── model_training.ipynb
│   ├── eda_visualization.ipynb
│
│── dataset/
│   ├── housing.csv
│
│── README.md
```

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/khushisharma7891/house-price-ai.git
```

### Navigate to Project

```bash
cd house-price-ai
```

### Backend Setup

```bash
pip install -r requirements.txt
python app.py
```

### Frontend Setup

```bash
npm install
npm run dev
```

---

## How It Works

1. User enters house-related information.

2. Data is sent to the Flask backend API.

3. The trained Machine Learning model processes the input.

4. Random Forest algorithm predicts the estimated house price.

5. The result is displayed instantly on the frontend.

---

## Screenshots

### Home Page

ss.

```md
ss
```

---

## Future Improvements

- User authentication system
- Advanced analytics dashboard
- Better prediction visualization
- More datasets integration
- Enhanced AI recommendations
- Real estate trend analysis

---

## Author

**Khushi Sharma**

Web Developer  
Machine Learning & Full Stack Development Enthusiast

GitHub:  
https://github.com/khushisharma7891

---

## License

This project is created for **educational and academic purposes**.
