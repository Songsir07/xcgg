import React from 'react';
import { APP_NAME } from '../constants';
import { Github, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  return (
    <footer id={SectionId.CONTACT} className="bg-white dark:bg-black border-t border-gray-100 dark:border-white/10 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4">
            <h3 className="font-bold text-2xl mb-6 text-gray-900 dark:text-white transition-colors duration-300">{APP_NAME}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              于自然深处，构建数字未来。<br/>
              我们致力于将硅谷的前沿技术带入中国乡村，创造工作与生活平衡的终极形态。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all"><Github size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="md:col-span-5 md:col-start-8">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-6">联系我们</h4>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
               <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">报名/咨询电话</div>
                    <a href="tel:19703681290" className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">19703681290</a>
                  </div>
               </div>

               <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">电子邮箱</div>
                    <a href="mailto:yanghui@deepwork.cn" className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">yanghui@deepwork.cn</a>
                  </div>
               </div>

               <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">基地地址</div>
                    <span className="text-base font-medium text-gray-900 dark:text-white">浙江省衢州市衢江区峡川镇东坪村99号乡村硅谷</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 dark:text-gray-600 text-xs">© 2024 Rural Silicon Valley. 保留所有权利。</p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-600">
             <a href="#" className="hover:text-black dark:hover:text-white transition-colors">隐私政策</a>
             <a href="#" className="hover:text-black dark:hover:text-white transition-colors">服务条款</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;