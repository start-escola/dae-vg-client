interface IPageTitleProps {
  title: string
  description?: string
}

const PageTitle = ({ title, description }: IPageTitleProps) => {
  return (
    <div className="text-primary-500">
      {title && (
        <h2 className="text-3xl py-5 border-b-2 border-primary-500 font-semibold mb-4">{title}</h2>
      )}
      {
        description && (
          <p>
            {description}
          </p>
        )
      }
    </div>
  )
}

export default PageTitle