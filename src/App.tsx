/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  BrainCircuit, 
  BookOpen, 
  UserCircle, 
  Home, 
  GraduationCap,
  ChevronRight,
  Activity,
  Award,
  Presentation,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const stats = {
  total: 34,
  correct: 31,
  wrong: 3,
  missed: 0,
  accuracy: 91.2,
};

const difficultyData = [
  { name: '简单题', count: 15, accuracy: 100, avg: 95 },
  { name: '中等题', count: 14, accuracy: 92.8, avg: 82 },
  { name: '难题', count: 5, accuracy: 60, avg: 45 },
];

const knowledgePoints = [
  { subject: '小数乘除', score: 95, fullMark: 100 },
  { subject: '简易方程', score: 90, fullMark: 100 },
  { subject: '因数倍数', score: 88, fullMark: 100 },
  { subject: '位置方向', score: 92, fullMark: 100 },
  { subject: '立体几何', score: 65, fullMark: 100 },
  { subject: '分数性质', score: 70, fullMark: 100 },
];

const knowledgeList = [
  { name: '小数乘除法运算', status: '已掌握', difficulty: 2, diagnosis: '计算精准度极高，小数点移动规律熟练' },
  { name: '位置与数对', status: '已掌握', difficulty: 1, diagnosis: '空间定位能力强，能准确描述位置' },
  { name: '2、3、5的倍数特征', status: '已掌握', difficulty: 2, diagnosis: '奇偶数、质合数概念清晰，判断迅速' },
  { name: '因数与倍数', status: '已掌握', difficulty: 3, diagnosis: '找因数逻辑完整，无遗漏现象' },
  { name: '解简易方程', status: '已掌握', difficulty: 3, diagnosis: '解题步骤规范，符号意识强' },
  { name: '分数的意义与性质', status: '已掌握', difficulty: 3, diagnosis: '能熟练进行约分、通分，分数大小比较准确' },
  { name: '列方程解决实际问题', status: '部分掌握', difficulty: 4, diagnosis: '强于计算，但在“寻找隐蔽等量关系”时稍慢' },
  { name: '分数与小数互化', status: '部分掌握', difficulty: 3, diagnosis: '基础互化无误，但在复杂混合运算中反应速度待提升' },
  { name: '长方体/正方体表面积', status: '未掌握', difficulty: 5, diagnosis: '属于重灾区。容易混淆公式，或漏掉特定面' },
  { name: '组合图形应用', status: '未掌握', difficulty: 5, diagnosis: '缺乏图形拆解思维，对空间切割后的变量不敏感' },
];

