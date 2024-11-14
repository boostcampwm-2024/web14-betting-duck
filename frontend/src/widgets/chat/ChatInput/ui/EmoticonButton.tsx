import styles from "./style.module.css";

function EmoticomButton() {
  return (
    <div className={styles["vote-page-button"]}>
      <button>
        <img
          alt="이모티콘 입력 버튼"
          loading="lazy"
          decoding="async"
          src={"/src/assets/emoticon.png"}
          width={24}
          height={24}
        />
      </button>
      <div className={styles.tooltip}>
        <div>emoticon</div>
      </div>{" "}
      제외
    </div>
  );
}

export { EmoticomButton };
