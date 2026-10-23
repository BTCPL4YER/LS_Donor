# Life Stream Donors

A responsive blood donation website concept for connecting donors, people seeking blood, and donation information.

**Maintainer:** [BTCPL4YER](https://github.com/BTCPL4YER)

## Pages

- `index.html` — Homepage, donor registration, donor list, blood requests, and contact information
- `donor.html` — Donor registration
- `schedule.html` — Donation scheduling
- `history.html` — Donation history
- `blood-types.html`, `process.html`, `benefits.html` — Donation information
- `faq.html`, `help.html`, `contact.html` — Support pages
- `donate.html` — Donation information and form

## Project structure

```text
.
├── index.html                 # Homepage
├── donor.html                 # Donor registration
├── schedule.html              # Donation scheduling
├── history.html               # Donation history
├── blood-types.html           # Blood type guide
├── process.html               # Donation process
├── benefits.html              # Donation benefits
├── faq.html                   # Frequently asked questions
├── help.html                  # Help page
├── contact.html               # Contact page
├── donate.html                # Donation form page
├── scripts/
│   ├── site/main.js            # Shared site navigation and page behavior
│   ├── main.js                 # Donation page behavior
│   └── messages.js             # Donation page messages
├── styles/
│   ├── site/main.css           # Shared site styles
│   ├── donate.css              # Donation page styles
│   └── images/                 # CSS image assets
├── images/                     # Site image assets
├── fonts/                      # Site fonts
├── icons/                      # Favicon and app icons
└── webmanifest/site.webmanifest
```

## Features

- Responsive navigation with a Donate dropdown and mobile/tablet menu
- Donor, request, and schedule forms
- Browser-local storage for demo donor, request, profile, and schedule data
- Scroll reveal and page transition effects, respecting reduced-motion preferences
- Page descriptions and Open Graph metadata

## Note

This is a front-end prototype. Data is stored in the visitor's browser and is not sent to a server. It does not provide verified donor matching, emergency dispatch, or medical advice. Confirm donation eligibility and blood availability with qualified local providers.

## License

No license is currently specified. Contact the maintainer before reusing or redistributing the project.
