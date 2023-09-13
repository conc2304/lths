export type NotificationLink = 'inside' | 'outside';

export type ToolbarProps = {
  headline?: string;
  content?: string;
  notification_link?: NotificationLink;
  inside_app?: string;
  outside_app?: string;
};
