import React from 'react';
import { motion } from 'framer-motion';

const icon = {
  hidden: {
    pathLength: 0,
    fill: 'rgba(0, 0, 0, 0)',
  },
  visible: {
    pathLength: 1,
    fill: 'rgba(0, 0, 0, 1)',
  },
};

export const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    role="img"
  >
    <title>checkmark</title>
    <motion.path
      d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      variants={icon}
      initial="hidden"
      animate="visible"
    />
  </svg>
);
