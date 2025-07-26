import styles from "./styles.module.css";

export function Textarea({ ...rest }: React.HTMLProps<HTMLTextAreaElement>) {
  return <textarea className={styles.textarea} {...rest}></textarea>;
}
