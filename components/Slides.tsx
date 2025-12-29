import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Users, MessageSquare, Search, ThumbsUp, Wallet, Database, BrainCircuit, MousePointerClick, TrendingUp, Bot, Repeat, Car, PlayCircle, ChevronLeft, ChevronRight, FileBarChart, Phone, Star, CheckCircle, Headphones, LayoutGrid, MapPin, Wrench, MessageCircle, Percent, AlertCircle, FileCheck, PhoneCall, Timer, UserCheck, Building2, Map, Crosshair, ArrowDown, Activity, Clock, Coffee, MonitorCheck, MapPinned, LayoutDashboard, GripVertical, HelpCircle, FileText, Terminal, CreditCard, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// --- Helper: Browser Window Mockup ---
const BrowserWindow: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title = "uremont.com" }) => (
  <div className="w-full h-full bg-[#1e293b] rounded-xl overflow-hidden shadow-2xl flex flex-col border border-gray-700">
    {/* Browser Header */}
    <div className="bg-[#0f172a] px-4 py-2 flex items-center gap-3 border-b border-gray-800 shrink-0">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
      </div>
      <div className="ml-4 flex-1 bg-[#1e293b] rounded-md h-6 flex items-center px-3 text-[10px] text-gray-400 font-mono border border-gray-700/50">
        <span className="text-gray-500 mr-2">🔒</span> https://{title}
      </div>
    </div>
    {/* Browser Content */}
    <div className="flex-1 bg-[#020617] overflow-hidden relative p-2 flex flex-col">
       <div className="w-full h-full bg-white rounded-lg border border-gray-800 overflow-hidden relative text-black">
          {children}
       </div>
    </div>
  </div>
);

// --- Slide 1: Welcome ---
export const WelcomeSlide: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
           <span className="px-3 py-1 rounded-full border border-uremont-blue text-uremont-blue text-xs md:text-sm uppercase tracking-widest">
             Релиз 01'2026
           </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-white leading-tight"
        >
          UREMONT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-uremont-blue to-cyan-400">
            AI 2.0
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-gray-400 font-light max-w-4xl">
          Улучшение пользовательского опыта.
          <br />
          Новый взгляд на УТП.
        </motion.p>
      </motion.div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-uremont-blue/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
};

// --- Slide 2: Agenda ---
interface AgendaSlideProps {
  onNavigate?: (index: number) => void;
}

