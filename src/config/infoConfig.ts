export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = 'b1syyyy'
export const headline = 'undergraduate student at GDUF'
export const introduction =
  "雷猴! My name is Dengzhikang,and you can call me b1syyyy. I'm from Guangdong. I'm an undergraduate student at GDUF, majoring in software engineering. I have a strong passion for programming and technology, and I'm always eager to learn new things. I started this blog to share my insights and experiences in the world of computer science, as well as my thoughts on life and personal growth."
export const githubUsername = 'b1syyyy'
export const email = '893859442@qq.com'

// 常用网站
export const commonWebsites = [
  {
    name: 'GitHub',
    href: 'https://github.com/b1syyyy'
  },
  {
    name: 'bilibili',
    href: 'https://bilibili.com'
  },
  {
    name: 'Baidu',
    href: 'https://www.baidu.com'
  },
]

// about page
export const aboutMeHeadline = 'Who Are You and Why Should I Care?'
export const aboutParagraphs = [
  " 雷猴! My name is Dengzhikang,and you can call me b1syyyy. ",
  " I'm from Guangdong. I'm an undergraduate student at GDUF, majoring in software engineering. ",
  " I have a strong passion for programming and technology, and I'm always eager to learn new things. I started this blog to share my insights and experiences in the world of computer science, as well as my thoughts on life and personal growth."
]

// blog
export const blogHeadLine = "What I've thinking about.and what I wanna get"
export const blogIntro =
  "I've written nothing"

// social links
export type SocialLinkType = {
  name: "b1syyyy" | 'Tiktok' | 'Bilibili' | 'GitHub' | 'LinkedIn' | 'Twitter' | 'WeChat'
  ariaLabel?: string
  icon: string
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'Tiktok',
    icon: 'tiktok',
    href: 'https://www.douyin.com/user/MS4wLjABAAAAio23PBaOLl_byV7-z0vHBaFNGReUhhdeQe9QmrkGOjY?from_tab_name=main',
  },
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/346168633?spm_id_from=333.337.0.0',
  },
]

// https://simpleicons.org/
export const techIcons = [
  'typescript',
  'javascript',
  'supabase',
  'cloudflare',
  'java',
  'oracle',
  'mysql',
  'react',
  'nodedotjs',
  'nextdotjs',
  'prisma',
  'postgresql',
  'nginx',
  'vercel',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'androidstudio',
  'ios',
  'apple',
  'wechat',
]
