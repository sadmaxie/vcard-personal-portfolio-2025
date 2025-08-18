"use strict";

// ---------- INITIAL LOAD ----------
// Load default language on page load
loadLanguage("en");

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

// Function to load JSON data for given language
function loadLanguage(langCode) {
  const file = `./assets/data/${langCode}_data.json`;

  fetch(file)
    .then(response => response.json())
    .then(data => {
      console.log("Loaded language:", langCode, data);
      renderContent(data); // Render page dynamically
    })
    .catch(err => console.error("Language file load error:", err));
}

// ---------- PAGE NAVIGATION ----------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

function renderContent(data) {
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

  // Format birthday nicely
  const formattedBirthday = birthdayDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  birthdayElement.textContent = formattedBirthday;

  // Nationality
  const nationalityElement = document.getElementById("nationality");
  nationalityElement.textContent = data.contacts.nationality;

  // Location
  const locationElement = document.getElementById("location");
  locationElement.textContent = data.contacts.location;

  // ---------- SITE INFO ----------
  document.getElementById("site-title").textContent = data.siteInfo.title;
  document.getElementById("favicon").href = data.siteInfo.logo;
  document.getElementById("map-embed").src = data.map.embedUrl;
  document.getElementById("cv-download-link").href = data.cv.downloadUrl;

  // ---------- SOCIAL LINKS SECTION ----------
  const socialLinksSection = document.getElementById("social-links");
  // Clear previous links before appending
  socialLinksSection.innerHTML = "";
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

  // ---------- WHAT I DO SECTION ----------
  const whatIDoSection = document.getElementById("what-i-do");
  // Clear previous items
  whatIDoSection.innerHTML = "";

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

  const testimonialsSection = document.getElementById("testimonials");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalDate = document.querySelector("[data-modal-date]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");
  const modalLinkBtn = document.querySelector("[data-modal-link-btn]");

  // Clear previous testimonials
  testimonialsSection.innerHTML = "";

  // Function to open modal
  const openTestimonialModal = (testimonialElement) => {
    const avatar = testimonialElement.querySelector("[data-testimonials-avatar]");
    const date = testimonialElement.querySelector("[data-avatar-date]");
    const title = testimonialElement.querySelector("[data-testimonials-title]");
    const text = testimonialElement.querySelector("[data-testimonials-text]");

    modalImg.src = avatar.src;
    modalImg.alt = avatar.alt;
    modalTitle.innerHTML = title.innerHTML;
    modalText.innerHTML = text.innerHTML;
    modalDate.innerHTML = date.dataset.avatarDate;
    modalDate.dateTime = date.dataset.avatarDate;

    // Show link button only if testimonial has a link
    if (avatar.dataset.avatarOpen) {
      modalLinkBtn.style.display = "inline-flex";
      modalLinkBtn.href = avatar.dataset.avatarOpen;
      modalLinkBtn.onclick = (e) => {
        e.preventDefault();
        window.open(avatar.dataset.avatarOpen, "_blank");
      };
    } else {
      modalLinkBtn.style.display = "none";
      modalLinkBtn.onclick = null;
    }

    modalContainer.classList.add("active");
    overlay.classList.add("active");
  };

  // Function to close modal
  const closeTestimonialModal = () => {
    modalContainer.classList.remove("active");
    overlay.classList.remove("active");
  };

  // Populate testimonials
  data.testimonials.forEach((testimonial) => {
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
            data-avatar-open="${testimonial.link || ""}"
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

    testimonialElement.addEventListener("click", () => openTestimonialModal(testimonialElement));
    testimonialsSection.appendChild(testimonialElement);
  });

  // Close modal events
  [modalCloseBtn, overlay].forEach((el) => el.addEventListener("click", closeTestimonialModal));


  // ---------- CLIENTS SECTION ----------
  const clientsSection = document.getElementById("clients");
  // Clear previous clients
  clientsSection.innerHTML = "";

  const clientElements = data.clients.map((client) => {
    const clientElement = document.createElement("li");
    clientElement.classList.add("clients-item");
    clientElement.innerHTML = `
    <a href="${client.url}" target="_blank" rel="noopener noreferrer">
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
  // Clear previous education items
  educationSection.innerHTML = "";

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
  // Clear previous certificate items
  certificateSection.innerHTML = "";

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
  // Clear previous experience items
  experienceSection.innerHTML = "";

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

  // Append all created elements to the experience section
  experienceElements.forEach((experienceElement) => {
    experienceSection.appendChild(experienceElement);
  });

  // ---------- SKILLS SECTION ----------
  const skillsSection = document.getElementById("skills");
  // Clear previous skill items
  skillsSection.innerHTML = "";

  const skillElements = data.skills.map((skill) => {
    const skillElement = document.createElement("li");
    skillElement.classList.add("skills-item");

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

  // ---------- PORTFOLIO SECTION WITH VIDEO SUPPORT ----------
  const portfolioSection = document.getElementById("portfolio");
  // Clear previous projects
  portfolioSection.innerHTML = "";

  // Loop through projects and create project elements
  data.portfolio.forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.classList.add("project-item", "active");
    projectElement.setAttribute("data-filter-item", "");
    projectElement.setAttribute("data-category", project.category);

    // Determine if project has images, videos, or a link
    const hasImages = project.images && Array.isArray(project.images) && project.images.length > 0;
    const hasVideos = project.videos && Array.isArray(project.videos) && project.videos.length > 0;
    const hasLink = !!project.link;

    // ---------- ICON BOX SETUP ----------
    let iconBoxContent = "";

    // Add link icon if project has a link
    if (hasLink) {
      iconBoxContent += `
      <a href="${project.link}" target="_blank" rel="noopener noreferrer">
        <img src="./assets/images/icon-eye.svg" alt="View project" class="icon-eye">
      </a>`;
    }

    // Add gallery icon if project has images
    if (hasImages) {
      iconBoxContent += `<img src="./assets/images/icon-images.svg" alt="Open image gallery" class="open-gallery-icon">`;
    }

    // Add video icon if project has videos
    if (hasVideos) {
      iconBoxContent += `<img src="./assets/images/icon-videos.svg" alt="Open video gallery" class="open-video-icon">`;
    }

    const iconBoxHtml = iconBoxContent
      ? `<div class="project-item-icon-box">${iconBoxContent}</div>`
      : "";

    // ---------- PROJECT CONTENT ----------
    const content = `
    <figure class="project-img">
      ${iconBoxHtml}
      <img src="${project.projectPhoto || "./assets/images/placeholder.png"}" alt="${project.title}" loading="lazy" />
    </figure>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-category">${project.category}</p>
  `;

    // Wrap project content in a div for better structure
    projectElement.innerHTML = `<div>${content}</div>`;

    // Store image and video data in dataset for gallery functionality
    projectElement.dataset.images = JSON.stringify(hasImages ? project.images : []);
    projectElement.dataset.videos = JSON.stringify(hasVideos ? project.videos : []);

    // Add 'no-interaction' class if project has no link, images, or videos
    if (!hasLink && !hasImages && !hasVideos) {
      projectElement.classList.add("no-interaction");
    }

    // Append project element to portfolio section
    portfolioSection.appendChild(projectElement);
  });

  // ---------- CREATE MODALS ----------

  // Only create modals if they don’t exist already
  if (!document.getElementById("galleryModalOverlay")) {
    // Create image gallery modal
    const galleryModalOverlay = document.createElement("div");
    galleryModalOverlay.id = "galleryModalOverlay";
    galleryModalOverlay.classList.add("modal-overlay");
    galleryModalOverlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <button class="modal-prev">&#10094;</button>
      <img src="" alt="Project Image" class="main-gallery-image">
      <button class="modal-next">&#10095;</button>
      <div class="thumbnail-track"></div>
    </div>
  `;
    document.body.appendChild(galleryModalOverlay);
  }

  if (!document.getElementById("videoModal")) {
    // Create video modal
    const videoModal = document.createElement("div");
    videoModal.id = "videoModal";
    videoModal.classList.add("modal-overlay");
    videoModal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <video controls class="main-video">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
    document.body.appendChild(videoModal);
  }

  // Add blur effect and modal styles if not already present
  if (!document.getElementById("modalStyles")) {
    const style = document.createElement("style");
    style.id = "modalStyles";
    style.innerHTML = `
    .modal-overlay.active {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    body.modal-open {
      overflow: hidden;
    }
    #videoModal video {
      max-width: 90%;
      max-height: 90%;
    }
  `;
    document.head.appendChild(style);
  }

  // ---------- IMAGE GALLERY FUNCTIONALITY ----------
  let currentImageIndex = 0;
  let currentImages = [];

  document.addEventListener("click", (e) => {
    // Open gallery
    if (e.target.classList.contains("open-gallery-icon")) {
      e.preventDefault();
      e.stopPropagation();

      const projectElement = e.target.closest("li");
      currentImages = JSON.parse(projectElement.dataset.images || "[]");
      currentImageIndex = 0;

      if (currentImages.length > 0) {
        const galleryModalOverlay = document.getElementById("galleryModalOverlay");
        const modalImage = galleryModalOverlay.querySelector(".main-gallery-image");
        modalImage.src = currentImages[currentImageIndex];

        const thumbnailTrack = galleryModalOverlay.querySelector(".thumbnail-track");
        thumbnailTrack.innerHTML = currentImages
          .map(
            (img, index) =>
              `<img src="${img}" data-index="${index}" class="thumbnail ${index === currentImageIndex ? "active" : ""
              }">`
          )
          .join("");

        thumbnailTrack.querySelectorAll(".thumbnail").forEach((thumb) => {
          thumb.addEventListener("click", (e) => {
            currentImageIndex = Number(e.target.dataset.index);
            modalImage.src = currentImages[currentImageIndex];
            updateActiveThumbnail(currentImageIndex);
          });
        });

        galleryModalOverlay.classList.add("active");
        document.body.classList.add("modal-open");
      }
    }

    // Gallery navigation
    if (e.target.classList.contains("modal-next")) {
      currentImageIndex = (currentImageIndex + 1) % currentImages.length;
      document.querySelector("#galleryModalOverlay .main-gallery-image").src =
        currentImages[currentImageIndex];
      updateActiveThumbnail(currentImageIndex);
    }

    if (e.target.classList.contains("modal-prev")) {
      currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      document.querySelector("#galleryModalOverlay .main-gallery-image").src =
        currentImages[currentImageIndex];
      updateActiveThumbnail(currentImageIndex);
    }

    // Close modal
    if (e.target.classList.contains("modal-close")) {
      e.target.closest(".modal-overlay").classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  function updateActiveThumbnail(index) {
    const thumbnails = document.querySelectorAll("#galleryModalOverlay .thumbnail");
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    if (thumbnails[index]) thumbnails[index].classList.add("active");
  }

  // ---------- VIDEO GALLERY FUNCTIONALITY ----------
  let currentVideoIndex = 0;
  let currentVideos = [];

  document.addEventListener("click", (e) => {
    // Open video gallery
    if (e.target.classList.contains("open-video-icon")) {
      e.preventDefault();
      e.stopPropagation();

      const projectElement = e.target.closest("li");
      currentVideos = JSON.parse(projectElement.dataset.videos || "[]");
      currentVideoIndex = 0;

      if (currentVideos.length > 0) {
        const videoModal = document.getElementById("videoModal");
        const videoElement = videoModal.querySelector(".main-video video");
        const thumbnailTrack = videoModal.querySelector(".thumbnail-track");

        // Load first video
        videoElement.src = currentVideos[0];
        videoElement.play();

        // Generate video thumbnails
        thumbnailTrack.innerHTML = currentVideos
          .map(
            (video, index) => `
          <div class="thumbnail-container">
            <video class="video-thumbnail ${index === 0 ? "active" : ""}" data-index="${index}" src="${video}" muted></video>
          </div>
        `
          )
          .join("");

        // Add click event to thumbnails
        thumbnailTrack.querySelectorAll(".video-thumbnail").forEach((thumb) => {
          thumb.addEventListener("click", (e) => {
            const index = Number(e.target.dataset.index);
            currentVideoIndex = index;
            videoElement.src = currentVideos[index];
            videoElement.play();
            updateActiveVideoThumbnail(index);
          });
        });

        // Show modal
        videoModal.classList.add("active");
        document.body.classList.add("modal-open");
      }
    }

    // Close modals (both image and video)
    if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal-overlay")) {
      closeAllModals();
    }
  });

  // Update active video thumbnail
  function updateActiveVideoThumbnail(index) {
    const thumbnails = document.querySelectorAll(".video-thumbnail");
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    if (thumbnails[index]) thumbnails[index].classList.add("active");
  }

  // Close all modals safely
  function closeAllModals() {
    const galleryModalOverlay = document.getElementById("galleryModalOverlay");
    const videoModal = document.getElementById("videoModal");

    if (galleryModalOverlay) galleryModalOverlay.classList.remove("active");
    if (videoModal) {
      videoModal.classList.remove("active");

      const videoElement = videoModal.querySelector("video");
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.src = "";
      }
    }

    document.body.classList.remove("modal-open");
  }

  // Close modals with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // ---------- BLOG SECTION ----------
  const blogSection = document.getElementById("blog");

  // Clear previous blogs before adding new ones
  blogSection.innerHTML = "";

  data.blog.forEach((post) => {
    const blogElement = document.createElement("li");
    blogElement.classList.add("blog-post-item");

    const postDate = new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (post.link) {
      blogElement.innerHTML = `
      <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="blog-box">
        <figure class="blog-banner-box">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${postDate}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.description}</p>
        </div>
      </a>
    `;
    } else {
      blogElement.innerHTML = `
      <div class="blog-box">
        <figure class="blog-banner-box">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${postDate}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.description}</p>
        </div>
      </div>
    `;
    }

    blogSection.appendChild(blogElement);
  });

  // ---------- PROTFOLIO CUSTOM SELECT & FILTER ----------
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = (selectedValue) => {
    filterItems.forEach((item) => {
      if (selectedValue === "all" || selectedValue === item.dataset.category.toLowerCase()) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Select dropdown toggle
  select.addEventListener("click", () => elementToggleFunc(select));

  // Select item click
  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // Filter buttons for large screens
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // ---------- CONTACT FORM ----------
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) formBtn.removeAttribute("disabled");
      else formBtn.setAttribute("disabled", "");
    });
  });

  // ---------- POPULATE CONTACT INFO ----------
  document.getElementById("map").src = data.contact.mapEmbed;
  document.getElementById("contact-name").placeholder = data.contact.form.placeholderName;
  document.getElementById("contact-email").placeholder = data.contact.form.placeholderEmail;
  document.getElementById("contact-message").placeholder = data.contact.form.placeholderMessage;

}

// ---------- DROPDOWN FUNCTIONALITY ----------
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");

  if (dropdown) {
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-menu [data-lang]");

    // Toggle dropdown
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      dropdown.classList.toggle("active");
    });

    // Handle language selection
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedLang = item.dataset.lang;
        dropdownToggle.textContent = selectedLang.toUpperCase();
        loadLanguage(selectedLang);
        dropdown.classList.remove("active");
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }
});