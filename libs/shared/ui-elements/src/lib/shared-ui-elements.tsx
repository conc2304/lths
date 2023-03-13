import styles from './shared-ui-elements.module.css';

/* eslint-disable-next-line */
export interface SharedUiElementsProps {}

export function SharedUiElements(props: SharedUiElementsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedUiElements!</h1>
    </div>
  );
}

export default SharedUiElements;
