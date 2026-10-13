type PageTitleProps = {
  title: string;
};

const PageSubtitle = ({ title }: PageTitleProps) => {
  return (
    <h1 className="text-xl font-bold justify-self-center p-10">{title}</h1>
  );
};

export default PageSubtitle;
