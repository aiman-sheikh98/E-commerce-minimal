
import { useEffect } from 'react';
import { useNotifications } from '@/context/NotificationContext';

// Demo data for initial notifications
const demoNotifications = [
  "Welcome to MINIMA! Explore our latest summer collection.",
  "New arrivals are now available! Check them out.",
  "Special offer: Free shipping on orders over $50!"
];

export const DemoNotification = () => {
  const { addNotification, notifications } = useNotifications();
  
  useEffect(() => {
    // Only show notifications if there are none already (first load)
    if (notifications.length === 0) {
      // Add a slight delay before showing notifications
      const timeout = setTimeout(() => {
        // Show demo notifications with a delay between each
        demoNotifications.forEach((message, index) => {
          setTimeout(() => {
            addNotification(message);
          }, index * 2000); // Show a new notification every 2 seconds
        });
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, []); // Run only on first mount
  
  return null; // This component doesn't render anything
};
