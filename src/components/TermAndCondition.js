import "./TermAndCondition.css";

function Section({ title, children }) {
  return (
    <section className="terms-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function TermAndCondition() {
  return (
    <article className="terms-container">
      <h1>ข้อกำหนดการใช้งาน LINE OA Phone Confirm Order</h1>
    </article>
  );
}
