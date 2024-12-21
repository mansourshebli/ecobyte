import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="relative">
        <div className="w-[60px] h-[30px]">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-600 dark:bg-emerald-500 rounded-full"
              style={{
                left: `${i === 2 ? '45%' : i === 3 ? 'auto' : '15%'}`,
                right: i === 3 ? '15%' : 'auto'
              }}
              animate={{
                top: ['20px', '10px', '0px'],
                height: ['5px', '8px', '8px'],
                borderRadius: ['50px 50px 25px 25px', '50%', '50%'],
                scaleX: [1.7, 1, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: (i - 1) * 0.1
              }}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[5px] h-1 bg-black/20 dark:bg-white/20 rounded-full blur-[1px]"
              style={{
                top: '30px',
                left: `${i === 2 ? '45%' : i === 3 ? 'auto' : '15%'}`,
                right: i === 3 ? '15%' : 'auto'
              }}
              animate={{
                scaleX: [1.5, 1, 0.2],
                opacity: [1, 0.7, 0.4]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: (i - 1) * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}