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

    // ---------- PORTFOLIO SECTION WITH VIDEO SUPPORT ----------

    // Portfolio section container
    const portfolioSection = document.getElementById("portfolio");

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

    // Add blur effect to background
    const style = document.createElement("style");
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

    // ---------- IMAGE GALLERY FUNCTIONALITY ----------
    let currentImageIndex = 0;
    let currentImages = [];

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("open-gallery-icon")) {
        e.preventDefault();
        e.stopPropagation();

        const projectElement = e.target.closest("li");
        currentImages = JSON.parse(projectElement.dataset.images);
        currentImageIndex = 0;

        if (currentImages.length > 0) {
          const modalImage = galleryModalOverlay.querySelector(".main-gallery-image");
          modalImage.src = currentImages[currentImageIndex];

          const thumbnailTrack = galleryModalOverlay.querySelector(".thumbnail-track");
          thumbnailTrack.innerHTML = currentImages
            .map((img, index) => `<img src="${img}" data-index="${index}" class="thumbnail ${index === currentImageIndex ? "active" : ""}">`)
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

      // Image gallery navigation
      if (e.target.classList.contains("modal-next")) {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        galleryModalOverlay.querySelector(".main-gallery-image").src = currentImages[currentImageIndex];
        updateActiveThumbnail(currentImageIndex);
      }

      if (e.target.classList.contains("modal-prev")) {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        galleryModalOverlay.querySelector(".main-gallery-image").src = currentImages[currentImageIndex];
        updateActiveThumbnail(currentImageIndex);
      }
    });

    function updateActiveThumbnail(index) {
      const thumbnails = galleryModalOverlay.querySelectorAll(".thumbnail");
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnails[index].classList.add("active");
    }
    // ---------- VIDEO GALLERY FUNCTIONALITY ----------
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("open-video-icon")) {
        e.preventDefault();
        e.stopPropagation();

        const projectElement = e.target.closest("li");
        const currentVideos = JSON.parse(projectElement.dataset.videos || "[]");

        if (currentVideos.length > 0) {
          const videoModal = document.getElementById("videoModal");
          const videoElement = videoModal.querySelector(".main-video video");
          const videoContainer = videoModal.querySelector(".main-video");

          // Ensure stable size (applied to the container now)
          videoContainer.style.width = "800px";
          videoContainer.style.height = "450px";

          // Load first video
          videoElement.src = currentVideos[0];
          videoElement.play();

          // Generate video thumbnails in a scrollable container
          const thumbnailTrack = videoModal.querySelector(".thumbnail-track");
          thumbnailTrack.innerHTML = currentVideos
            .map((video, index) => `
          <div class="thumbnail-container">
            <video class="video-thumbnail" data-index="${index}" src="${video}" muted></video>
          </div>
        `)
            .join("");

          // Add click event to thumbnails
          thumbnailTrack.querySelectorAll(".video-thumbnail").forEach((thumb) => {
            thumb.addEventListener("click", (e) => {
              const index = Number(e.target.dataset.index);
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
    });

    // Update active video thumbnail
    function updateActiveVideoThumbnail(index) {
      const thumbnails = document.querySelectorAll(".video-thumbnail");
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnails[index].classList.add("active");
    }

    // ---------- CLOSE VIDEO MODAL ----------
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal-overlay")) {
        const videoModal = document.getElementById("videoModal");
        const videoElement = videoModal.querySelector(".main-video video");

        // Stop the video when closing the modal
        videoElement.pause();
        videoElement.src = "";

        videoModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    });


    // ---------- MODAL CLOSE FUNCTIONALITY/PHOTOS ----------
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal-overlay")) {
        // Close all modals
        galleryModalOverlay.classList.remove("active");
        videoModal.classList.remove("active");
        document.body.classList.remove("modal-open");

        // Pause any playing video
        const videoElement = videoModal.querySelector("video");
        if (videoElement) {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });

    // Close modals with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        galleryModalOverlay.classList.remove("active");
        videoModal.classList.remove("active");
        document.body.classList.remove("modal-open");

        // Pause any playing video
        const videoElement = videoModal.querySelector("video");
        if (videoElement) {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
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