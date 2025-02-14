interface PageTitleProps {
    title: string;
  }
  
  const PageTitle = ({ title }: PageTitleProps) => {
    return (
      <div>
        <h1 className="uppercase text-5xl font-secondary">{title}</h1>
      </div>
    );
  };
  
  export default PageTitle;