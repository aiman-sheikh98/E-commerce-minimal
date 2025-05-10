
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification, useNotifications } from '@/context/NotificationContext';

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    markAsRead(notification.id);
  };

  return (
    <div 
      className={`p-3 border-b ${notification.read ? 'bg-background' : 'bg-muted'}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <p className={`text-sm ${notification.read ? 'text-foreground' : 'font-medium'}`}>
          {notification.message}
        </p>
        {!notification.read && (
          <span className="inline-flex h-2 w-2 rounded-full bg-primary"></span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {format(notification.timestamp, 'MMM d, h:mm a')}
      </p>
    </div>
  );
};

const NotificationPanel = () => {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications();
  
  return (
    <div className="w-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearNotifications}>
              Clear all
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-80">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationPanel;
