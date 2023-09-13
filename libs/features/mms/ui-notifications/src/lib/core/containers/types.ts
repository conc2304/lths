export type Content = {
  headline?: string;
  content?: string;
};

export type UpdateEditorStateProps = (key: string, value: string, parentKey?: string) => void;
