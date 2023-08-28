export type NotificationLink = 'inside' | 'outside';

export type ToolbarProps = {
  headline: string;
  body: string;
  notification_link: NotificationLink;
  page_id: string;
  page_link: string;
};
