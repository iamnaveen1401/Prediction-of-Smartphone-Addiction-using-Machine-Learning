# 📱 Prediction of Smartphone Addiction using Machine Learning

## 🧠 Overview
This project presents an **AI-powered web application** that predicts smartphone addiction levels based on user behavior.  
By analyzing data such as screen time, app usage, night usage, and unlock frequency, the system classifies users into **Low**, **Moderate**, or **High** addiction levels and provides personalized recommendations to improve digital well-being.

Developed as a **Final Year B.Tech Project** at *Bannari Amman Institute of Technology*, this application uses **Machine Learning** and **Cloud-based Technologies** to provide **real-time predictions**, **interactive dashboards**, and **secure data management**.

---

## 🎯 Objectives
- Predict smartphone addiction levels using behavioral data.
- Provide personalized recommendations for digital well-being.
- Offer an interactive dashboard for visualizing addiction trends.
- Ensure secure authentication and data privacy.
- Support scalable, real-time cloud storage and analysis.

---

## ⚙️ System Architecture
The system integrates multiple technologies across five layers:

1. **Frontend Layer:** React.js & TailwindCSS  
   Provides an interactive dashboard for uploading data and visualizing addiction levels.

2. **Backend Layer:** Flask (Python)  
   Handles machine learning model inference and API communication.

3. **Database Layer:** Firebase Firestore  
   Stores user information, predictions, and addiction history.

4. **Storage Layer:** Firebase Storage  
   Secures user-uploaded CSV files and other resources.

5. **Authentication Layer:** Firebase Auth + JWT  
   Ensures secure user authentication and access control.

---

## 2️⃣ Setup the Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## 3️⃣ Setup the Frontend (React.js)
```bash
cd frontend
npm install
npm start
```

---

## 4️⃣ Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com).  
2. Create a new Firebase project.  
3. Enable **Authentication**, **Firestore Database**, and **Storage**.  
4. Copy your Firebase configuration and paste it into:
   ```
   /frontend/src/firebaseConfig.js
   ```

---

## 📊 Features
- **Machine Learning Prediction** – Predicts user’s addiction level: *Low*, *Moderate*, or *High*.  
- **Interactive Dashboard** – Displays predictions, analytics, and behavioral trends.  
- **Historical Tracking** – Stores and visualizes previous addiction assessments.  
- **Email Notifications** – Automatically sends addiction reports and recommendations.  
- **Secure Data Handling** – Uses AES-256 encryption for user data.  
- **Authentication System** – Firebase Auth ensures secure and private user access.  
- **Cloud Integration** – Real-time updates via Firebase Firestore.  

---

## 🔒 Security and Privacy
- **AES-256 Encryption** for all sensitive user data.  
- **JWT-based Authentication** for backend API protection.  
- **Role-Based Access Control (RBAC)** to manage user permissions.  
- **Secure HTTPS Communication** between frontend and backend.  
- **Automatic Cloud Backups** for data protection and recovery.  
- **Two-Factor Authentication (2FA)** option for enhanced account security.  

---

## 📈 Results and Analysis
- Achieved **>90% accuracy** in addiction level classification using Random Forest.  
- Real-time prediction response within **seconds**.  
- Interactive dashboard helps users understand their screen time trends visually.  
- Personalized recommendations effectively support **digital detox** strategies.  

---

## 🧠 Key Insights
- Excessive **screen time** and frequent **unlock frequency** strongly correlate with high addiction levels.  
- **Night-time usage** and prolonged **social media engagement** indicate potential digital dependency.  
- The system assists users in becoming more **self-aware** and promotes responsible mobile usage.  

---

## 🚀 Future Enhancements
- Integrate **Android and iOS APIs** for real-time data collection.  
- Expand the dataset to improve ML accuracy.  
- Add **Deep Learning models** for better behavioral prediction.  
- Provide **Gamified Challenges** and digital detox reminders.  
- Build a **Mobile App Version** for broader accessibility.  
- Introduce **AI Coaching** and Personalized Goal Tracking.  

---

## 🏁 Conclusion
The **Prediction of Smartphone Addiction System** is a complete, cloud-based AI solution that analyzes mobile usage behavior to promote digital wellness.  
It provides **accurate addiction predictions**, **real-time dashboards**, and **personalized insights**, helping users identify harmful digital habits and adopt a balanced approach to smartphone use.

This project demonstrates the potential of **Machine Learning** and **Cloud Integration** in addressing modern digital health challenges effectively.  

---

## 👨‍💻 Contributors
| Name | Role | Responsibilities |
|------|------|------------------|
| **Naveen M** | Machine Learning Engineer | Dataset collection, preprocessing, model training, and backend integration |
| **Sri Guhan Prasanna T** | Backend Developer | Flask backend, Firebase setup, API integration, and system design |
| **Harish V** | Frontend Developer | React.js dashboard design, UI/UX implementation, and visualization |

---

## 🧾 References
1. Ali, M., Rehman, M., & Ahmed, S. (2018). *Identifying Behavioral Trends in Mobile Phone Usage Using IoT-Based Tracking Systems.*  
2. Sharma, R., & Verma, K. (2021). *The Role of Machine Learning in Predicting and Managing Mobile Phone Addiction.*  
3. Kaur, G., & Singh, J. (2020). *Real-Time Tracking of Mobile Usage for Mental Health Monitoring: A Study on Behavioral Applications.*  
4. Gupta, A., & Malhotra, P. (2020). *Leveraging Cloud Computing for Smartphone Usage Monitoring and Prediction.*

---

## 📬 Contact
**Author:** Naveen M  
**Institution:** Bannari Amman Institute of Technology  
**Email:** naveen.m@example.com  
**GitHub:** [https://github.com/yourusername](https://github.com/yourusername)
