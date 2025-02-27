import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAcyBLG5mcrxyEwbBsyq4xX2Hh2Es6L1Ok",
    authDomain: "portfolio-ce615.firebaseapp.com",
    projectId: "portfolio-ce615",
    storageBucket: "portfolio-ce615.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const profilePic = document.getElementById('profile-pic');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userCreated = document.getElementById('user-created');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            userName.textContent = data.name || "No Name Provided";
            userEmail.textContent = user.email;  // Firebase Auth provides email
            userPhone.textContent = data.phone || "No Phone Provided";
            userCreated.textContent = new Date(user.metadata.creationTime).toLocaleDateString();
            profilePic.src = data.profilePic || "default-profile.png";
        }
    } else {
        window.location.href = "login_signup.html"; // Redirect to login if not logged in
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        Swal.fire({
            title: "Logged Out",
            text: "You have been logged out successfully!",
            icon: "info",
            timer: 3000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "login.html";
        });
    } catch (error) {
        Swal.fire({
            title: "Logout Failed!",
            text: error.message,
            icon: "error"
        });
    }
});
