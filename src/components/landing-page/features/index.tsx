import { motion } from 'framer-motion';
import { FeatureCard } from './feature-card';
import { features } from './data';
import { useScrollAnimation, fadeInVariants } from '@/hooks/use-scroll-animation';

export function Features() {
  const { ref, controls } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4 py-24"
      >
        <motion.h2 
          variants={fadeInVariants}
          className="text-center text-4xl font-bold text-gray-900 dark:text-white"
        >
          Key Features
        </motion.h2>

        <motion.div 
          variants={fadeInVariants}
          className="mt-4 text-center font-caveat text-xl text-emerald-600 dark:text-emerald-400"
        >
          Empowering environmental change through technology
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { 
                  opacity: 0,
                  y: 50,
                  scale: 0.9
                },
                visible: { 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.1
                  }
                }
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}