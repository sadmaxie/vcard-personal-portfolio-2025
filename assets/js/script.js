"use strict";

// ---------- HELPER FUNCTIONS ----------

// Function to toggle 'active' class on elements
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ---------- SIDEBAR TOGGLING FUNCTIONALITY ----------

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Toggle sidebar visibility on mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// ---------- PAGE NAVIGATION ----------

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event listeners to each navigation link for page switching
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Switch active pages based on clicked navigation link
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0); // Scroll to top
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// ---------- FETCH AND LOAD DATA FROM JSON ----------

// Fetch and load dynamic data from data.json
fetch("./assets/data/data.json")
  .then((response) => response.json()) // Parse JSON data
  .then((data) => {
    // ---------- ABOUT ME SECTION ----------
    document.getElementById("name").textContent = data.aboutMe.name;
    document.getElementById("title").textContent = data.aboutMe.title;
    document.getElementById("description1").textContent = data.aboutMe.description1;
    document.getElementById("description2").textContent = data.aboutMe.description2;
    document.getElementById("description3").textContent = data.aboutMe.description3;

    // ---------- CONTACT INFO SECTION ----------
    const emailElement = document.getElementById("email");
    emailElement.textContent = data.contacts.email;
    emailElement.href = `mailto:${data.contacts.email}`;

    const phoneElement = document.getElementById("phone");
    phoneElement.textContent = data.contacts.phone;
    phoneElement.href = `tel:${data.contacts.phone}`;

    const birthdayElement = document.getElementById("birthday");
    const birthdayDate = new Date(data.contacts.birthday);

    // ---------- SITE INFO ----------
    document.getElementById("site-title").textContent = data.siteInfo.title;
    document.getElementById("favicon").href = data.siteInfo.logo;
    document.getElementById("map-embed").src = data.map.embedUrl;
    document.getElementById("cv-download-link").href = data.cv.downloadUrl;

    // ---------- SOCIAL LINKS SECTION ----------
    const socialLinksSection = document.getElementById("social-links");
    data.socialLinks.forEach((link) => {
      const listItem = document.createElement("li");
      listItem.classList.add("social-item");
      listItem.innerHTML = `
        <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
          <ion-icon name="${link.icon}"></ion-icon>
        </a>
      `;
      socialLinksSection.appendChild(listItem);
    });

    // ---------- BIRTHDAY FORMAT ----------
    const formattedBirthday = birthdayDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    birthdayElement.textContent = formattedBirthday;

    // ---------- LOCATION ----------
    const locationElement = document.getElementById("location");
    locationElement.textContent = data.contacts.location;

    // ---------- WHAT I DO SECTION ----------
    const whatIDoSection = document.getElementById("what-i-do");

    // Map through 'What I Do' services and create list items
    const serviceElements = data.whatIDo.map((service) => {
      const serviceElement = document.createElement("li");
      serviceElement.classList.add("service-item");
      serviceElement.innerHTML = `
        <div class="service-icon-box">
          <img src="${service.icon}" alt="${service.title} icon" width="40">
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${service.title}</h4>
          <p class="service-item-text">${service.description}</p>
        </div>
      `;
      return serviceElement;
    });

    // Append all created service elements to the "What I Do" section
    serviceElements.forEach((serviceElement) => {
      whatIDoSection.appendChild(serviceElement);
    });

    // ---------- TESTIMONIALS SECTION ----------
    const testimonialsSection = document.getElementById("testimonials");

    // Map through testimonials and create list items
    const testimonialsElements = data.testimonials.map((testimonial) => {
      const testimonialElement = document.createElement("li");
      testimonialElement.classList.add("testimonials-item");
      testimonialElement.innerHTML = `
        <div class="content-card" data-testimonials-item>
          <figure class="testimonials-avatar-box">
            <p>
              <img
                src="${testimonial.avatar}"
                alt="${testimonial.name}"
                width="60"
                data-testimonials-avatar
                data-avatar-date="${testimonial.date}"
                data-avatar-open="${testimonial.link}"
              />
            </p>
          </figure>
          <h4 class="h4 testimonials-item-title" data-testimonials-title>
            ${testimonial.name}
          </h4>
          <div class="testimonials-text" data-testimonials-text>
            <p>${testimonial.text}</p>
          </div>
        </div>
      `;

      // Event listener for modal opening
      testimonialElement.addEventListener("click", function () {
        const modalContainer = document.querySelector("[data-modal-container]");
        const modalImg = document.querySelector("[data-modal-img]");
        const modalTitle = document.querySelector("[data-modal-title]");
        const modalText = document.querySelector("[data-modal-text]");
        const modalLinkBtn = document.querySelector("[data-modal-link-btn]");

        // Populate modal with testimonial data
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

        // Link button functionality
        const testimonialLink = this.querySelector("[data-testimonials-avatar]").dataset.avatarOpen;
        modalLinkBtn.onclick = function (event) {
          event.preventDefault();
          window.open(testimonialLink, "_blank");
        };

        // Show the modal
        modalContainer.classList.add("active");
        document.querySelector("[data-overlay]").classList.add("active");
      });

      return testimonialElement;
    });

    // Append all testimonials to the section
    testimonialsElements.forEach((testimonialElement) => {
      testimonialsSection.appendChild(testimonialElement);
    });

    // ---------- CLIENTS SECTION ----------
    const clientsSection = document.getElementById("clients");

    // Map through client logos and create list items
    const clientElements = data.clients.map((client) => {
      const clientElement = document.createElement("li");
      clientElement.classList.add("clients-item");
      clientElement.innerHTML = `
        <a href="${client.url}">
          <img
            src="./assets/images/${client.image}"
            alt="${client.name} logo"
            width="100"
            height="100"
          />
        </a>
      `;
      return clientElement;
    });

    // Append all clients to the clients section
    clientElements.forEach((clientElement) => {
      clientsSection.appendChild(clientElement);
    });

    // ---------- EDUCATION SECTION ----------
    const educationSection = document.getElementById("education");

    // Map through education data and create timeline items
    const educationElements = data.education.map((edu) => {
      const educationElement = document.createElement("li");
      educationElement.classList.add("timeline-item");
      educationElement.innerHTML = `
        <h4 class="h4 timeline-item-title">${edu.institution}</h4>
        <span>${edu.years}</span>
        <p class="timeline-text">${edu.description}</p>
      `;
      return educationElement;
    });

    // Append education elements to the education section
    educationElements.forEach((educationElement) => {
      educationSection.appendChild(educationElement);
    });

    // ---------- CERTIFICATES SECTION ----------
    const certificateSection = document.getElementById("certificate");

    // Map through certificates data and create timeline items
    const certificateElements = data.certificate.map((cer) => {
      const certificateElement = document.createElement("li");
      certificateElement.classList.add("timeline-item");
      certificateElement.innerHTML = `
        <h4 class="h4 timeline-item-title">${cer.institution}</h4>
        <span>${cer.years}</span>
        <p class="timeline-text">${cer.description}</p>
      `;
      return certificateElement;
    });

    // Append certificates to the certificate section
    certificateElements.forEach((certificateElement) => {
      certificateSection.appendChild(certificateElement);
    });

    // ---------- EXPERIENCE SECTION ----------
    const experienceSection = document.getElementById("experience");

    // Map through experience data and create timeline items
    const experienceElements = data.experience.map((exp) => {
      const experienceElement = document.createElement("li");
      experienceElement.classList.add("timeline-item");
      experienceElement.innerHTML = `
        <h4 class="h4 timeline-item-title">${exp.title}</h4>
        <h5 class="timeline-item-role">${exp.role}</h5>
        <span class="timeline-item-years">${exp.years}</span>
        <p class="timeline-text">${exp.description}</p>
      `;
      return experienceElement;
    });

// ---------- EXPERIENCE SECTION ----------

// Append all created elements to the experience section
experienceElements.forEach((experienceElement) => {
  experienceSection.appendChild(experienceElement);
});

// ---------- SKILLS SECTION ----------

// Populate the Skills section
const skillsSection = document.getElementById("skills");

// Map through the skills data and create list items
const skillElements = data.skills.map((skill) => {
  // Create the list item
  const skillElement = document.createElement("li");
  skillElement.classList.add("skills-item"); // Add the required class for styling

  // Set the inner HTML for the skill item
  skillElement.innerHTML = `
    <div class="title-wrapper">
      <h5 class="h5">${skill.name}</h5>
      <data value="${skill.level}">${skill.level}%</data>
    </div>
    <div class="skill-progress-bg">
      <div class="skill-progress-fill" style="width: ${skill.level}%"></div>
    </div>
  `;
  return skillElement;
});

// Append all created elements to the skills section
skillElements.forEach((skillElement) => {
  skillsSection.appendChild(skillElement);
});

// ---------- PORTFOLIO SECTION ----------

// Populate the Portfolio section
const portfolioSection = document.getElementById("portfolio");

// Map through the portfolio data and create list items
const projectElements = data.portfolio.map((project) => {
  const projectElement = document.createElement("li");
  projectElement.classList.add("project-item", "active");
  projectElement.setAttribute("data-filter-item", "");
  projectElement.setAttribute("data-category", project.category);

  // Check if the project has a link
  if (project.link) {
    projectElement.innerHTML = `
      <a href="${project.link}" target="_blank" rel="noopener noreferrer">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img
            src="${project.image}"
            alt="${project.title}"
            loading="lazy"
          />
        </figure>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </a>
    `;
  } else {
    projectElement.innerHTML = `
      <div>
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img
            src="${project.image}"
            alt="${project.title}"
            loading="lazy"
          />
        </figure>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </div>
    `;
  }

  return projectElement;
});

// Append all created elements to the portfolio section
projectElements.forEach((projectElement) => {
  portfolioSection.appendChild(projectElement);
});

// ---------- BLOG SECTION ----------

// Populate the Blog section
const blogSection = document.getElementById("blog");

// Map through the blog data and create list items
const blogElements = data.blog.map((post) => {
  const blogElement = document.createElement("li");
  blogElement.classList.add("blog-post-item");

  // Check if the blog post has a link
  if (post.link) {
    blogElement.innerHTML = `
      <a href="${post.link}" target="_blank" rel="noopener noreferrer">
        <figure class="blog-banner-box">
          <img
            src="${post.image}"
            alt="${post.title}"
            loading="lazy"
          />
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${new Date(
      post.date
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.description}</p>
        </div>
      </a>
    `;
  } else {
    blogElement.innerHTML = `
      <div>
        <figure class="blog-banner-box">
          <img
            src="${post.image}"
            alt="${post.title}"
            loading="lazy"
          />
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${new Date(
      post.date
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.description}</p>
        </div>
      </div>
    `;
  }

  return blogElement;
});

// Append all created elements to the blog section
blogElements.forEach((blogElement) => {
  blogSection.appendChild(blogElement);
});

// ---------- CUSTOM SELECT FUNCTIONALITY ----------

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle select dropdown visibility
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event listener to all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue); // Call filter function on selection
  });
}

