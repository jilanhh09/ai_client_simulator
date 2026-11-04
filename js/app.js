// ========================================
// AI CLIENT SIMULATOR
// STAGE 1 - 5
// ========================================


// DOM ELEMENTS
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const toast = document.getElementById("toast");

const pages = {
    dashboard: document.getElementById("dashboardPage"),
    practice: document.getElementById("selectClientPage"),
    preparation: document.getElementById("preparationPage"),
    call: document.getElementById("callPage"),
    evaluation: document.getElementById("evaluationPage")
};


// APPLICATION STATE
let selectedClient = null;
let selectedScenario = null;

let conversation = [];
let responseIndex = 0;

let recognition = null;
let timerInterval = null;

let isRecording = false;
let shouldSubmitSpeech = false;
let currentTranscript = "";
let callSeconds = 0;
let callStarted = false;
let lastClientMessage = "";


// ========================================
// GENERAL FUNCTIONS
// ========================================

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


function showPage(pageName) {

    Object.values(pages).forEach(page => {
        if (page) page.classList.remove("active");
    });

    if (pages[pageName]) {
        pages[pageName].classList.add("active");
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );
    });

    const breadcrumb = document.querySelector(".breadcrumb strong");

    const titles = {
        dashboard: "Dashboard",
        practice: "Select AI Client",
        preparation: "Call Preparation",
        call: "AI Voice Call",
        evaluation: "Evaluation"
    };

    if (breadcrumb) {
        breadcrumb.textContent = titles[pageName] || "Dashboard";
    }

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// STAGE 1 - DASHBOARD NAVIGATION
// ========================================

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
}


document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        if (page === "dashboard") {
            showPage("dashboard");
        }

        else if (page === "practice") {
            showPage("practice");
        }

        else {
            showToast("This feature will be developed in the next stage.");
        }

    });

});


const startPracticeButton = document.getElementById("startPractice");

if (startPracticeButton) {
    startPracticeButton.addEventListener("click", () => {
        showPage("practice");
    });
}


// ========================================
// STAGE 2 - SELECT AI CLIENT
// ========================================

function selectClient(clientType) {

    const client = clientScenarios[clientType];

    if (!client) return;

    selectedClient = clientType;
    selectedScenario = null;

    document.querySelectorAll(".selection-card").forEach(card => {

        card.classList.toggle(
            "selected",
            card.dataset.selectClient === clientType
        );

    });

    const selectedPanel = document.getElementById("selectedPanel");
    const selectedName = document.getElementById("selectedName");
    const selectedDescription = document.getElementById("selectedDescription");
    const selectedIcon = document.getElementById("selectedIcon");
    const scenarioSelect = document.getElementById("scenarioSelect");
    const continueButton = document.getElementById("continuePreparation");

    if (selectedPanel) {
        selectedPanel.classList.add("has-selection");
    }

    if (selectedName) {
        selectedName.textContent = client.name;
    }

    if (selectedDescription) {
        selectedDescription.textContent = client.description;
    }

    if (selectedIcon) {
        selectedIcon.className = `fa-solid ${client.icon}`;
    }

    if (scenarioSelect) {

        scenarioSelect.innerHTML =
            '<option value="">Choose a scenario</option>';

        client.scenarios.forEach(scenario => {

            const option = document.createElement("option");

            option.value = scenario.id;
            option.textContent = scenario.name;

            scenarioSelect.appendChild(option);

        });

    }

    if (continueButton) {
        continueButton.disabled = true;
    }

    showToast(`${client.name} selected!`);
}


// Dashboard client cards
document.querySelectorAll(".select-client").forEach(button => {

    button.addEventListener("click", () => {

        const clientType = button.dataset.client;

        showPage("practice");
        selectClient(clientType);

    });

});


// Selection page client cards
document.addEventListener("click", event => {

    const card = event.target.closest("[data-select-client]");

    if (!card) return;

    selectClient(card.dataset.selectClient);

});


// Back to dashboard
const backDashboard = document.getElementById("backDashboard");

if (backDashboard) {
    backDashboard.addEventListener("click", () => {
        showPage("dashboard");
    });
}


// Scenario selection
const scenarioSelect = document.getElementById("scenarioSelect");

