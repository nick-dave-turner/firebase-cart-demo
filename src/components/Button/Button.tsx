import { FC, MouseEvent } from "react";
import styles from "./Button.module.scss";

type Props = {
  dataTestId?: string;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export const Button: FC<Props> = ({
  children,
  dataTestId,
  disabled,
  onClick,
}) => (
  <button
    className={styles.button}
    data-testid={dataTestId}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
