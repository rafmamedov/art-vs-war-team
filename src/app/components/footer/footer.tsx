import { MenuItems } from "../menuItems/menuItems";
import SocialNetworkIcons from "../social-network/social-network";
import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={style.lines}>
        <div className={`${style.line} ${style.line_1}`}></div>
        <div className={`${style.line} ${style.line_2}`}></div>
        <div className={`${style.line} ${style.line_3}`}></div>
      </div>
      <div className={style.content}>
        <div className={style.wrapper}>
          <button className={style.button}>Contact Us</button>
          <MenuItems className={style.menuItems} />
          <div>
            <ul className={style.list}>
              <li>Payment</li>
              <li>Delivery</li>
              <li>FAQ</li>
              <li>Terms of use</li>
              <li>Payment</li>
            </ul>
            <div className={style.icons}>
              <SocialNetworkIcons className={style.icon} />
            </div>
          </div>
        </div>
        <div className={style.license}>
          <p className={style.license__text}>
            © This work is licensed under the terms of the GNU General Public
            License 2.0
          </p>
          <p>Created by Art vs War Team in 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
