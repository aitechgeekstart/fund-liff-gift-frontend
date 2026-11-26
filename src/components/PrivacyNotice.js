import "./PrivacyNotice.css";

const BulletList = ({ children }) => (
  <ul className="privacy-list">{children}</ul>
);

const Section = ({ title, children }) => (
  <section className="privacy-section">
    <h2>{title}</h2>
    {children}
  </section>
);

export default function PrivacyNotice() {
  return (
    <article className="privacy-container">
      <header className="privacy-title">
        <h1>ประกาศความเป็นส่วนตัวในการเก็บรวบรวมข้อมูลส่วนบุคคล (Privacy Notice)</h1>

        <p className="privacy-for">สำหรับพนักงาน</p>

        <p>มีผลบังคับใช้ตั้งแต่วันที่ 23 สิงหาคม 2566</p>
      </header>

      <div className="privacy-content"></div>
    </article>
  );
}
