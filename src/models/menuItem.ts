export interface MenuItem {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  notifications?: number;
}