if (scenarioSelect) {

    scenarioSelect.addEventListener("change", () => {

        selectedScenario = scenarioSelect.value;

        const continueButton =
            document.getElementById("continuePreparation");

        if (continueButton) {
            continueButton.disabled =
                !(selectedClient && selectedScenario);
        }

    });

}


// Continue to preparation
const continueButton =
    document.getElementById("continuePreparation");

if (continueButton) {

    continueButton.addEventListener("click", () => {

        if (!selectedClient || !selectedScenario) {
            showToast("Please select a client and scenario.");
            return;
        }

        const practiceData = {
            client: selectedClient,
            scenario: selectedScenario
        };

        sessionStorage.setItem(
            "practiceData",
            JSON.stringify(practiceData)
        );

        loadPreparation();

        showPage("preparation");

    });

}


// ========================================
// STAGE 3 - CALL PREPARATION
// ========================================

function getPracticeDetails() {

    if (!selectedClient || !selectedScenario) {
        return null;
    }

    const client = clientScenarios[selectedClient];

    const scenario = client.scenarios.find(item => {
        return item.id === selectedScenario;
    });

    if (!scenario) return null;

    return {
        client,
        scenario
    };

}


function loadPreparation() {

    const data = getPracticeDetails();

    if (!data) return;

    const { client, scenario } = data;

    document.getElementById("prepClientName").textContent =
        client.name;

    document.getElementById("prepClientDescription").textContent =
        client.description;

    document.getElementById("prepClientIcon").innerHTML =
        `<i class="fa-solid ${client.icon}"></i>`;

    document.getElementById("prepScenarioName").textContent =
        scenario.name;

    document.getElementById("prepDifficulty").textContent =
        client.difficulty;

    document.getElementById("prepObjective").textContent =
        scenario.objective;

}


// Back to selection
document.getElementById("backToSelection")
    ?.addEventListener("click", () => {

        showPage("practice");

    });


// Start call
document.getElementById("startCall")
    ?.addEventListener("click", () => {

        startCall();

    });


// ========================================
// STAGE 4 - AI VOICE CALL
// ========================================

function startCall() {

    const data = getPracticeDetails();

    if (!data) {
        showToast("Please select a client and scenario first.");
        showPage("practice");
        return;
    }

    conversation = [];
    responseIndex = 0;
    callSeconds = 0;
    callStarted = true;

    const { client, scenario } = data;

    document.getElementById("callClientName").textContent =
        client.name;

    document.getElementById("callScenarioName").textContent =
        scenario.name;

    document.getElementById("callAvatar").innerHTML =
        `<i class="fa-solid ${client.icon}"></i>`;

    document.getElementById("conversationList").innerHTML = "";

    document.getElementById("messageCount").textContent =
        "0 messages";

    document.getElementById("callTimer").textContent = "00:00";

    showPage("call");

    startTimer();

    // Start conversation with AI client
    addMessage("client", scenario.opening);

    lastClientMessage = scenario.opening;

    speakText(scenario.opening);

}


// Timer
function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        if (!callStarted) return;

        callSeconds++;

        const minutes = Math.floor(callSeconds / 60);
        const seconds = callSeconds % 60;

        document.getElementById("callTimer").textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }, 1000);

}


function stopTimer() {

    clearInterval(timerInterval);

}


// Add conversation message
function addMessage(sender, message) {

    const conversationList =
        document.getElementById("conversationList");

    const emptyMessage =
        conversationList.querySelector(".empty-conversation");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const messageElement = document.createElement("div");

    messageElement.className = `message ${sender}`;

    const senderName =
        sender === "client" ? "AI Client" : "You";

    const nameElement = document.createElement("strong");
    nameElement.textContent = senderName;

    const textElement = document.createElement("div");
    textElement.textContent = message;

    messageElement.appendChild(nameElement);
    messageElement.appendChild(textElement);

    conversationList.appendChild(messageElement);

    conversationList.scrollTop =
        conversationList.scrollHeight;

    conversation.push({
        sender,
        message,
        time: new Date().toISOString()
    });

    document.getElementById("messageCount").textContent =
        `${conversation.length} messages`;

}


