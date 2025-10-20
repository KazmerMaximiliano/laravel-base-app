type RolesIndexProps = {
  params: {
    pageTitle: string;
    pageDescription: string;
  };
};

const RolesIndex = ({ params }: RolesIndexProps) => {
  return (
    <section>
      <h1>{params.pageTitle}</h1>
      <p>{params.pageDescription}</p>
    </section>
  );
};

export default RolesIndex;
