
import { Code, Mountain, Cpu } from 'lucide-react';
import { ServiceItem, NavItem, SectionId, NewsArticle } from './types';

export const APP_NAME = "乡村硅谷";
export const GITHUB_ORG_URL = "https://github.com/Rural-Silicon-Valley";

export const NAV_ITEMS: NavItem[] = [
  { label: '首页', href: 'home', isPage: true },
  { label: '社会价值', href: `#${SectionId.IMPACT}` }, 
  { label: '居住环境', href: `#${SectionId.ACCOMMODATION}` }, // Updated to point to new section
  { label: '生态系统', href: `#${SectionId.SERVICES}` },
  { label: '荣誉墙', href: 'hall-of-fame', isPage: true },
  { label: '新闻中心', href: 'news', isPage: true }, 
  { label: '开源社区', href: `#${SectionId.GITHUB}` },
];

export const SERVICES: ServiceItem[] = [
  {
    title: "深度工作营",
    description: "置身于高保真自然环境中的封闭式开发营地。断联纷扰，重连心流。",
    icon: Code,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "极客·狂想",
    description: "这是属于程序员的疯狂游乐场。在私有 GPU 矩阵中训练模型，在静谧山谷中释放野性代码。",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "山野·归零",
    description: "在算法的尽头遇见森林。为长期面对屏幕的眼睛提供 500 英亩的绿意，重启系统，回归本真。",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&q=80&w=800"
  }
];

export const NEWS_DATA: NewsArticle[] = [
  {
    id: '1',
    title: "乡村硅谷发布 NatureConnect API",
    summary: "我们开源了首个用于连接生物多样性监测传感器与大语言模型的接口层。",
    date: "2024.03.15",
    category: "技术发布",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '2',
    title: "春季黑客马拉松：为地球编码",
    summary: "来自 12 个国家的 50 名开发者齐聚烂柯山，探索可持续计算的未来。",
    date: "2024.02.20",
    category: "社区活动",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '3',
    title: "与衢州市政府达成战略合作",
    summary: "共同建设乡村 AI 教育示范基地，致力于消除数字鸿沟。",
    date: "2024.01.10",
    category: "公司新闻",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800"
  }
];