// Text to Speech
function speakText(text) {

    if (!("speechSynthesis" in window)) {

        document.getElementById("callStatus").textContent =
            "Text-to-speech is not supported in this browser.";

        return;

    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "id-ID";
    speech.rate = 0.95;
    speech.pitch = 1;

    const indicator =
        document.getElementById("speakingIndicator");

    indicator.classList.add("active");

    document.getElementById("callStatus").textContent =
        "AI Client is speaking...";

    speech.onend = () => {

        indicator.classList.remove("active");

        document.getElementById("callStatus").textContent =
            "Your turn to speak.";

    };

    speech.onerror = () => {

        indicator.classList.remove("active");

        document.getElementById("callStatus").textContent =
            "Audio playback could not be completed.";

    };

    window.speechSynthesis.speak(speech);

}


// Repeat client message
document.getElementById("repeatClient")
    ?.addEventListener("click", () => {

        if (!lastClientMessage) return;

        speakText(lastClientMessage);

    });



// ========================================
// SPEECH RECOGNITION
// ========================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "id-ID";

    // Pengguna bisa berbicara lebih panjang
    recognition.continuous = true;

    // Hanya mengambil hasil ucapan yang sudah dikenali
    recognition.interimResults = false;


    // Ketika mulai merekam
    recognition.onstart = () => {

        isRecording = true;
        currentTranscript = "";

        const micButton =
            document.getElementById("microphoneButton");

        micButton.classList.add("listening");

        micButton.innerHTML =
            '<i class="fa-solid fa-stop"></i>';

        document.getElementById("callStatus").textContent =
            "Sedang mendengarkan... Silakan berbicara.";

        document.getElementById("microphoneHint").textContent =
            "Tekan tombol mikrofon kembali jika sudah selesai berbicara.";

    };


    // Mengumpulkan hasil ucapan pengguna
    recognition.onresult = event => {

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            if (event.results[i].isFinal) {

                currentTranscript +=
                    event.results[i][0].transcript + " ";

            }

        }

    };


    // Jika terjadi kesalahan
    recognition.onerror = event => {

        console.error("Speech Recognition Error:", event.error);

        document.getElementById("microphoneHint").textContent =
            "Terjadi kesalahan saat mengenali suara. Silakan coba lagi.";

    };


    // Ketika proses perekaman berhenti
    recognition.onend = () => {

        isRecording = false;

        const micButton =
            document.getElementById("microphoneButton");

        micButton.classList.remove("listening");

        micButton.innerHTML =
            '<i class="fa-solid fa-microphone"></i>';


        // Jawab hanya jika pengguna menekan tombol selesai
        if (shouldSubmitSpeech) {

            shouldSubmitSpeech = false;

            const userText = currentTranscript.trim();

            if (userText.length > 0) {

                document.getElementById("microphoneHint").textContent =
                    "Jawaban terkirim. Menunggu respons klien...";

                handleUserSpeech(userText);

            } else {

                document.getElementById("microphoneHint").textContent =
                    "Suara belum terdeteksi. Silakan coba berbicara kembali.";

            }

        } else {

            document.getElementById("callStatus").textContent =
                "Tekan mikrofon untuk mulai berbicara.";

        }

    };

}


// ========================================
// MICROPHONE BUTTON
// ========================================

document.getElementById("microphoneButton")
    ?.addEventListener("click", () => {

        if (!recognition) {

            showToast(
                "Browser tidak mendukung pengenalan suara. Gunakan Chrome atau Edge."
            );

            return;

        }

        if (!callStarted) return;


        // Jika belum merekam, mulai merekam
        if (!isRecording) {

            currentTranscript = "";
            shouldSubmitSpeech = false;

            try {

                recognition.start();

            } catch (error) {

                showToast("Mikrofon sedang digunakan. Coba beberapa saat lagi.");

            }

        }

        // Jika sedang merekam, hentikan dan kirim jawaban
        else {

            shouldSubmitSpeech = true;

            document.getElementById("callStatus").textContent =
                "Memproses jawaban Anda...";

            recognition.stop();

        }

    });



// Handle user speech

function handleUserSpeech(userText) {

    if (!callStarted) return;

    // Tampilkan jawaban pengguna
    addMessage("user", userText);

    const data = getPracticeDetails();

    if (!data) return;

    const responses = data.scenario.responses;

    // Ambil respons klien berikutnya
    const clientResponse =
        responses[responseIndex % responses.length];

    responseIndex++;

    document.getElementById("callStatus").textContent =
        "Klien sedang menyiapkan jawaban...";

    // Berikan jeda sebelum klien menjawab
    setTimeout(() => {

        if (!callStarted) return;

        addMessage("client", clientResponse);

        lastClientMessage = clientResponse;

        // Klien mulai berbicara setelah pengguna selesai
        speakText(clientResponse);

    }, 1200);

}



