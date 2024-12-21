import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Leaf, Recycle, Bot, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Bot,
    title: 'AI-Powered Intelligence',
    description: 'Nova AI assistant provides real-time insights and optimization recommendations',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    stats: '98% accuracy in waste classification'
  },
  {
    icon: Recycle,
    title: 'Smart Waste Management',
    description: 'IoT-enabled monitoring and automated biochar production optimization',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    stats: '40% increase in efficiency'
  },
  {
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'Convert organic waste into valuable biochar while sequestering carbon',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    stats: '2000+ tons CO₂ sequestered'
  },
  {
    icon: Globe,
    title: 'Global Sustainability',
    description: 'Join a network of environmentally conscious organizations worldwide',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    stats: '500+ active installations'
  }
];

export function WhyEcoByte() {
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
        'relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-800',
        'opacity-0 transition-all duration-1000 ease-out',
        inView && 'opacity-100'
      )}
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 blur-3xl dark:from-emerald-400/10 dark:to-blue-400/10" />
        <div className="absolute right-1/4 top-3/4 h-[25rem] w-[25rem] rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl dark:from-purple-400/10 dark:to-pink-400/10" />
      </div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container relative mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Why Choose EcoByte?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Experience the future of waste management with our innovative platform that combines
            AI, IoT, and sustainable practices.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
                <div className={cn("mb-4 inline-flex rounded-xl p-3", benefit.color)}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {benefit.stats}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" style={{ padding: '2px' }}>
                  <div className="h-full w-full rounded-2xl bg-white dark:bg-gray-800" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}