import { Link } from "@/components";

import "./Welcome.styles.css";

const Welcome = () => {
  return (
    <div className="welcome">
      <section id="intro" className="wrapper section fullscreen fade-up">
        <div className="inner">
          <h1>Laravel Base App</h1>
          <p>
            A simple and clean Laravel backend API implementation with
            authentication functionality using Laravel Sanctum.
          </p>
          <ul className="actions">
            <li>
              <Link type="secondary" href="/dashboard" label="Dashboard" />
            </li>
            <li>
              <Link type="secondary" href="/docs" label="API Documentation" />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
