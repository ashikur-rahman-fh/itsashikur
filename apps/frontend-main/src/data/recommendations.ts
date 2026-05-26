export type Recommendation = {
  id: string;
  name: string;
  role: string;
  relationship: string;
  date?: string;
  quote: string;
  fullQuote?: string;
  featured?: boolean;
};

export const recommendations: Recommendation[] = [
  {
    id: 'zubayet-zaman-zico',
    name: 'Zubayet Zaman Zico',
    role: 'Software Development Lead',
    relationship: 'Managed Ashikur directly',
    date: 'September 7, 2022',
    quote:
      'Ashikur showed excellent problem-solving, technical, and communication skills. He is a quick learner who meets deadlines with high standards.',
    fullQuote:
      'Ashikur Rahman is one of the most talented people that I have had the chance to work with. During his short stay at Enosis, he showed excellent problem solving, technical and communication skills. He is a quick learner who makes sure all the deadlines are met and that also with the highest standards. He is a true professional, helpful and positive person. It was a pleasure and honor to work with him.',
    featured: true,
  },
  {
    id: 'mohammad-shakhawat-amin',
    name: 'Mohammad Shakhawat Amin',
    role: 'Senior Software Engineer',
    relationship: 'Senior colleague',
    date: 'October 3, 2022',
    quote:
      'Ashikur is one of the deep thinkers I worked with. He reads between the lines, thinks critically, and focuses on improving overall quality.',
    fullQuote:
      'Ashikur is one of the deep thinkers I have ever worked with. He not only read the lines; he also read between them. He tried to fix all related areas too, and if he could not due to time constraints, at least mentioned them to the team so that quality stays up to date. He is a critical thinker and real-world problem solver. I really had fun working with him.',
    featured: true,
  },
  {
    id: 'mohammad-sayemul-haque',
    name: 'Mohammad Sayemul Haque',
    role: 'Senior Software Engineer',
    relationship: 'Worked on the same team',
    date: 'September 6, 2022',
    quote:
      'He is an excellent teammate — cooperative, adaptable, technically sound, and able to tackle difficult problems in an organized way.',
    fullQuote:
      'I have worked with Ashikur Rahman on the same team for quite a while. He is an excellent teammate. Very cooperative. He can adapt to an environment quite fast. He tackles difficult problems in an organized manner and with ease. Technically sound. All in all, a valuable asset to any team.',
    featured: true,
  },
  {
    id: 'redoan-ur-rahman',
    name: 'Redoan Ur Rahman',
    role: 'Software Technical Lead',
    relationship: 'Senior colleague',
    date: 'September 6, 2022',
    quote:
      'A bright, hardworking, energetic quick learner who accepts new responsibilities and is very good at problem solving.',
    fullQuote:
      'I have had the pleasure of working with Ashikur at Enosis. He is a bright, hardworking, energetic, and quick learner. He is always ready to accept new responsibilities and is able to meet those properly. He is very good at problem solving and eager to learn new skills. I wish him all the success in his future expedition.',
    featured: false,
  },
  {
    id: 'md-shafiqul-islam-nafsan',
    name: 'Md. Shafiqul Islam Nafsan',
    role: 'Senior Software Engineer',
    relationship: 'Worked on the same team',
    date: 'September 6, 2022',
    quote:
      'Keen to learn new technologies, with excellent problem-solving skills and a focus on optimizing solutions into bug-free deliverables.',
    fullQuote:
      'I have worked with Ashikur on a project for around 10 months. Since the beginning, I have always found him very keen to learn new technologies. He has excellent problem-solving capability and always tries to optimize existing solutions to create bug-free deliverables. I wish all the best to Ashikur for his future endeavors.',
    featured: false,
  },
];

export const featuredRecommendations = recommendations.filter((item) => item.featured);
export const moreRecommendations = recommendations.filter((item) => !item.featured);
