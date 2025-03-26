# vCard - Personal Portfolio 2025

![GitHub repo size](https://img.shields.io/github/repo-size/sadmaxie/vcard-personal-portfolio-2025)
![GitHub stars](https://img.shields.io/github/stars/sadmaxie/vcard-personal-portfolio-2025?style=social)
![GitHub forks](https://img.shields.io/github/forks/sadmaxie/vcard-personal-portfolio-2025?style=social)

vCard is a fully responsive personal portfolio website, built using HTML, CSS, and JavaScript, with the latest update in 2025. This update adds dynamic data population from a data file, includes a downloadable CV button, and features a new contact form powered by Netlify. Additionally, it allows easy customization to add new sections such as Education, Certificates, and portfolio categories like System and Network.

## Demo

![vCard Desktop Demo](./website-demo-image/desktop.png "Desktop Demo")
![vCard Mobile Demo](./website-demo-image/mobile.png "Mobile Demo")

## Prerequisites

Before you begin, ensure you have met the following requirements:

* [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.

### Linux and macOS:
```bash
sudo git clone https://github.com/sadmaxie/vcard-personal-portfolio-2025.git
```
### Windows:
```bash
git clone https://github.com/sadmaxie/vcard-personal-portfolio-2025.git
```

## New Features in this Update

-   **Data File Configuration**: You can now manage all your personal details (such as social links, portfolio projects, CV, etc.) through a centralized data file.
-   **Download CV Button**: A new feature allows visitors to download your CV directly from the portfolio site.
-   **Updated Contact Me Section**: The "Contact Me" form now works seamlessly with Netlify for easy form submissions and management.
-   **Add New Sections Dynamically**: You can now add new sections (such as Education or Certificates) under your resume with dynamic content injection via JavaScript and a data file.
-   **Add New Categories to Portfolio**: You can easily add new categories like "System" or "Network" to the portfolio section, including automatic filtering functionality.
-   **Link for Testimonials**: You can now add the link to the CV or profile of any testimonial author who has commented on your portfolio.
-   **Clickable Project Links**: In the portfolio section, projects now feature clickable links. If a project has an associated link, you can click on it to open the project in a new tab.
-   **Clickable Blog Links**: The blog section now supports clickable links. You can add a link to any blog post or resource, and users can click on it to open the blog or resource in a new tab.
-   **Project Photo Gallery**: Each project in the portfolio can now include a photo gallery, displaying multiple images related to the project.
-   **Enhanced Customization**: The portfolio is now more customizable, allowing for easier adjustments to layout, styling, and content to match your personal brand.

## Instructions

### 1. Adding a New Tree Branch (e.g., Education, Certificates)
If you want to add a new section under the resume (such as Education or Certificates), follow these steps:

a. **HTML**:  
In the `index.html` file, you need to add a new section for the branch. You can write a name for the section title and give it a unique ID to be used in the JavaScript file. For example:

```html
<!-- Add new section for another branch -->
<section class="timeline">
  <div class="title-wrapper">
    <div class="icon-box">
      <ion-icon name="book-outline"></ion-icon>
    </div>
    <h3 class="h3">Your New Section Title</h3> <!-- Change title as needed -->
  </div>
  <ol id="your-new-section-id" class="timeline-list"></ol> <!-- Unique ID for the list -->
</section>
```

**Where to modify**:
- Change `Your New Section Title` to the title you want for your section (e.g., "Education", "Certificates").
- Change `your-new-section-id` to a unique ID for the list (e.g., `education`, `certificates`).

b. **JavaScript (JS)**:  
In the `data.json` file, add the new data under the relevant array (e.g., "education" array). Here's an example for adding items to your new section:

```json

  "your-new-section-id": [
    {
      "title": "Sample Item Title",
      "description": "Description of the item goes here.",
      "date": "January 2025"
    },
    {
      "title": "Another Item",
      "description": "More details about the item.",
      "date": "February 2025"
    }
  ],

```

Then, add the following code in the `script.js` file to dynamically populate your new section with data. Replace `your-new-section-id` with the ID you chose earlier:

```javascript
// ---------- your-new-section-id SECTION ----------
const your-new-section-idSection = document.getElementById("your-new-section-id");

// Map through your-new-section-id data and create timeline items
const your-new-section-idElements = data["your-new-section-id"].map((edu) => {
  const your-new-section-idElement = document.createElement("li");
  your-new-section-idElement.classList.add("timeline-item");
  your-new-section-idElement.innerHTML = `
    <h4 class="h4 timeline-item-title">${edu.title}</h4>
    <span>${edu.date}</span>
    <p class="timeline-text">${edu.description}</p>
  `;
  return your-new-section-idElement;
});

// Append your-new-section-id elements to the your-new-section-id section
your-new-section-idElements.forEach((your-new-section-idElement) => {
  your-new-section-idSection.appendChild(your-new-section-idElement);
});
```

**Helpful Tool**:  
Use [Browserling's Text Replace Tool](https://www.browserling.com/tools/text-replace) to quickly replace `your-new-section-id` with the desired ID for your new section.

**Note**:  
- If you want to hide the `date` or `description` for any item, you can modify the item in `data.json` to exclude the `date` or `description` field, or comment it out. This will hide the respective information on the webpage.

```json
{
  "title": "Sample Item Title",
  "description": "",  // Empty description will hide the description.
  "date": ""          // Empty date will hide the date.
}
```

### 2. Adding a New Category in the Portfolio (e.g., System, Network)
To add a new category to the portfolio section, such as System or Network, follow these steps:

a. **HTML**:  
In the `index.html` file, go to the portfolio section and add new filter buttons for the new categories:

```html
<section class="projects">
  <ul class="filter-list">
    <li class="filter-item"><button class="active" data-filter-btn>All</button></li>
    <li class="filter-item"><button data-filter-btn>Applications</button></li> <!-- Remove It If You Dont Need It -->
    <li class="filter-item"><button data-filter-btn>your-new-button</button></li> <!-- Add Your New Button here -->
  </ul>

  <!-- Portfolio Filter Select -->
  <div class="filter-select-box">
    <button class="filter-select" data-select>
      <div class="select-value" data-selecct-value>Select category</div>
      <div class="select-icon"><ion-icon name="chevron-down"></ion-icon></div>
    </button>
    <ul class="select-list">
      <li class="select-item"><button data-select-item>All</button></li>
      <li class="select-item"><button data-select-item>Applications</button></li> <!-- Remove It If You Dont Need It -->
      <li class="select-item"><button data-select-item>your-new-button</button></li>   <!-- Add Your New Button here -->
    </ul>
  </div>
</section>
```

You can add more categories by replicating the `<li>` elements inside the `filter-list` and `select-list`.

b. **JavaScript (JS)**:  
No need to modify anything in `script.js` for adding new categories. The portfolio items are filtered automatically based on the `data-category` attribute, which corresponds to the categories you defined in the HTML.

For example, in `data.json`, each project should have a `category` attribute like so:

```json

"portfolio": [
  {
    "title": "Smart Home System",
    "category": "System",
    "projectPhoto": "./assets/images/projects/project-1.png",
    "images": [
      "./assets/images/projects/project-1-1.png",
      "./assets/images/projects/project-1-2.png"
    ],
    "link": "https://example.com"
  },
  {
    "title": "Networking Project 1",
    "category": "Network",
    "projectPhoto": "./assets/images/projects/project-2.png",
    "images": [],
    "link": ""
  }
]

```

The filtering logic is automatically handled by the `script.js` file, so you don’t need to do anything else to make it work.

### 3. Adding Links and Images to Your Projects

You can configure each project to include a link, an image, or both by updating `data.json`. Everything integrates smoothly without editing the JavaScript.

```json
"portfolio": [
  {
    "title": "Weather Dashboard",
    "category": "Web Development",
    "projectPhoto": "./assets/images/projects/project-1.png",
    "images": [
      "./assets/images/projects/project-1-1.png",
      "./assets/images/projects/project-1-2.png"
    ],
    "link": "https://weather-dashboard.netlify.app"
  },
  {
    "title": "Personal Portfolio",
    "category": "Design",
    "projectPhoto": "./assets/images/projects/project-2.png",
    "images": [],
    "link": ""
  }
]
```

**Configuration Breakdown**

- **`title`**: The project's name, displayed below the image.
- **`category`**: Determines how the project is filtered.
- **`projectPhoto`**: The main thumbnail displayed for the project.
- **`images`**: An array of images shown in the project’s gallery modal.
- **`link`**: Optional. If a link is provided, an 'eye' icon appears, linking to the project.

**Supported Scenarios**

- **Project with both link and images:**
   - The eye icon links to the project, and the gallery icon opens multiple images.

- **Project with only a link:**
   - The eye icon appears without a gallery icon.

- **Project with only images:**
   - The gallery icon appears, but no eye icon.

- **Project with neither link nor images:**
   - No icons appear — only a static thumbnail is displayed.


**Note**:  
- To hide the project link, leave the `link` field empty in `data.json`, and the project will appear without a clickable link.
- Same thing goes for images.

## Contact

If you want to contact me, fill out the contact form on the portfolio page, powered by [Netlify](https://ahmet-abed.netlify.app/). Alternatively, you can reach me directly through my [GitHub](https://github.com/sadmaxie).

## License

MIT



