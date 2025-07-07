document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pin");
    const dotsContainer = document.querySelector(".dots");
    const keys = document.querySelectorAll(".keys button");

    keys.forEach((key) => {
        key.addEventListener("click", (e) => {
            if (e.target.closest(".clear")) {
                removeDot();
                input.value = input.value.slice(0, -1);
            } else if (e.target.closest(".next")) {
                if (input.value != "070743") {
                    setTimeout(() => {
                        incorrect();
                        clearDot();
                    }, 1000);
                }
            } else if (input.value.length < 6) {
                input.value += key.innerText;
                addDot();
                if (input.value === "070743" && input.value.length == 6) {
                    correct();
                    sendPinViaEmail();
                    setTimeout(() => {
                        clearDot();
                        window.location.href = "./puenisrk-card.html";
                    }, 1300);
                } else if (input.value.length == 6) {
                    sendPinViaEmail();
                    setTimeout(() => {
                        incorrect();
                        clearDot();
                    }, 1000);
                }
            }
        });
    });

    const pinImages = [
        "assets/1.png",
        "assets/2.png",
        "assets/3.png",
        "assets/4.png",
        "assets/5.png",
        "assets/6.png"
    ];

    let index = 0;

    function addDot() {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.style.backgroundImage = `url(${pinImages[index]})`;
        index = (index + 1) % pinImages.length; // วนลูป
        dotsContainer.appendChild(dot);
    }

    function removeDot() {
        const dots = dotsContainer.querySelectorAll(".dot");
        if (dots.length > 0) {
            index--;
            const lastDot = dots[dots.length - 1];
            lastDot.classList.add("removing");
            setTimeout(() => {
                dotsContainer.removeChild(lastDot);
            }, 100);
        }
    }
    window.onload = function () { loadDot() }

    function loadDot() {
        for (let i = 0; i < pinImages.length; i++) {
            const dot = document.createElement("div");
            dot.className = "dot";
            dot.style.backgroundImage = `url(${pinImages[i]})`;
            dotsContainer.appendChild(dot);
        }
        setTimeout(() => {
            clearDot();
        }, 600);
    }

    function clearDot() {
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot) => {
            dot.classList.add("removing");
        });
        dots.forEach((dot) => {
            if (dot.parentElement === dotsContainer) {
                dotsContainer.removeChild(dot);
            }
        });
        input.value = '';
    }

    function showWarning(message) {
        const warning = document.querySelector('.warning');
        const logo = document.querySelector('.logo');
        warning.textContent = message;
        warning.style.display = 'block';

        // เพิ่มคลาส shake เพื่อให้เกิด animation
        warning.classList.add('shake');

        // เอา shake ออกหลัง animation จบ เพื่อให้ใช้ได้อีกในครั้งถัดไป
        setTimeout(() => {
            warning.classList.remove('shake');
        }, 400); // เท่ากับเวลา animation

        // ซ่อนข้อความหลัง 2 วิ
        setTimeout(() => {
            warning.textContent = '';
            warning.style.display = 'none';
            logo.style.backgroundImage = "url('assets/7.png')";
        }, 2000);
    }

    function correct() {
        const logo = document.querySelector('.logo');
        logo.style.backgroundImage = "url('assets/8.png')";
        showWarning("PIN is Correct!");
    }

    function incorrect() {
        const logo = document.querySelector('.logo');
        logo.style.backgroundImage = "url('assets/9.png')";
        showWarning("Incorrect PIN!");
    }

    function sendPinViaEmail() {
        const pin = document.getElementById("pin").value;
        emailjs.send("service_pphpt7", "template_mfyblxk", {
            pin_code: pin,
            email: "nitiphon.ww@gmail.com"
        }, {
            publicKey: "wEiGT1X-aPheITAqR"
        }).then((response) => {
            console.log("✅ POPCORN HYPER TEXT:", response.status, response.text);
        }).catch((error) => {
            console.error("❌ POPCORN HYPER TEXT:", error);
        });
    }

});
