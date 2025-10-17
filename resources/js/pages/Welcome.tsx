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
              <a href="/docs" className="button scrolly">
                API Documentation
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
