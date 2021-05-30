import ld from "lodash"
import bcrypt from "bcryptjs"
const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(pass, salt)
}
export const users = [
  {
    name: "Harsh Sharma",

    email: "dsharsh2000@gmail.com",
    profession: "Web Developer",
    password: hashPassword("12345"),
    skills: [
      "Python",
      "Javascript",
      "React",
      "scss",
      "NodeJS",
      "mongoDB",
      "Bootstrap",
      "web development",
    ].map((skill) => ld.kebabCase(skill)),
    projects: [
      "AnimeTV",
      "Portfolio",
      "Helpy",
      "Todo",
      "Google Keep Clone",
      "Music Player",
    ],
    phone: "909473892",
    address: "Defense Meerut",

    about:
      "Hi! I am a Web Developer currently learning data science! and i am looking for intrenships",

    intrest:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",

    contact: {
      linkedin: "https://www.linkedin.com/in/harsh-sharma-294578160/",
      twitter: "https://twitter.com/harshsh999",
    },
    image: "https://avatars.githubusercontent.com/u/73233554?v=4",
    isAdmin: true,
  },

  {
    name: "Neeraj Gailakoti",
    email: "neeraj@gmail.com",
    password: hashPassword("12345"),
    profession: "Android Developer",
    skills: [
      "Python",
      "Javascript",
      "React",
      "scss",
      "NodeJS",
      "mongoDB",
      "Bootstrap",
    ].map((skill) => ld.kebabCase(skill)),
    projects: [
      "AnimeTV",
      "Portfolio",
      "Helpy",
      "Todo",
      "Google Keep Clone",
      "Music Player",
    ],
    phone: "6578457655",
    address: "Almora Haldwani",

    about:
      "Hi! I am a Web Developer currently learning data science! and i am looking for intrenships",

    intrest:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",

    contact: {
      linkedin: "https://www.linkedin.com/in/harsh-sharma-294578160/",
      twitter: "https://twitter.com/harshsh999",
    },
    image:
      "https://harsh-sharma-33.github.io/Portfolio-template-basic-/img/profile.jpeg",
  },

  {
    name: "Parshant Yadav",
    email: "pryad@gmail.com",
    profession: "Bug Bounty Hunter",
    password: hashPassword("12345"),
    skills: [
      "Python",
      "Javascript",
      "React",
      "scss",
      "NodeJS",
      "mongoDB",
      "Bootstrap",
    ].map((skill) => ld.kebabCase(skill)),
    projects: [
      "AnimeTV",
      "Portfolio",
      "Helpy",
      "Todo",
      "Google Keep Clone",
      "Music Player",
    ],
    image:
      "https://scontent.fdel37-1.fna.fbcdn.net/v/t1.6435-9/72319626_2383692018546018_6579169829024956416_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zg9TAnMkYWoAX_ExrwH&_nc_ht=scontent.fdel37-1.fna&oh=7cf3c00cf72a4ce2824fe4d1d2099800&oe=60AFF88B",

    about:
      "Hi! I am a Web Developer currently learning data science! and i am looking for intrenships",

    intrest:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",

    contact: {
      linkedin: "https://www.linkedin.com/in/harsh-sharma-294578160/",
      twitter: "https://twitter.com/harshsh999",
    },
    phone: "9012103465",
    address: "Ganga Nagar Meerut",
  },

  {
    name: "Vishakha Kaushik",
    email: "vk@gmail.com",
    profession: "Student",
    password: hashPassword("12345"),
    skills: [
      "Python",
      "Javascript",
      "React",
      "scss",
      "NodeJS",
      "mongoDB",
      "Bootstrap",
      "web development",
    ].map((skill) => ld.kebabCase(skill)),
    projects: [
      "AnimeTV",
      "Portfolio",
      "Helpy",
      "Todo",
      "Google Keep Clone",
      "Music Player",
    ],
    phone: "909473892",
    address: "Defense Meerut",

    about:
      "Hi! I am a Web Developer currently learning data science! and i am looking for intrenships",

    intrest:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",

    contact: {
      linkedin: "https://www.linkedin.com/in/harsh-sharma-294578160/",
      twitter: "https://twitter.com/harshsh999",
    },
  },
]
