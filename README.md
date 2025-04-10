// "dev": "ts-node src/app.ts",

"main": "index.js",

"dev": "nodemon --ext ts --exec ts-node src/app.ts"

"dev": "nodemon --ext ts --exec \"node --loader ts-node/esm\" src/app.ts"

"dev": "nodemon --ext ts --exec \"node --loader ts-node/esm src/app.ts\""

    "dev": "nodemon --ext ts --exec \"node --no-warnings --loader ts-node/esm src/app.ts\""


    "dev": "nodemon --ext ts --exec \"node --no-warnings --loader ts-node/esm src/app.ts\""

{
imgUrl: "https://ftp.goit.study/img/pets/3.webp",
title: "Ukrainian House",
description:
"This website promotes Ukrainian literature with a library, news pages, contact form, and an admin panel.",
role: "Team project",
technologies: ["HTML", "S-components", "React", "Node.js"],
repUrl: "https://github.com",
demoUrl: "https://live-demo.com/",
date: "01-05-2023",
},
{
imgUrl: "https://ftp.goit.study/img/pets/3.webp",
title: "HYPE TATTOO",
description:
"Responsive landing page for a tattoo studio, including a 'Not Found' (404) page and 'Thank You' page.",
role: "Team project",
technologies: ["HTML", "S-components", "React", "Node.js"],
repUrl: "https://github.com",
demoUrl: "https://live-demo.com/",
date: "01-05-2023",
},
{
imgUrl: "https://ftp.goit.study/img/pets/3.webp",
title: "E-Pharmacy",
description:
"An accessible web app for searching and ordering medicines, featuring user authentication and dynamic search.",
role: "Individual project",
technologies: ["HTML", "CSS", "React", "Node.js"],
repUrl: "https://github.com",
demoUrl: "https://live-demo.com/",
date: "01-05-2023",
},
{
imgUrl: "https://ftp.goit.study/img/pets/3.webp",
title: "petLove",
description:
"Platform for pet owners to post pet listings, find partners, and connect with users in a community.",
role: "Individual project",
technologies: ["HTML", "CSS", "JavaScript"],
repUrl: "https://github.com",
demoUrl: "https://live-demo.com/",
date: "01-05-2023",
},
{
imgUrl: "https://ftp.goit.study/img/pets/3.webp",
title: "Nanny.Services",
description:
"Web app that connects users with available nannies, allowing users to browse, filter, and save favorites.",
role: "Individual project",
technologies: ["HTML", "CSS", "JavaScript"],
repUrl: "https://github.com",
demoUrl: "https://live-demo.com/",
date: "01-05-2023",
},
{
imgUrl: "https://ftp.goit.study/img/pets/3.webp",
title: "Nanny12.Services",
description:
"Web12 app that connects users with available nannies, allowing users to browse, filter, and save favorites.",
role: "Individual project",
technologies: ["HTML", "S-components", "React"],
repUrl: "https://github.com",
demoUrl: "https://live-demo.com/",
date: "01-05-2023",
},

export interface Project {
title: string;
role: string;
repUrl: string;
demoUrl: string;
imgUrl: string;
description: string;
technologies: string[];
date: string;
}

├── server.js
├── .env
├── controller
│ └── index.js
├── package.json
├── service
│ ├── schemas
│ | └── task.js
│ └── index.js
└── api
└── index.js
