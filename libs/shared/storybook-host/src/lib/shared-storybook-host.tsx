import styles from './shared-storybook-host.module.css';

/* eslint-disable-next-line */
export interface SharedStorybookHostProps {}

export function SharedStorybookHost(props: SharedStorybookHostProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedStorybookHost!</h1>
    </div>
  );
}

export default SharedStorybookHost;
