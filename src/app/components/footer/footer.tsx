import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.lines}>
        <div className={`${style.line} ${style.line_1}`}></div>
        <div className={`${style.line} ${style.line_2}`}></div>
        <div className={`${style.line} ${style.line_3}`}></div>
      </div>
      <div className={style.container}>
        <button className={style.button}>Contact Us</button>
      </div>
    </footer>
  );
};

export default Footer;
