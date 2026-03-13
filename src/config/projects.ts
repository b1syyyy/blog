// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
}

export type ActivityItemType = {
  name: string
  description: string
  date: string
  location: string
  link?: string
}

// Awards
export const awardsHeadLine = "Awards & Honors"
export const awardsIntro = "Recognition for academic and professional achievements."

export const awards: Array<ActivityItemType> = [
  {
    name: 'No1,National Fancy Shuttlecock Championship',
    description: '',
    date: '2018',
    location: 'Gansu, China',
  },
  {
    name: '2nd,National Shuttlecock Competition',
    description: '',
    date: '2019',
    location: 'tianjing, China',
  },
  
]

// 自己的Projects，小项目
export const projectHeadLine = "Research & Projects"
export const projectIntro = "No yet"

export const projects: Array<ProjectItemType> = [
  {
    name: '',
    description: '',
    link: { href: 'scls-cs.com', label: 'GitHub Cards' },
    tags: ['Website', 'Next.js', 'TailwindCSS', 'DaisyUI', 'Portfolio']
  },
  {
    name: '',
    description: '',
    link: { href: 'None', label: 'Hackathon' },
    tags: [ 'Java']
  },
  {
    name: '选股系统',
    description: '',
    link: { href: 'None', label: 'StockPick' },
    tags: ['Stock', 'Python']
  },
  {
    name: '量化交易系统',
    description: '初步目标hhha',
    link: { href: 'None', label: 'QuantSystem' },
    tags: ['Quant', 'AI','Python']
  },
]

// Hobbies & Volunteer
export const activitiesHeadLine = "Hobbies "
export const activitiesIntro = "Personal interests "

export const activities: Array<ActivityItemType> = [
  {
    name: 'Basketball🏀',
    description:'Playing basketball with friends and participating in tournaments.',
    date: '',
    location: 'Shenzhen',
    link: 'None',
  },
  {
    name: 'Volleyball🏐',
    description:
      'Playing volleyball with friends and participating in local tournaments.',
    date: '',
    location: 'Shenzhen',
    link: 'None',
  },
  {
    name: 'Code',
    description:
      'Still a beginner',
    date: '',
    location: 'Shenzhen',
  },
]
export type WebItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
}

export const web: Array<WebItemType> = [
  {
    name: 'bilibili',
    description: '',
    link: { href: 'https://www.bilibili.com', label: 'bilibili' },
    tags: ['']
  },
  {
    name: 'GitHub',
    description: '',
    link: { href: 'https://www.github.com', label: 'GitHub' },
    tags: ['']
  },
  {
    name: 'Baidu',
    description: '',
    link: { href: 'https://www.baidu.com', label: 'Baidu' },
    tags: ['']
  },

]