// ---------- FILTER FUNCTIONALITY ----------

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Filter items based on selected category
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Add event listener to all filter buttons for large screens
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue); // Call filter function

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ---------- TESTIMONIALS MODAL FUNCTIONALITY ----------

// Testimonials variables
const testimonialsItem = document.querySelectorAll(
  "[data-testimonials-item]"
);
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalDate = document.querySelector("[data-modal-date]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Toggle the modal display
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add event listeners to all testimonials items to open the modal
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalDate.innerHTML =
      this.querySelector("[data-avatar-date]").dataset.avatarDate;
    modalDate.dateTime =
      this.querySelector("[data-avatar-date]").dataset.avatarDate;
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;
    testimonialsModalFunc(); // Open the modal
  });
}

// Close the modal when the close button or overlay is clicked
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ---------- CONTACT FORM FUNCTIONALITY ----------

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event listener to form inputs to check validity
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// ---------- POPULATE CONTACT SECTION ----------

// Populate map and form placeholders
const map = document.getElementById("map");
map.src = data.contact.mapEmbed;

const contactName = document.getElementById("contact-name");
contactName.placeholder = data.contact.form.placeholderName;

const contactEmail = document.getElementById("contact-email");
contactEmail.placeholder = data.contact.form.placeholderEmail;

const contactMessage = document.getElementById("contact-message");
contactMessage.placeholder = data.contact.form.placeholderMessage;
});
