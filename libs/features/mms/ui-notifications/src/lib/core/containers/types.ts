export type Content = {
  headline?: string;
  content?: string;
};

export type UpdateEditorStateProps = (key: string, value: string, parent_key?: string | null) => void;