const boardImages = [
  "https://api.aistudio.google.com/v1/files/input_file_0.png",
  "https://api.aistudio.google.com/v1/files/input_file_1.png",
  "https://api.aistudio.google.com/v1/files/input_file_2.png"
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

// --- Components ---

const Card = ({ children, className, title, icon: Icon }: { children: React.ReactNode, className?: string, title?: string, icon?: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn("bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-sm", className)}
  >
    {title && (
      <div className="flex items-center gap-2 mb-6">
        {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
      </div>
    )}
    {children}
  </motion.div>
);

const Metric = ({ label, value, subValue, icon: Icon, color }: { label: string, value: string | number, subValue?: string, icon: any, color: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <div className={cn("p-3 rounded-xl", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {subValue && <span className="text-xs font-medium text-slate-400">{subValue}</span>}
      </div>
    </div>
  </div>
);

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={cn("text-xs", i < count ? "text-amber-400" : "text-slate-200")}>★</span>
    ))}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      {/* Header / Hero */}
      <header className="relative overflow-hidden bg-slate-900 pt-16 pb-32 px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#4f46e5,transparent)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[grid-size:40px] opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                <Activity className="w-3 h-3" />
                2026-Q1 阶段性诊断
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
                张凌轩 <span className="text-indigo-400 font-light">数学学习报告</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                未来素养2026-01季度-五年级-A+班级表现深度分析
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center gap-6">
              <div className="text-center">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">综合正确率</p>
                <p className="text-4xl font-black text-emerald-400">{stats.accuracy}%</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">学习等级</p>
                <p className="text-4xl font-black text-indigo-400">A+</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 space-y-8">
        {/* Section 1: Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Metric label="总互动题量" value={stats.total} subValue="覆盖7课时" icon={Target} color="bg-indigo-500" />
          <Metric label="答对题数" value={stats.correct} subValue="步骤完整" icon={CheckCircle2} color="bg-emerald-500" />
          <Metric label="答错题数" value={stats.wrong} subValue="集中于综合题" icon={AlertCircle} color="bg-amber-500" />
          <Metric label="参与率" value="100%" subValue="全勤互动" icon={TrendingUp} color="bg-rose-500" />
        </div>

        {/* Section 2: Difficulty & Knowledge Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="题目难度分层分析" icon={Activity}>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} unit="%" />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="accuracy" name="个人正确率" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="avg" name="同级平均" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed italic">
              * 在简单与中等难度题目中表现极其稳定，难题正确率60%高于平均水平，具备极高潜力。
            </p>
          </Card>

          <Card title="知识点掌握雷达图" icon={BrainCircuit}>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={knowledgePoints}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Radar
                    name="掌握程度"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.6}
                  />
                  <Tooltip contentStyle={{ borderRadius: '16px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                <CheckCircle2 className="w-3 h-3" /> 已掌握：小数运算、方程、因数
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 p-2 rounded-lg">
                <AlertCircle className="w-3 h-3" /> 待强化：立体几何、分数性质
              </div>
            </div>
          </Card>
        </div>

        {/* Section 2.5: Knowledge Point Mastery Table */}
        <Card title="知识点掌握一览表" icon={BookOpen}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">知识点名称</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">掌握情况</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">难度系数</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">备注/错误原因诊断</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {knowledgeList.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold",
                        item.status === '已掌握' ? "bg-emerald-100 text-emerald-700" :
                        item.status === '部分掌握' ? "bg-amber-100 text-amber-700" :
                        "bg-rose-100 text-rose-700"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <StarRating count={item.difficulty} />
                    </td>
                    <td className="py-4">
                      <span className="text-xs text-slate-500 leading-relaxed">{item.diagnosis}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-slate-400 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            基于课堂互动数据及小学5年级数学课程标准梳理
          </p>
        </Card>

        {/* Section 3: Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card title="深度诊断总结" icon={Award} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <UserCircle className="w-4 h-4" /> 学生画像：学霸型选手
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  态度积极（100%参与），基础雄厚（简单/中等题近乎全对）。当前瓶颈在于建模思维稍弱，习惯心算而非动手画图。
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> 建模思维瓶颈
                  </h5>
                  <p className="text-sm text-slate-500">
                    遇到复杂相遇或几何切割题，习惯心算，缺乏画线段图或建立空间模型的习惯。
                  </p>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> 审题惯性思维
                  </h5>
                  <p className="text-sm text-slate-500">
                    对常见题型反应快，但对陷阱（如单位不统一、求表面积还是侧面积）警惕性不够。
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="重点关注方向" icon={AlertCircle} className="bg-indigo-600 text-white border-none">
            <div className="space-y-4">
              {[
                { title: "立体图形综合应用", desc: "解决无盖水箱、刷油漆等多面问题" },
                { title: "等量关系翻译能力", desc: "从题目中提取方程，而非仅解方程" },
                { title: "计算步骤规范化", desc: "减少跳步，防范复杂分数运算失误" }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <h5 className="font-bold text-white mb-1">{item.title}</h5>
                  <p className="text-xs text-indigo-100 opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Section 4: Advice Timeline */}
        <Card title="后续学习与支持建议" icon={GraduationCap}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <BookOpen className="w-5 h-5" /> 学习重点
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>强化“画图法”，用线段图分析数量关系</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>建立错题逻辑档案，分析错误根源</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <GraduationCap className="w-5 h-5" /> 教学支持
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>课堂多分配“说理题”，锻炼逻辑表达</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>提供挑战性压轴题，激发求知欲</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-600 font-bold">
                <Home className="w-5 h-5" /> 家庭辅导
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>准备长方体模具进行实操切割拆解</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>坚持“读题两遍”，规范草稿书写</span>
                </li>
              </ul>
            </div>

            {/* Classroom Board Writing Slider */}
            <div className="md:col-span-3 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Presentation className="w-5 h-5 text-indigo-600" /> 课堂板书回顾
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-400">左右滑动查看更多</span>
                </div>
              </div>
              
              <div className="relative group">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar scroll-smooth">
                  {boardImages.map((src, idx) => (
                    <div key={idx} className="flex-none w-full md:w-[600px] snap-center">
                      <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                        <img 
                          src={src} 
                          alt={`课堂板书 ${idx + 1}`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-widest">
                          Board Note 0{idx + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Summary */}
        <footer className="text-center py-12">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500 mb-6">
            <div className="bg-white px-8 py-3 rounded-full">
              <p className="text-slate-800 font-bold">
                报告总结：凌轩目前处于优等生稳固期，完全具备冲击满分的实力！
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-xs tracking-widest uppercase">
            未来素养教育大数据中心 · 2026 阶段性诊断分析
          </p>
        </footer>
      </main>
    </div>
  );
}
