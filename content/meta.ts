import { PageMeta } from "@lib/types"

const myImage = "/images/davee.jpg"
const blogImage = "https://i.postimg.cc/dVQkjgxp/blog.png"


const pageMeta: PageMeta = {
  home: {
    title: "Matthew Schmitt",
    description: "Hey, I am Matthew Schmitt. I'm a Full Stack & Blockchain Developer who enjoys developing innovative software solutions that are tailored to customer desirability and usability.",
    image: myImage,
    keywords: "Matthew Schmitt's Portfolio, matt's blog, top blog sites, top 10 blog sites, best blog sites, best portfolio template, best programming blogs",
  },


  blogs: {
    title: "Blogs",
    description: "Here, you will find a collection of insightful and informative articles that I have written on various topics. As a passionate writer and avid learner, I believe in the power of sharing knowledge and experiences through the written word.",
    image: blogImage,
    keywords: "matthew schmitt blog, matt blog, blog, webdev, react, react blog application, django blog applicaiton, programming blogs, top 10 programming blogs, top programming blogs",
  },

  projects: {
    title: "Projects",
    description: "I've been making various types of projects some of them were basics and some of them were complicated.",
    image: myImage,
    keywords: "projects, work, side project, numan projects, mazid projects, portfolio projects, blog projects, projects page template",
  },
  about: {
    title: "About",
    description: "Hey, I am Matthew Schmitt. Experienced professional Full Stack & Blockchain Developer who enjoys developing innovative software solutions that are tailored to customer desirability and usability.",
    image: myImage,
    keywords: "about, about me, about matt, who is matt, saito, about schmitt, portfolio about page",
  },

  contact: {
    title: "Contact",
    description: "Do you have something on your mind that you'd like to discuss? Whether it's work-related or simply a casual conversation, I'm here and eager to lend an ear. Please don't hesitate to get in touch with me at any time.",
    image: myImage,
    keywords: "contact, contact page, matthew schmitt contact, contact matt",
  },
  snippets: {
    title: "Snippets",
    description: "These are a collection of snippets I've used in the past and saved. These could be useful to you as well.",
    image: myImage,
    keywords: "Code, Code Snippets, Snippets, matthew schmitt code snippets, matt code snippets, snippets code, matt snippets, matthew schmitt snippets",
  },
}

export default pageMeta
