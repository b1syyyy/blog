
// education 
export type EducationItemType = {
    school: string
    major: string
    image?: string
    logo: string
    start: string
    end: string
  }
  
  
  
  export const educationList: Array<EducationItemType> = [
    {
      school: '深圳市行知小学',
      major: 'middle student',
      logo: 'college',
      start: '2013',
      end: '2019'
    },
    {
      school: '龙华区实验学校',
      major: 'junior student',
      logo: 'college',
      start: '2019',
      end: '2022'
    },
    {
      school: '深圳市格致中学',
      major: 'high student',
      logo: 'college',
      start: '2022',
      end: '2025'
    },
    {
      school: '广东金融学院',
      major: 'undergraduate student',
      logo: 'college',
      start: '2025',
      end: 'present'
    },
  ]