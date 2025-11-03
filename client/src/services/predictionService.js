import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase"; // Import initialized Firebase Functions

// This service will send user data to a callable function deployed in Firebase Functions.
// The callable function will run the ML logic and return addiction prediction.

const predictMobileAddiction = async (usageData) => {
    try {
        const predictAddictionLevel = httpsCallable(functions, 'predictAddictionLevel');
        
        // Sending user’s mobile usage data (this comes from your form or dashboard)
        const response = await predictAddictionLevel(usageData);

        return response.data; // This should contain { level: "Low" / "Moderate" / "High", recommendation: "Some advice" }
    } catch (error) {
        console.error("Prediction failed:", error);
        throw new Error("Failed to get prediction. Please try again.");
    }
};

export { predictMobileAddiction };
