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

## New Features in this Update

- **Data File Configuration**: You can now manage all your personal details (such as social links, portfolio projects, CV, etc.) through a centralized data file.
- **Download CV Button**: A new feature allows visitors to download your CV directly from the portfolio site.
- **Updated Contact Me Section**: The "Contact Me" form now works seamlessly with Netlify for easy form submissions and management.
- **Add New Sections Dynamically**: You can now add new sections (such as Education or Certificates) under your resume with dynamic content injection via JavaScript and a data file.
- **Add New Categories to Portfolio**: You can easily add new categories like "System" or "Network" to the portfolio section, including automatic filtering functionality.
- **Link for Testimonials**: You can now add the link to the CV or profile of any testimonial author who has commented on your portfolio.
- **Clickable Project Links**: In the portfolio section, projects now feature clickable links. If a project has an associated link, you can click on it to open the project in a new tab.
- **Clickable Blog Links**: The blog section now supports clickable links. You can add a link to any blog post or resource, and users can click on it to open the blog or resource in a new tab.

## Instructions

### 1. Adding a New Tree Branch (e.g., Education, Certificates)
If you want to add a new section under the resume (such as Education or Certificates), follow these steps:

a. **HTML**:
In the `index.html` file, you need to add a new section for the branch:

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

b. **JavaScript (JS)**:
In the `data.js` file, add new data under the relevant array (e.g., education array). In `script.js`, add logic to inject this data dynamically.

For example, in `data.js`:

```javascript
const yourNewSectionData = [
  {
    title: "Sample Item Title",
    description: "Description of the item goes here.",
    date: "January 2025"
  },
  {
    title: "Another Item",
    description: "More details about the item.",
    date: "February 2025"
  }
];
```

In `script.js`, add the function to load the new section dynamically:

```javascript
function loadNewSectionData() {
  const newSectionList = document.getElementById('your-new-section-id');
  yourNewSectionData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('timeline-item');
    
    const title = document.createElement('h4');
    title.textContent = item.title;
    
    const description = document.createElement('p');
    description.textContent = item.description;
    
    const date = document.createElement('time');
    date.textContent = item.date;

    listItem.append(title, description, date);
    newSectionList.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  loadNewSectionData();
});
```

### 2. Adding a New Category in the Portfolio (e.g., System, Network)
To add a new category to the portfolio section, such as System or Network, follow these steps:

a. **HTML**:
In the portfolio section, add new filter buttons for the new categories:

```html
<li class="filter-item">
  <button data-filter-btn>System</button> <!-- New category -->
</li>

<li class="filter-item">
  <button data-filter-btn>Network</button> <!-- Another category -->
</li>
```

b. **JavaScript (JS)**:
In the `data.js` file, ensure each portfolio item has a `category` attribute (e.g., `category: "System"`, `category: "Network"`).

For example, in `data.js`:

```javascript
const portfolioItems = [
  {
    title: "System Project 1",
    description: "This is a system-related project.",
    category: "System",
    link: "https://link-to-project.com"
  },
  {
    title: "Network Project 1",
    description: "This is a network-related project.",
    category: "Network",
    link: "https://link-to-project.com"
  }
];
```

In `script.js`, modify the portfolio filtering logic to recognize the new categories:

```javascript
function filterPortfolio(category) {
  const filteredItems = portfolioItems.filter(item => item.category === category);
  
  const portfolioList = document.getElementById('portfolio');
  portfolioList.innerHTML = '';  // Clear current portfolio items

  filteredItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('portfolio-item');
    
    const title = document.createElement('h4');
    title.textContent = item.title;
    
    const description = document.createElement('p');
    description.textContent = item.description;

    const link = document.createElement('a');
    link.href = item.link;
    link.textContent = 'View Project';

    listItem.append(title, description, link);
    portfolioList.appendChild(listItem);
  });
}

document.querySelectorAll('[data-filter-btn]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent.trim();
    filterPortfolio(category); // Filter based on clicked category
  });
});
```

## Contact

If you want to contact me, fill out the contact form on the portfolio page, powered by [Netlify](https://www.netlify.com/). Alternatively, you can reach me directly through my [GitHub](https://github.com/sadmaxie).

## License

MIT
