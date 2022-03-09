import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  id: string;
  label: string;
  options: Option[];
  onChange: (value: string) => void;
  value: string;
};

export const Select = ({
  id,
  label,
  options,
  onChange,
  value,
}: SelectProps) => {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        onChange={val => onChange(val.target.value)}
        value={value}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