export const AgendaSlide: React.FC<AgendaSlideProps> = ({ onNavigate }) => {
  const points = [
    { id: 1, title: "Основа изменений", desc: "Проблемы старой версии, требующие решения", targetSlide: 2 },
    { id: 2, title: "CustDev и цифры", desc: "Данные, на которых основаны решения: аудитория и боли, факторы доверия", targetSlide: 3 },
    { id: 3, title: "Новые решения", desc: "Переработанное УТП, новая база данных, обновление AI-алгоритмов", targetSlide: 6 },
    { id: 4, title: "Обновленная операционная модель", desc: "Технологичность, скорость и контроль качества звонков через AI", targetSlide: 10 },
    { id: 5, title: "Новая система отбора СТО", desc: "Измененные стандарты для партнеров и план масштабирования", targetSlide: 11 },
    { id: 6, title: "План доработок", desc: "Список запланированных работ на Q1 2026", targetSlide: 12 },
    { id: 7, title: "Свободное обсуждение", desc: "Q&A сессия по результатам презентации", targetSlide: 13 },
  ];

  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Содержание</h2>
        <div className="h-1 w-20 bg-uremont-blue rounded-full"></div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 gap-4 lg:gap-5 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {points.map((point) => (
          <motion.div 
            key={point.id} 
            variants={itemVariants}
            onClick={() => onNavigate && onNavigate(point.targetSlide)}
            className="group flex items-center gap-4 lg:gap-6 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-uremont-blue/50 transition-all duration-300 cursor-pointer active:scale-[0.99]"
          >
            <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-uremont-blue/20 text-uremont-blue font-bold text-lg group-hover:bg-uremont-blue group-hover:text-white transition-colors">
              {point.id}
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-0.5 group-hover:text-uremont-blue transition-colors">
                {point.title}
              </h3>
              <p className="text-gray-400 font-light text-sm group-hover:text-gray-300">
                {point.desc}
              </p>
            </div>
            <ArrowRight className="ml-auto text-gray-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Slide 3: Problems (Interactive) ---
export const ProblemSlide: React.FC = () => {
  const [activeProblem, setActiveProblem] = useState<number>(1);

  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.2fr] gap-8 lg:gap-12 items-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
             <span className="text-uremont-accent font-mono text-sm tracking-wider">01 / ПРОБЛЕМАТИКА</span>
             <h2 className="text-3xl lg:text-5xl font-bold mt-2 leading-tight">
               Точки роста <br />
               <span className="text-uremont-blue">предыдущей версии</span>
             </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
             {/* Problem 1 */}
             <div 
               className={`flex items-start gap-3 p-3 rounded-lg border-l-4 transition-all cursor-pointer ${activeProblem === 1 ? 'bg-white/10 border-red-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
               onMouseEnter={() => setActiveProblem(1)}
             >
                <div className="min-w-[20px] pt-1"><MousePointerClick className={`${activeProblem === 1 ? 'text-red-500' : 'text-gray-500'} w-5 h-5 transition-colors`} /></div>
                <div>
                    <h4 className="font-bold text-white mb-0.5 text-base lg:text-lg">Нет действия в один клик</h4>
                    <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                        Нельзя сразу рассчитать стоимость или записаться.
                    </p>
                </div>
             </div>
             {/* Problem 2 */}
             <div 
               className={`flex items-start gap-3 p-3 rounded-lg border-l-4 transition-all cursor-pointer ${activeProblem === 2 ? 'bg-white/10 border-orange-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
               onMouseEnter={() => setActiveProblem(2)}
             >
                <div className="min-w-[20px] pt-1"><Zap className={`${activeProblem === 2 ? 'text-orange-500' : 'text-gray-500'} w-5 h-5 transition-colors`} /></div>
                <div>
                    <h4 className="font-bold text-white mb-0.5 text-base lg:text-lg">Размытое УТП</h4>
                    <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                        Ключевое предложение не цепляло глаз и не закрывало боль клиента.
                    </p>
                </div>
             </div>
             {/* Problem 3 */}
             <div 
               className={`flex items-start gap-3 p-3 rounded-lg border-l-4 transition-all cursor-pointer ${activeProblem === 3 ? 'bg-white/10 border-yellow-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
               onMouseEnter={() => setActiveProblem(3)}
             >
                <div className="min-w-[20px] pt-1"><Search className={`${activeProblem === 3 ? 'text-yellow-500' : 'text-gray-500'} w-5 h-5 transition-colors`} /></div>
                <div>
                    <h4 className="font-bold text-white mb-0.5 text-base lg:text-lg">Сложный поиск услуг</h4>
                    <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                        Из 78 услуг в списке пользователи часто не находили нужную.
                    </p>
                </div>
             </div>
             {/* Problem 4 */}
             <div 
               className={`flex items-start gap-3 p-3 rounded-lg border-l-4 transition-all cursor-pointer ${activeProblem === 4 ? 'bg-white/10 border-blue-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
               onMouseEnter={() => setActiveProblem(4)}
             >
                <div className="min-w-[20px] pt-1"><Database className={`${activeProblem === 4 ? 'text-blue-500' : 'text-gray-500'} w-5 h-5 transition-colors`} /></div>
                <div>
                    <h4 className="font-bold text-white mb-0.5 text-base lg:text-lg">Ограниченная база авто</h4>
                    <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                        Отсутствовали редкие или новые модели.
                    </p>
                </div>
             </div>
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="w-full aspect-[16/10] relative hidden lg:block"
        >
           <BrowserWindow title="uremont.com (v1.0)">
              <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src="https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/9.jpg" 
                  alt="Старый интерфейс лендинга"
                  className="w-full h-full object-cover"
                />
              </div>
           </BrowserWindow>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 4: Data (CustDev) - Updated Context & Pains ---
export const DataSlide: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-8"
      >
        <span className="text-uremont-accent font-mono text-sm tracking-wider">02 / АУДИТОРИЯ И БОЛИ</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          В основе решений — <span className="text-uremont-blue">настоящие проблемы</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl">
        {/* Stat 1: Audience & Context */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-uremont-blue mb-1">63%</div>
                <div className="text-base lg:text-lg font-medium text-white">Низкая лояльность</div>
             </div>
             <Users className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Аудитория готова рассмотреть смену сервиса: лишь 37% всегда ездят в одно место. 45% у обслуживается дилеров, 38% в НСТО, 14% у знакомых. 
          </div>
        </motion.div>

        {/* Stat 2: Key Pain */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-1">63%</div>
                <div className="text-base lg:text-lg font-medium text-white">Страх навязывания</div>
             </div>
             <AlertCircle className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Ключевая боль рынка — стресс. 63% боятся лишних работ, 37% — переплатить. Ядро боли: недоверие + непрозрачность.
          </div>
        </motion.div>

        {/* Stat 3: Price Problem */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-uremont-accent mb-1">69%</div>
                <div className="text-base lg:text-lg font-medium text-white">Важно знать цену заранее</div>
             </div>
             <Wallet className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             При этом 66,18% из опрошенных респодентов не понимают структуру ценообразования.
          </div>
        </motion.div>

         {/* Stat 4: Complexity */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-purple-500 mb-1">57%</div>
                <div className="text-base lg:text-lg font-medium text-white">Боятся некачественных работ</div>
             </div>
             <HelpCircle className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             А еще им сложно выбрать СТО: 43% опрошенных не могут сравнить сервисы между собой.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 5: DataSlide2 (CustDev Part 2) - Solutions & Triggers ---
export const DataSlide2: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-8"
      >
        <span className="text-uremont-accent font-mono text-sm tracking-wider">02 / ФАКТОРЫ ДОВЕРИЯ И РЕШЕНИЯ</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Что говорят <span className="text-uremont-blue">потенциальные</span> клиенты?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl">
        {/* Stat 1: Trust Triggers */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-1">51%</div>
                <div className="text-base lg:text-lg font-medium text-white">Рейтинг решает</div>
             </div>
             <Star className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Главный триггер доверия — высокий рейтинг для 51%. Количество проведенных ремонтов автосервисом важно для 17%.
          </div>
        </motion.div>

        {/* Stat 2: Effective Messages */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-uremont-blue mb-1">54%</div>
                <div className="text-base lg:text-lg font-medium text-white">Честные цены</div>
             </div>
             <MessageSquare className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Самый эффективный месседж — на языке выгоды. Однако при сравнении цены и рейтинга, побеждает второй.
          </div>
        </motion.div>

        {/* Stat 3: Expectations */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-green-500 mb-1">64%</div>
                <div className="text-base lg:text-lg font-medium text-white">Цена до визита</div>
             </div>
             <FileText className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Главное ожидание от продукта — показать предварительную цену. Реальные отзывы важны для 48%, наличие всего в одном месте для 43%.
          </div>
        </motion.div>

         {/* Stat 4: Platform Role */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-purple-500 mb-1">95%</div>
                <div className="text-base lg:text-lg font-medium text-white">Проверка СТО</div>
             </div>
             <ShieldCheck className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Роль платформы — верификация. Для 95% опрошенных критически важно, что СТО проверяются агрегатором.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide: Subscription Data ---
export const SubscriptionSlide: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-8"
      >
        <span className="text-uremont-accent font-mono text-sm tracking-wider">02 / ПОДПИСНАЯ МОДЕЛЬ</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Готовность к <span className="text-uremont-blue">подпискам</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl">
        {/* Stat 1 */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-uremont-blue mb-1">63%</div>
                <div className="text-base lg:text-lg font-medium text-white">Уже платят за подписки</div>
             </div>
             <CreditCard className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Формат привычен для аудитории и не вызывает отторжения.
          </div>
        </motion.div>

        {/* Stat 2 */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-green-500 mb-1">54%</div>
                <div className="text-base lg:text-lg font-medium text-white">Месячная подписка понятнее</div>
             </div>
             <Calendar className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Формат «500 ₽ в месяц и −20%» воспринимается заметно лучше, чем покупка пакета услуг заранее.
          </div>
        </motion.div>

        {/* Stat 3 */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-1">38%</div>
                <div className="text-base lg:text-lg font-medium text-white">Решает гарантированная экономия</div>
             </div>
             <Percent className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Ключевой триггер оформления — чётко зафиксированная выгода и прозрачные условия.
          </div>
        </motion.div>

         {/* Stat 4 */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
             <div>
                <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-1">19%</div>
                <div className="text-base lg:text-lg font-medium text-white">Бренд пока неизвестен</div>
             </div>
             <HelpCircle className="text-gray-500 w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="mt-3 text-xs lg:text-sm text-gray-400">
             Почти 70% слышат о UREMONT впервые — подписка требует сильного объяснения ценности и доверия.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 5: Solution 1 (Landing & USP) ---
export const SolutionSlide1: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mixed content from Public folder
  const content = [
    { type: 'video', src: 'https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/U1ntitled.mp4' },
    { type: 'image', src: 'https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/2.jpg' },
    { type: 'image', src: 'https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/3.jpg' },
    { type: 'image', src: 'https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/4.jpg' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 150000); // 15 seconds
    return () => clearInterval(timer);
  }, [content.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % content.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);

  const currentItem = content[currentIndex];

  return (
    <div className="h-full flex flex-col justify-center px-6 md:pl-12 md:pr-28">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr] gap-6 lg:gap-10 items-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           variants={containerVariants}
           className="order-2 md:order-1"
        >
           <span className="text-uremont-accent font-mono text-sm tracking-wider">РЕШЕНИЕ #1</span>
           <h2 className="text-3xl font-bold mt-2 mb-4">Акцент на <br /><span className="text-uremont-blue">главном</span></h2>
           <div className="space-y-3">
             <div className="bg-white/5 p-3 rounded-lg border-l-2 border-uremont-blue">
               <h3 className="text-white font-semibold text-sm mb-1">Выделено УТП</h3>
               <p className="text-gray-400 text-xs">Переработана структура лендинга. <br />Фокус смещен на решение основного запроса пользователя.</p>
             </div>
             <div className="bg-white/5 p-3 rounded-lg border-l-2 border-uremont-accent">
               <h3 className="text-white font-semibold text-sm mb-1">Действие в 1 клик</h3>
               <p className="text-gray-400 text-xs">Добавлена возможность перейти на карту с активным действием. <br />Всё внимание акцентировано вокруг него.</p>
             </div>
             <div className="bg-white/5 p-3 rounded-lg border-l-2 border-purple-500">
               <h3 className="text-white font-semibold text-sm mb-1">AI-Ready Дизайн</h3>
               <p className="text-gray-400 text-xs">Минималистичный интерфейс, привычный пользователям современных нейросетей.</p>
             </div>
           </div>
        </motion.div>

        <div className="flex flex-col gap-4 order-1 md:order-2 w-full">
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.7 }}
               className="w-full aspect-[16/10] relative"
            >
              <BrowserWindow title="uremont.com/ab-test">
                 <div className="relative w-full h-full group bg-black">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {currentItem.type === 'image' ? (
                                <img 
                                  src={currentItem.src} 
                                  alt={`Slide ${currentIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                  src={currentItem.src}
                                  autoPlay
                                  muted
                                  playsInline
                                  loop // Loop video in case it's shorter than 10s
                                  className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Controls */}
                    <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <ChevronRight size={16} />
                    </button>
                    
                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {content.map((_, idx) => (
                           <div 
                              key={idx} 
                              onClick={() => setCurrentIndex(idx)}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${currentIndex === idx ? 'bg-white' : 'bg-white/50'}`} 
                           />
                        ))}
                    </div>
                 </div>
              </BrowserWindow>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs lg:text-sm text-gray-400 font-mono"
            >
              4 варианта лендингов, основанные на CustDev.
            </motion.p>
        </div>
      </div>
    </div>
  );
};

// --- Slide 6: Solution 2 (Database & Services) ---
export const SolutionSlide2: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    "Свечи накаливания: снятие и установка",
    "Теплообменник: снятие и установка",
    "Топливная форсунка (дизельная): снятие и установка",
    "Бампер задний: снятие и установка",
    "Бампер передний: снятие и установка",
    "Бачок омывателя: снятие и установка",
    "Фара противотуманная: снятие и установка",
    "Сцепление: прокачать",
    "Трос коробки передач: снятие и установка",
    "Диагностика ходовой части",
    "Антифриз: замена",
    "Бак топливный: слить и залить топливо",
    "Воздушный фильтр: снятие и установка",
    "Редуктор заднего моста: снятие и установка",
    "Редуктор переднего моста: снятие и установка",
    "Втулки стабилизатора заднего: снятие и установка",
    "Защита ДВС: снятие и установка",
    "Карданный вал: снятие и установка",
    "Глушитель: снятие и установка",
    "Воздушный фильтр: снятие и установка",
    "Направляющие суппорта: замена",
    "Опора шаровая: снятие и установка",
    "Подрамник задний: снятие и установка",
    "Приводной вал: снятие и установка",
    "Тормозная жидкость: замена",
    "Датчик температуры испарителя: снятие и установка",
    "Лампа стоп-сигнала: снятие и установка",
    "Предохранители: проверка",
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < servicesList.length) {
        setLines(prev => [...prev, servicesList[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Speed of typing

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="h-full flex flex-col justify-center px-6 md:pl-12 md:pr-24">
       <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr] gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Text & Stats */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             variants={containerVariants}
             className="order-2 md:order-1"
          >
             <motion.span variants={itemVariants} className="text-uremont-accent font-mono text-sm tracking-wider">РЕШЕНИЕ #2</motion.span>
             <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl font-bold mt-2 mb-6">Масштабирование <br /><span className="text-uremont-blue">базы данных</span></motion.h2>
             
             <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-uremont-blue transition-colors">
                   <div className="text-3xl lg:text-4xl font-bold text-uremont-blue mb-1">428</div>
                   <div className="text-xs text-gray-400 uppercase tracking-widest">Услуг</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-uremont-accent transition-colors">
                   <div className="text-3xl lg:text-4xl font-bold text-uremont-accent mb-1">2025</div>
                   <div className="text-xs text-gray-400 uppercase tracking-widest">Модельный год</div>
                </div>
             </motion.div>

             <motion.p variants={itemVariants} className="text-sm lg:text-base text-gray-300 leading-relaxed">
               Полностью переработанные справочники. Пользователи могут найти любую специфичную услугу и выбрать любой автомобиль, включая новинки рынка. Внедрена поддержка добавления автомобилей и услуг вручную.
             </motion.p>
          </motion.div>

          {/* Right Column: Terminal Visual */}
          <motion.div 
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             transition={{ duration: 0.7 }}
             className="w-full aspect-[16/10] relative order-1 md:order-2"
          >
             <BrowserWindow title="uremont-db-migration.ts">
                <div className="w-full h-full bg-[#0c0c0c] p-4 font-mono text-xs md:text-sm overflow-hidden flex flex-col">
                   <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-white/10 pb-2">
                      <Terminal size={14} />
                      <span>Console Output</span>
                   </div>
                   <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                      <div className="text-gray-400 italic mb-2">// Initializing DB Migration Seed...</div>
                      {lines.map((line, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2"
                        >
                           <span className="text-green-500 font-bold shrink-0">[SUCCESS]</span>
                           <span className="text-white opacity-90">Added service: {line}</span>
                        </motion.div>
                      ))}
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-blue-500">➜</span>
                        <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block"></span>
                      </div>
                   </div>
                </div>
             </BrowserWindow>
          </motion.div>
       </div>
    </div>
  );
};

// --- Slide 7: Solution 3 (AI Algorithm) ---
export const SolutionSlide3: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           variants={containerVariants}
           className="order-2 md:order-1"
        >
           <span className="text-uremont-accent font-mono text-sm tracking-wider">РЕШЕНИЕ #3</span>
           <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-6">Доработки алгоритма <br /><span className="text-uremont-blue">искусственного интеллекта</span></h2>
           <p className="text-lg text-gray-300 leading-relaxed mb-6">
             Обновили алгоритм сопоставления запросов пользователей и ИИ-ответа. Система теперь понимает контекст и предлагает максимально релевантные решения. В настоящее время алгоритм проходит дообучение, точность будет улучшаться в процессе использования.
           </p>
        </motion.div>

        <motion.div 
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.7 }}
           className="w-full max-w-[700px] aspect-square mx-auto order-1 md:order-2"
        >
          <BrowserWindow title="uremont.com/ai-chat">
             <div className="w-full h-full bg-black overflow-hidden">
                <img
                   src="https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/8.jpg"
                   alt="AI Chat Interface"
                   className="w-full h-full object-cover"
                />
             </div>
          </BrowserWindow>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 8: Solution 4 (Customer Path & Quality) ---
export const SolutionSlide4: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           variants={containerVariants}
        >
           <span className="text-uremont-accent font-mono text-sm tracking-wider">РЕШЕНИЕ #4</span>
           <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-6">Новый <span className="text-uremont-blue">клиентский путь</span> и качество сервиса</h2>
           
           <div className="flex flex-col gap-3">
               <div className="flex items-center gap-4 p-3 rounded-xl border bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gray-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Звонок в 1 клик</h3>
                    <p className="text-xs text-gray-400">Минимизация шагов до контакта с сервисом</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-3 rounded-xl border bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gray-300">
                    <Star size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Стандарт качества</h3>
                    <p className="text-xs text-gray-400">Строгий отбор и регулярная проверка партнеров</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-3 rounded-xl border bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gray-300">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Улучшения в процессах СП</h3>
                    <p className="text-xs text-gray-400">Переработанные скрипты, ускоренное взаимодействие с пользователем</p>
                  </div>
               </div>
           </div>
        </motion.div>

        <motion.div 
           initial={{ x: 50, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.7 }}
           className="relative flex justify-center items-center h-[50vh] min-h-[400px]"
        >
             {/* iPhone 16 Pro Frame */}
             <div className="relative w-[280px] h-[600px] bg-black rounded-[50px] shadow-2xl border-[6px] border-[#2c2c2c] overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center"></div>

                {/* Video Content */}
                <div className="w-full h-full bg-black">
                   <video 
                     src="https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/video7.MP4" 
                     className="w-full h-full object-cover"
                     autoPlay
                     muted
                     loop
                     playsInline
                   />
                </div>
                
                {/* Glass reflection effect */}
                <div className="absolute inset-0 rounded-[42px] pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] z-10"></div>
             </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 9: Operations & Network (OperationsSlide) ---
export const OperationsSlide: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-12 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-8"
      >
        <span className="text-uremont-accent font-mono text-sm tracking-wider">03 / ОПЕРАЦИОННАЯ МОДЕЛЬ</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Умная телефония и <span className="text-uremont-blue">контроль качества</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-auto min-h-[500px] items-center">
        {/* Left Column: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="space-y-8"
        >
            {/* Point 1 */}
            <motion.div variants={itemVariants} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-uremont-blue/50 transition-colors">
                <div className="flex items-start gap-4">
                    <div className="bg-red-500/20 p-3 rounded-lg text-red-500 shrink-0">
                        <Timer size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Маршрутизация и «правило 25 секунд»</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                            Если СТО не отвечает <span className="text-white font-bold">25 секунд</span>, звонок переводится на оператора. 
                            ИИ распознает автоответчики, сбросы и недозвоны — в таком случае оператор КЦ перезванивает за <span className="text-white font-bold">5 минут</span>.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Point 2 */}
            <motion.div variants={itemVariants} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-uremont-blue/50 transition-colors">
                <div className="flex items-start gap-4">
                    <div className="bg-uremont-blue/20 p-3 rounded-lg text-uremont-blue shrink-0">
                        <Headphones size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Бесшовный клиентский путь</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                            Оператор видит контекст (автомобиль, проблема, стоимость услуг). Жесткий SLA: СТО обязано перезвонить клиенту в течение <span className="text-white font-bold">20 минут</span>.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Point 3 */}
            <motion.div variants={itemVariants} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-uremont-blue/50 transition-colors">
                <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg text-green-500 shrink-0">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">AI-Контроль качества</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Тотальный анализ разговоров: оценка тональности, факта записи и соблюдения договоренностей.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>

        {/* Right Column: Visual Timeline */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="relative h-full min-h-[500px] bg-[#1e293b]/50 rounded-3xl border border-white/5 p-4 flex flex-col items-center justify-center"
        >
             {/* Center Container for Diagram */}
             <div className="relative w-[500px] h-[400px]">
                {/* SVG Layer for connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                        </marker>
                        <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                        </marker>
                    </defs>
                    
                    {/* Path 1: Green Dotted (Client Left -> Station Right Top) */}
                    <path d="M 50 200 C 120 200, 120 80, 240 80" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="8 8" markerEnd="url(#arrowhead)" />
                    
                    {/* Path 2: Red Solid (Client Left -> Operator Right Bottom) */}
                    <path d="M 50 200 C 120 200, 120 320, 240 320" fill="none" stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrowhead-red)" />
                </svg>

                {/* Client + Phone Cluster (Left) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center -translate-x-1/2">
                    <div className="relative">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] z-10">
                            <Users size={40} />
                        </div>
                        {/* Phone Icon overlay */}
                    </div>
                    <div className="mt-3 font-bold text-lg text-white">Клиент</div>
                </div>

                {/* 25s Label (Center-ish) */}
                <div className="absolute left-[110px] top-[260px] z-10 bg-[#1e293b] px-2 rounded-lg border border-red-500/30 text-red-500 font-mono font-bold text-2xl animate-pulse">
                    25s
                </div>

                {/* Upper Node: Station (Right Top) */}
                <div className="absolute right-0 top-[80px] -translate-y-1/2 z-10 flex items-center gap-4">
                    <div className="bg-[#0f172a] border border-green-500/50 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.1)] min-w-[180px]">
                        <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Путь 1</div>
                            <div className="font-bold text-base leading-tight">Ответ СТО</div>
                        </div>
                    </div>
                    
                    <ArrowRight className="text-gray-600 w-6 h-6" />
                    
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-green-500 text-black rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-pulse">
                            <BrainCircuit size={28} />
                        </div>
                        <div className="mt-2 text-[10px] text-green-400 font-bold tracking-wider">ANALYTICS</div>
                    </div>
                </div>

                {/* Lower Node: Operator (Right Bottom) */}
                <div className="absolute right-0 top-[320px] -translate-y-1/2 z-10 flex items-center gap-4">
                    <div className="bg-[#0f172a] border border-red-500/50 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(239,68,68,0.1)] min-w-[180px]">
                        <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                            <Headphones size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Путь 2 (Сбой)</div>
                            <div className="font-bold text-base leading-tight">Оператор КЦ</div>
                        </div>
                    </div>
                    
                    <ArrowRight className="text-gray-600 w-6 h-6" />
                    
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-red-500 text-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                            <Timer size={28} />
                        </div>
                        <div className="mt-2 text-[10px] text-red-400 font-bold tracking-wider">SLA 20 MIN</div>
                    </div>
                </div>
             </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 10: Partners & Network (PartnersSlide) ---
export const PartnersSlide: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-6 lg:mb-8"
      >
        <span className="text-uremont-accent font-mono text-sm tracking-wider">04 / СТРАТЕГИЯ ПАРТНЕРОВ</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Стандарты партнерской сети и <span className="text-uremont-blue">покрытие</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-auto min-h-[500px]">
        
        {/* Left Column: Partner Profile Card */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           variants={containerVariants}
           className="h-full"
        >
           <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-8 shadow-2xl relative h-full flex flex-col">
              <div className="absolute top-0 right-10 w-24 h-1 bg-uremont-accent shadow-[0_0_15px_#10B981] rounded-b-lg"></div>
              
              <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-uremont-blue/20 rounded-2xl flex items-center justify-center text-uremont-blue border border-uremont-blue/30">
                      <UserCheck size={36} />
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold text-white">Портрет</h3>
                      <div className="text-sm text-gray-400 uppercase tracking-widest">идеального партнера</div>
                  </div>
              </div>

              <div className="space-y-6 flex-1">
                  {/* Section 1 */}
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                          <Building2 size={18} className="text-uremont-accent" />
                          Типология
                      </h4>
                      <div className="space-y-2 pl-6">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-uremont-accent"></div>
                              Экс-официальные дилеры
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-uremont-accent"></div>
                              Сетевые станции
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-uremont-accent"></div>
                              НСТО с выделенным администратором
                          </div>
                      </div>
                  </div>

                  {/* Section 2 */}
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                          <Coffee size={18} className="text-yellow-500" />
                          Инфраструктура
                      </h4>
                      <div className="grid grid-cols-2 gap-2 pl-6">
                           <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                               <CheckCircle size={12} className="text-green-500" /> Ухоженный фасад
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                               <CheckCircle size={12} className="text-green-500" /> Навигация
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                               <CheckCircle size={12} className="text-green-500" /> Зона ожидания клиента
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                               <CheckCircle size={12} className="text-green-500" /> Базовый комфорт (WiFi, кофе)
                           </div>
                      </div>
                  </div>

                  {/* Section 3 */}
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                          <MonitorCheck size={18} className="text-blue-400" />
                          Цифровая гигиена
                      </h4>
                      <div className="flex gap-2 pl-6">
                          <span className="text-xs border border-blue-500/30 text-blue-300 px-2 py-1 rounded bg-blue-500/10">CRM</span>
                          <span className="text-xs border border-blue-500/30 text-blue-300 px-2 py-1 rounded bg-blue-500/10">ЭДО</span>
                          <span className="text-xs border border-blue-500/30 text-blue-300 px-2 py-1 rounded bg-blue-500/10">Прозрачные цены</span>
                      </div>
                  </div>
              </div>
           </motion.div>
        </motion.div>

        {/* Right Column: Capacity Infographic */}
        <motion.div 
           initial="hidden"
           whileInView="visible"
           variants={containerVariants}
           className="h-full"
        >
            <motion.div variants={itemVariants} className="bg-[#0f172a] border border-gray-700 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden shadow-2xl">
              {/* Background Map Texture - subtle */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><LayoutDashboard className="text-uremont-blue"/> Покрытие</h3>
                    <div className="text-sm text-gray-400">Информация о подключенных станциях</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-uremont-blue">132</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Локации подключено</div>
                  </div>
                </div>

                {/* Bars/Infographic */}
                <div className="flex-1 flex flex-col justify-center gap-6">
                  
                  {/* Moscow Row */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:border-red-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 font-bold shrink-0 border border-red-500/20">M</div>
                    <div className="flex-1 z-10">
                      <div className="flex justify-between mb-2 items-baseline">
                         <span className="font-bold text-white text-lg">Москва</span>
                         <span className="font-mono text-red-400 font-bold">86</span>
                      </div>
                      {/* Progress Bar Visual */}
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: "100%" }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                         />
                      </div>
                      <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                        <MapPinned size={12} /> Покрытие: 12 округов (100%)
                      </div>
                    </div>
                  </motion.div>

                  {/* Regions Row */}
                  <motion.div 
                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:border-green-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 font-bold shrink-0 border border-green-500/20">R</div>
                    <div className="flex-1 z-10">
                      <div className="flex justify-between mb-2 items-baseline">
                         <span className="font-bold text-white text-lg">Регионы</span>
                         <span className="font-mono text-green-400 font-bold">27</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "55%" }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-emerald-600 to-green-500"
                         />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                         <span className="text-[10px] bg-green-900/30 border border-green-500/20 px-2 py-0.5 rounded text-green-200">Миллионники - по 3 и более СТО в каждом городе</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* SPb Row */}
                  <motion.div 
                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold shrink-0 border border-blue-500/20">S</div>
                    <div className="flex-1 z-10">
                      <div className="flex justify-between mb-2 items-baseline">
                         <span className="font-bold text-white text-lg">Санкт-Петербург</span>
                         <span className="font-mono text-blue-400 font-bold">19</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "25%" }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                         />
                      </div>
                    </div>
                  </motion.div>

                </div>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-uremont-accent animate-pulse"></div>
                      <span className="text-uremont-accent font-bold">60% подключенных партнеров соответствуют новому портрету</span>
                   </div>
                </div>
              </div>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 11: Future Plans (PlanSlide) ---
export const PlanSlide: React.FC = () => {
  const mainPlans = [
    {
       icon: TrendingUp,
       title: "Экспертное УТП",
       desc: "Доработка текстов и лендингов в сторону помощи в принятии решений."
    },
    {
       icon: Bot,
       title: "ИИ-автомеханик",
       desc: "Умный помощник, который помогает пользователю с автомобильными вопросами 24/7."
    },
    {
       icon: Repeat,
       title: "Retention & LTV",
       desc: "Проработка подписочных механик для удержания клиентов."
    },
    {
       icon: Car,
       title: "Новые вертикали",
       desc: "Расширение в мойки, детейлинг и смежные услуги."
    }
  ];

  const dataPlan = {
       icon: FileBarChart,
       title: "Data-driven Dev",
       desc: "Доработки по данным, полученным в ходе A/B тестирований и анализа воронки на трафике."
  };

  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-6 lg:mb-10"
      >
        <span className="text-uremont-accent font-mono text-sm tracking-wider">05 / ПЛАНЫ</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
           Планы по улучшениям на <span className="text-uremont-blue">Q1 2026</span>
        </h2>
      </motion.div>

      <motion.div 
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl h-auto"
      >
         {/* Left Column: 2x2 Grid */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {mainPlans.map((plan, i) => (
                <motion.div 
                   key={i}
                   variants={itemVariants}
                   className="bg-white/5 p-4 lg:p-6 rounded-2xl border border-white/10 hover:border-uremont-blue hover:bg-white/10 transition-all flex flex-col justify-between group min-h-[140px]"
                >
                   <div className="bg-uremont-blue/20 w-10 h-10 flex items-center justify-center rounded-xl text-uremont-blue group-hover:bg-uremont-blue group-hover:text-white transition-colors mb-3">
                      <plan.icon size={20} />
                   </div>
                   <div>
                      <h3 className="text-base lg:text-lg font-bold text-white mb-1">{plan.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                         {plan.desc}
                      </p>
                   </div>
                </motion.div>
            ))}
         </div>

         {/* Right Column: Big Highlighted Block */}
         <motion.div 
            variants={itemVariants}
            className="lg:col-span-1 bg-gradient-to-br from-uremont-blue/20 to-uremont-dark border border-uremont-blue/50 p-6 lg:p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group min-h-[200px]"
         >
            <div className="absolute inset-0 bg-uremont-blue/10 blur-3xl group-hover:bg-uremont-blue/20 transition-colors" />
            
            <div className="relative z-10">
                <div className="bg-uremont-blue w-16 h-16 lg:w-20 lg:h-20 mx-auto flex items-center justify-center rounded-2xl text-white shadow-lg shadow-uremont-blue/30 mb-4 lg:mb-6 scale-100 group-hover:scale-110 transition-transform duration-500">
                    <dataPlan.icon size={32} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{dataPlan.title}</h3>
                <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
                   {dataPlan.desc}
                </p>
                <div className="mt-6 px-4 py-1 rounded-full border border-uremont-blue/50 text-uremont-blue text-[10px] font-mono">
                    ОСНОВА ИЗМЕНЕНИЙ
                </div>
            </div>
         </motion.div>
      </motion.div>
    </div>
  );
};

// --- Slide 12: Discussion (DiscussionSlide) ---
export const DiscussionSlide: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center px-12 md:px-24">
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="mb-8"
        >
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Свободное обсуждение</h2>
           <p className="text-lg md:text-xl text-gray-400">Готов ответить на ваши вопросы</p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3, duration: 0.6 }}
           className="w-full max-w-5xl aspect-[16/10]"
        >
           <BrowserWindow title="uremont.com/demo">
              <div className="w-full h-full bg-black">
                  <video 
                     src="https://pim4y1v96ezxxeus.public.blob.vercel-storage.com/U3ntitled.mp4" 
                     className="w-full h-full object-cover"
                     autoPlay
                     muted
                     loop
                     playsInline
                   />
              </div>
           </BrowserWindow>
        </motion.div>
      </div>
    </div>
  );
};