const heroProduct = document.getElementById("heroProduct");
const heroProductStage = document.getElementById("heroProductStage");
const heroProductName = document.getElementById("heroProductName");
const heroProductType = document.getElementById("heroProductType");

const projectCards = document.querySelectorAll(".project-card");
const filterButtons = document.querySelectorAll(".filter-btn");


// 1. Mouse se product ko 3D-style tilt karna

if (heroProductStage && heroProduct) {
	heroProductStage.addEventListener("pointermove", (event) => {
		// Touch screen par mouse-style tilt apply nahi karna
		if (event.pointerType === "touch") return;

		const bounds = heroProductStage.getBoundingClientRect();

		const x = (event.clientX - bounds.left) / bounds.width;
		const y = (event.clientY - bounds.top) / bounds.height;

		const rotateY = (x - 0.5) * 28;
		const rotateX = (0.5 - y) * 20;

		heroProduct.style.transform =
			`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
	});

	heroProductStage.addEventListener("pointerleave", () => {
		heroProduct.style.transform =
			"rotateX(0deg) rotateY(0deg) scale(1)";

		heroProduct.style.filter =
			"drop-shadow(0 15px 30px #0007)";
	});
}


// 2. Kisi bhi portfolio product ko main showcase mein kholna

function selectProject(card) {
	const image = card.dataset.image;
	const name = card.dataset.name;
	const type = card.dataset.type;

	if (!image || !name || !type) return;

	heroProduct.style.opacity = "0.3";

	heroProduct.onload = () => {
		heroProduct.style.opacity = "1";
	};

	heroProduct.onerror = () => {
		heroProduct.style.opacity = "1";
		heroProduct.style.transform = "none";
	};

	heroProduct.src = image;
	heroProduct.alt = name + " product concept";
	heroProductName.textContent = name;
	heroProductType.textContent = type;

	// Mobile aur desktop dono par showcase tak scroll karein
	document.getElementById("home").scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}

projectCards.forEach((card) => {
	const viewButton = card.querySelector(".view-project");

	if (viewButton) {
		viewButton.addEventListener("click", (event) => {
			event.stopPropagation();
			selectProject(card);
		});
	}

	card.addEventListener("click", () => {
		selectProject(card);
	});

	card.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			selectProject(card);
		}
	});
});


// 3. Portfolio categories filter karna

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const selectedCategory = button.dataset.filter;

		filterButtons.forEach((item) => {
			item.classList.remove("active");
			item.setAttribute("aria-pressed", "false");
		});

		button.classList.add("active");
		button.setAttribute("aria-pressed", "true");

		projectCards.forEach((card) => {
			const category = card.dataset.category;

			const shouldShow =
				selectedCategory === "all" ||
				category === selectedCategory;

			card.hidden = !shouldShow;
		});
	});

	button.setAttribute(
		"aria-pressed",
		button.classList.contains("active") ? "true" : "false"
	);
});


// 4. Contact form ki basic validation

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!contactForm.checkValidity()) {
			contactForm.reportValidity();
			return;
		}

		formMessage.textContent =
			"Your details are valid. To receive real enquiries, connect this form to your email or a form backend.";

		formMessage.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	});
}
