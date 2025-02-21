interface PageTitleProps {
    title: string;
  }
  
  const PageTitle = ({ title }: PageTitleProps) => {
    return (
      <div className="mb-14">
        <h1 className="uppercase text-5xl font-secondary tracking-wider ">{title}</h1>
      </div>
    );
  };
  
  export default PageTitle;