// End call
document.getElementById("endCall")
    ?.addEventListener("click", () => {

        if (!callStarted) return;

        const confirmed = confirm(
            "Are you sure you want to end this practice call?"
        );

        if (!confirmed) return;

        finishCall();

    });


function finishCall() {

    callStarted = false;

    stopTimer();

    if (recognition) {
        recognition.stop();
    }

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    const sessionData = {

        client: selectedClient,
        scenario: selectedScenario,
        conversation: conversation,
        duration: callSeconds,
        completedAt: new Date().toISOString()

    };

    sessionStorage.setItem(
        "lastSession",
        JSON.stringify(sessionData)
    );

    loadEvaluation(sessionData);

    showPage("evaluation");

}


// ========================================
// STAGE 5 - EVALUATION
// ========================================

function calculateScore(session) {

    const userMessages = session.conversation.filter(item => {
        return item.sender === "user";
    });

    const clientMessages = session.conversation.filter(item => {
        return item.sender === "client";
    });

    const totalUserMessages = userMessages.length;

    const totalClientMessages = clientMessages.length;

    // Simple rule-based scoring
    const participationScore =
        Math.min(totalUserMessages * 15, 45);

    const interactionScore =
        totalClientMessages >= 3 ? 30 :
        totalClientMessages >= 2 ? 25 :
        totalClientMessages >= 1 ? 15 : 0;

    const durationScore =
        session.duration >= 60 ? 25 :
        session.duration >= 30 ? 20 :
        session.duration > 0 ? 10 : 0;

    return Math.min(
        participationScore + interactionScore + durationScore,
        100
    );

}


function getScoreFeedback(score) {

    if (score >= 85) {

        return {
            title: "Excellent Practice!",
            description: "You demonstrated strong participation during this session."
        };

    }

    if (score >= 70) {

        return {
            title: "Good Practice!",
            description: "You are making good progress. Keep practicing."
        };

    }

    if (score >= 50) {

        return {
            title: "Keep Improving!",
            description: "Try to participate more actively in the next session."
        };

    }

    return {
        title: "More Practice Needed",
        description: "Continue practicing to build your communication confidence."
    };

}


function loadEvaluation(session) {

    const score = calculateScore(session);

    const feedback = getScoreFeedback(score);

    const client = clientScenarios[session.client];

    const scenario = client.scenarios.find(item => {
        return item.id === session.scenario;
    });

    const minutes = Math.floor(session.duration / 60);
    const seconds = session.duration % 60;

    const userMessages = session.conversation.filter(item => {
        return item.sender === "user";
    });

    document.getElementById("finalScore").textContent =
        score;

    document.getElementById("scoreFeedback").textContent =
        feedback.title;

    document.getElementById("scoreDescription").textContent =
        feedback.description;

    document.getElementById("resultClient").textContent =
        client.name;

    document.getElementById("resultScenario").textContent =
        scenario.name;

    document.getElementById("resultDuration").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.getElementById("resultMessages").textContent =
        session.conversation.length;


    const feedbackList =
        document.getElementById("feedbackList");

    feedbackList.innerHTML = "";


    const suggestions = [

        userMessages.length >= 3
            ? "You actively participated in the conversation."
            : "Try to give more responses and maintain the conversation.",

        session.duration >= 60
            ? "You spent sufficient time practicing this scenario."
            : "Try to develop your answers with more relevant details.",

        userMessages.length > 0
            ? "Continue practicing clear and professional communication."
            : "Remember to use the microphone to participate in the conversation."

    ];


    suggestions.forEach(suggestion => {

        const item = document.createElement("div");

        item.className = "feedback-item";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-circle-check";

        const text = document.createElement("span");
        text.textContent = suggestion;

        item.appendChild(icon);
        item.appendChild(text);

        feedbackList.appendChild(item);

    });

}


// Practice Again
document.getElementById("practiceAgain")
    ?.addEventListener("click", () => {

        showPage("practice");

    });


// Back to Dashboard
document.getElementById("backToDashboard")
    ?.addEventListener("click", () => {

        showPage("dashboard");

    });


// INITIALIZATION
console.log("AI Client Simulator - Stage 1 to 5 Loaded");