import { Bot, Cpu, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Cpu,
    title: 'Real-time Monitoring',
    description: 'Advanced IoT sensors track temperature, waste input, and biochar production with live updates and alerts',
  },
  {
    icon: Bot,
    title: 'Smart Analytics',
    description: 'AI-powered analysis of waste composition, conversion efficiency, and environmental impact metrics',
  },
  {
    icon: Zap,
    title: 'Predictive Optimization',
    description: 'Machine learning algorithms optimize biochar production parameters and predict maintenance needs',
  },
];

export function MeetNova() {
  const { ref, inView } = useInView({ triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gray-50 dark:bg-gray-900',
        'py-32'
      )}
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-emerald-400/10 to-blue-400/10 blur-3xl" />
        <div className="absolute right-1/4 top-3/4 h-[25rem] w-[25rem] rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container relative mx-auto px-4"
      >
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="flex items-center justify-center lg:order-2">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 animate-[ping_4s_ease-in-out_infinite] rounded-full bg-emerald-400/20" />
              <div className="absolute inset-0 animate-[ping_4s_ease-in-out_infinite_500ms] rounded-full bg-emerald-400/15" />
              <div className="absolute inset-0 animate-[ping_4s_ease-in-out_infinite_1000ms] rounded-full bg-emerald-400/10" />
              
              {/* Nova icon container */}
              <motion.div
                className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg dark:from-emerald-600 dark:to-green-700"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Bot className="h-32 w-32 text-white" />
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-50">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-0 h-full w-0.5 origin-bottom"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                      <motion.div
                        className="h-2 w-2 rounded-full bg-white"
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:order-1">
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Meet Nova
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="mt-4 font-caveat text-2xl text-emerald-600 dark:text-emerald-400"
            >
              AI-Powered Biochar Production Assistant
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Nova is your intelligent companion for optimizing biochar production. Using advanced AI
              and IoT technology, it monitors your BiochaBin system in real-time, providing
              actionable insights and automated optimizations for maximum efficiency.
            </motion.p>

            <div className="mt-12 grid gap-6">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl bg-white/50 p-6 transition-all hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="rounded-lg bg-emerald-100 p-3 transition-transform group-hover:scale-110 dark:bg-emerald-900">
                      <feature.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 -z-10 translate-x-full bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent opacity-0 transition-all group-hover:translate-x-[-100%] group-hover:opacity-100 dark:via-emerald-900/20" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}